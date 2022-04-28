import type { MenuDataItem, RouteContextType, Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, RouteContext } from '@ant-design/pro-layout';
import { BackTop, Breadcrumb, notification, message, Button } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { Link } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import Settings from '../config/defaultSettings';
import { getUser, refreshToken } from './services/user/index';
import { updateToken, getCookie, getToken } from '@/utils/auth';
import copy from 'copy-to-clipboard';
// @ts-ignore
import shortid from 'shortid';

const loginPath = '/user/login';
const ignoreErrorRoutesReg = /\/users\/route\/create/gi;

/**
 * @description 处理重定向逻辑
 * 如果是登录页本身，不再作重定向
 */
const handleRedirect = (): void => {
  if (window.location.pathname === loginPath) {
    return;
  }
  history.replace(`${loginPath}?redirect=${window.location.pathname}${window.location.search ?? ''}`);
};

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  searchVal?: string;
  settings?: Partial<LayoutSettings>;
  currentUser?: UserApi.User;
  fetchUserInfo?: () => Promise<UserApi.User | undefined>;
  global?: APP.initialStateGlobal;
}> {
  const fetchUserInfo = async () => {
    if (!getToken()) {
      return undefined;
    }
    try {
      const userData = await getUser();
      return {
        ...userData,
      };
    } catch (err) {
      console.error(err);
      handleRedirect();
    }
    return undefined;
  };
  const currentUser = await fetchUserInfo();
  return {
    fetchUserInfo,
    currentUser,
    settings: {},
    global: {},
  };
}

const formatMenus = (list: UserApi.MenuItem[] | undefined, newList: UserApi.MenuItem[]): UserApi.MenuItem[] => {
  if (!list) {
    return [];
  }
  list.forEach(item => {
    if (item.checked === 1) {
      newList.push(item);
      // @ts-ignore
      delete item.permissions;
      if (item.children) {
        // eslint-disable-next-line
        item.children = formatMenus(item.children, []);
      }
    }
  });
  return newList;
};

// antd 配置
// export const antd = {
//   componentSize: 'small',
// };

// https://umijs.org/zh-CN/plugins/plugin-layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    // 添加回到顶部
    childrenRender: dom => (
      <>
        {dom}
        <BackTop visibilityHeight={200} style={{ right: 0 }} />
      </>
    ),
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // 水印
    // waterMarkProps: {
    //   content: 'Harvest',
    //   fontSize: 10,
    // },
    // footerRender: () => <Footer />, // 内容区页脚
    onPageChange: () => {
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser) {
        handleRedirect();
      }
      // 权限判断：判断是否具有该页面的权限，没有则跳到403页
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // ...initialState?.settings
    ...Settings,
    // collapsedButtonRender: false, // 取消默认的折叠菜单按钮显示（默认在sidebar底部）
    // breadcrumbRender: false, // 不显示面包屑
    breadcrumbRender: route => {
      // 将数据绑定到 RouteContext组件
      // https://github.com/ant-design/pro-components/issues/1989
      return route;
    },
    breadcrumbProps: {
      itemRender: () => null,
    },
    // 自定义折叠菜单和面包屑
    // https://github.com/ant-design/ant-design-pro/issues/8242
    collapsed: initialState?.global?.collapsed,
    headerContentRender: () => {
      return (
        <div>
          {/* 面包屑 */}
          <RouteContext.Consumer>
            {(value: RouteContextType) => {
              const { isMobile, breadcrumb } = value;

              return (
                <Breadcrumb className={isMobile ? 'mobile-breadcrumb' : ''} style={{ display: 'inline-block' }}>
                  {breadcrumb?.routes?.map((item, i) => (
                    <Breadcrumb.Item key={item.path}>
                      {i === Number(breadcrumb?.routes?.length) - 1 ? (
                        <span>{item.breadcrumbName}</span>
                      ) : (
                        <Link to={item.path || item.path}>{item.breadcrumbName}</Link>
                      )}
                    </Breadcrumb.Item>
                  ))}
                </Breadcrumb>
              );
            }}
          </RouteContext.Consumer>
        </div>
      );
    },
  };
};

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  405: '请求方法不被允许。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * @description 重刷token
 */
const refreshAccessToken = async () => {
  try {
    const data = await refreshToken();
    updateToken(data);
  } catch (err) {
    console.error('重刷token失败', err);
  }
};

/**
 * @description 前端重刷token方案
 * 详细分析见项目 ReadMe.md内的 JWT 采用前端续期的问题
 */
const tokenRefreshInterceptor = (url: string, options: RequestOptionsInit) => {
  // 需要排除resetToken接口本身，否则会陷入死循环
  // 排除/auth/login 和 /user/info 接口
  if (url.match(/(\/users\/resetToken)|(\/auth\/login)|(\/user\/info)/gi)) {
    return { url, options };
  }
  // 判断token时候过期
  if (!getToken()) {
    // token过期
    handleRedirect();
  } else {
    const accessExpire = Number(getCookie('accessExpire'));
    const refreshAfter = Number(getCookie('refreshAfter'));
    const time = new Date().getTime();
    if (time > refreshAfter && time < accessExpire) {
      // 当前时间在token可刷时间范围内
      // 刷新token
      refreshAccessToken();
    }
  }

  return {
    url,
    options,
  };
};

/**
 * @description 拦截请求
 * 挂载token
 */
const requestInterceptor = (url: string, options: RequestOptionsInit) => {
  // console.log('[options]: ', options);
  // 对于列表查询参数转换
  // current => page, pageSize => page_num
  const data: Record<string, any> = options.method === 'get' ? options.params : options.data;

  if (data?.current && data?.pageSize) {
    data.page = data?.current;
    data.page_num = data?.pageSize;
    if (data?.status === undefined) {
      delete data?.status;
    } else {
      data.status = Number(data?.status);
    }
    delete data?.current;
    delete data?.pageSize;
  }

  // get请求的query参数转化为JSON模式，并采用json传参
  return {
    // url: url.includes('/api') && process.env.NODE_ENV === 'production' ? `http://localhost:8001${url}` : url,
    url,
    options: {
      ...options,
      headers: {
        Authorization: `Bearer ${getToken()}`,
        ...options?.headers,
      },
      interceptors: true,
    },
  };
};

/**
 * @description 响应拦截
 */
const responseInterceptor = async (response: Response) => {
  let res: any;
  // 如果要获取请求/响应头的自定义内容
  // 需要后台设置 Access-Control-Expose-Headers，浏览器才能获取自定义头
  // see https://github.com/umijs/umi/issues/2793
  // see https://blog.csdn.net/cpongo3/article/details/88531939
  // 响应头配置：Access-Control-Expose-Headers: <header-name>, <header-name>,
  // console.log('x-trace-id', response.headers.get('X-Trace-Id'));
  try {
    res = await response.clone().json();
  } catch (err) {
    const errorText = await response.text();
    res = { code: response.status, msg: errorText };
  }

  const code = res?.code;
  // 为了兼容antd pro原来的接口，以后替代完可以移除下面这句话
  if (code === undefined) {
    return response;
  }
  // 后台接口设计
  // 响应 { code: number, msg: string, response: any }
  // code：0 成功
  // code：1 失败，需要显示提示信息
  // code：2 失败，不显示提示信息
  if (res.code === 0) {
    // 对于查询列表
    // 格式响应list字段为data字段，适配antd pro-table的request配置
    // if (res.response?.list && res.response?.total !== undefined) {
    //   res.response.data = res.response.list || [];
    //   delete res.response.list;
    // }
    // 重刷token测试设置
    // if (res.response?.accessToken) {
    //   res.response.accessExpire = (new Date().getTime() + 1 * 60 * 1000) / 1000;
    //   res.response.refreshAfter = (new Date().getTime() + 0.5 * 60 * 1000) / 1000;
    // }
    return res.data;
  }
  // https://beta-pro.ant.design/docs/request-cn
  // 为了适配antd pro的错误设计
  // 需要格式化错误响应
  return Promise.reject({
    code: res.code,
    message: res.msg,
    response,
  });
};

// @ts-ignore
interface Error extends ResponseError {
  message?: string;
  code?: number;
  traceId?: number | string;
  host?: string;
}
/** 异常处理程序
 * @see https://pro.ant.design/zh-CN/docs/request/
 */
const errorHandler = (error: Error) => {
  // console.error('error', error);
  const { response, request, message: errorMessage, code } = error;
  // 以下接口不做提示处理，需要自己在catch内做处理
  if (ignoreErrorRoutesReg.test(request?.url ?? '')) {
    return;
  }

  // 状态码code为2时，或者如果接口设置了忽略错误处理，则不提示
  if (code === 2 || request.options.skipErrorHandler) {
    console.error(error);
    throw error;
  }

  // 需要排除获取用户信息接口的提示
  if (response && response.status) {
    const errorText = errorMessage || codeMessage[response.status] || response.statusText;
    const { status } = response;
    const { url, options } = request;
    const { method, params, data, requestType, headers } = options;

    if (url.includes('/user/info') && status === 401) {
      notification.warning({
        message: '登录状态过期或未登录',
        description: '请重新进行登录！',
      });
    } else {
      const key = shortid.generate();
      const btn = (
        <Button
          type="primary"
          size="small"
          onClick={() => {
            copy(
              JSON.stringify({
                请求地址: url,
                错误信息: error.message,
                请求方法: method,
                请求参数: method === 'GET' ? params : data,
                请求类型: requestType,
                // @ts-ignore
                TOKEN: headers?.Authorization,
                响应状态码: status,
              }),
            );
            message.success('复制成功');
            notification.close(key);
          }}>
          复制错误信息
        </Button>
      );
      notification.error({
        className: 'error-notification',
        message: `请求错误，状态码 ${status}`,
        key,
        btn,
        // duration: 0,
        description: (
          <ul className="error-notification__content">
            <li>
              <span style={{ color: '#ff7a45' }}>请求地址: </span>
              <span>{url}</span>
            </li>
            <li>
              <span style={{ color: '#ff4d4f' }}>错误信息: </span>
              <span dangerouslySetInnerHTML={{ __html: errorText }} />
            </li>
          </ul>
        ),
      });
    }
  }

  if (!response) {
    notification.error({
      description: '您的网络发生异常，无法连接服务器',
      message: '网络异常',
    });
  }
  throw error;
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  // prefix: '/app', // http://10.10.30.251:8888
  timeout: 120 * 1000,
  errorHandler,
  // getResponse: true,
  errorConfig: {
    adaptor: resData => {
      // console.log(resData);
      return {
        ...resData,
        success: resData?.ok,
        errorMessage: resData?.message,
      };
    },
  },
  requestType: 'json',
  // requestInterceptors: [tokenRefreshInterceptor, requestInterceptor],
  requestInterceptors: [requestInterceptor],
  responseInterceptors: [responseInterceptor],
};
