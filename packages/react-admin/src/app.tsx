import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import { Breadcrumb, Button, message, notification } from 'antd';
import type { RequestConfig, RunTimeLayoutConfig } from 'umi';
import { Link } from 'umi';
import { history } from 'umi';
import RightContent from '@/components/RightContent';
import type { RequestOptionsInit, ResponseError } from 'umi-request';
import { currentUser as queryCurrentUser } from './services/ant-design-pro/api';
import Settings from '../config/defaultSettings';
import { getUserDetail, refreshToken } from './services/users/index';
import { updateToken, getCookie, getToken } from '@/utils/auth';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { getMatchMenu } from '@umijs/route-utils';

const loginPath = '/user/login';
const ignoreErrorRoutesReg = /\/users\/route\/create/gi;

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: USERS_API.UserInfo & ANT_API.CurrentUser;
  fetchUserInfo?: () => Promise<(USERS_API.UserInfo & ANT_API.CurrentUser) | undefined>;
  global?: APP.initialStateGlobal;
}> {
  const fetchUserInfo = async () => {
    try {
      const currentUser = await getUserDetail(); // {};
      const defaultData = await queryCurrentUser();

      return {
        ...defaultData,
        ...currentUser,
      };
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
      global: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
    global: {},
  };
}

const formatMenus = (list: USERS_API.MenuItem[] | undefined, newList: USERS_API.MenuItem[]): USERS_API.MenuItem[] => {
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

// https://umijs.org/zh-CN/plugins/plugin-layout
// @ts-ignore
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    // waterMarkProps: { // 水印
    //   content: initialState?.currentUser?.name,
    // },
    // footerRender: () => <Footer />, // 内容区页脚
    onPageChange: () => {
      const { location } = history;
      // 如果没有登录，重定向到 login
      if (!initialState?.currentUser && location.pathname !== loginPath) {
        history.push(loginPath);
      }
      // 权限判断：判断是否具有该页面的权限，没有则跳到403页
    },
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // ...initialState?.settings
    ...Settings,
    collapsedButtonRender: false, // 取消默认的折叠菜单按钮显示（默认在sidebar底部）
    breadcrumbRender: false, // 不显示面包屑
    // 自定义折叠菜单和面包屑
    // https://github.com/ant-design/ant-design-pro/issues/8242
    collapsed: initialState?.global?.collapsed,
    headerContentRender: params => {
      const { menuData } = params;
      const path = window.location.pathname;
      const matchMenu = getMatchMenu(path, menuData as any[]);
      const menuLenth = matchMenu.length;

      return (
        <div>
          <span
            onClick={() => {
              // 点击自定义的按钮，修改initialState中的collapsed
              setInitialState({
                ...initialState,
                global: {
                  collapsed: !initialState?.global?.collapsed,
                },
              });
            }}
            style={{
              cursor: 'pointer',
              fontSize: '16px',
              paddingLeft: 0,
              display: 'inline-block',
              height: '100%',
              paddingRight: 20,
            }}>
            {initialState?.global?.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </span>

          {/* 面包屑 */}
          <Breadcrumb style={{ display: 'inline-block' }}>
            {/* <Breadcrumb.Item>
              <Link to="/">首页</Link>
            </Breadcrumb.Item> */}
            {matchMenu.map((item, i) => (
              <Breadcrumb.Item key={item.path}>
                {(item.path || item.redirect) && i !== menuLenth - 1 ? (
                  <Link to={item.path || item.redirect} target={item.target}>
                    {item.name}
                  </Link>
                ) : (
                  <>{item.name}</>
                )}
              </Breadcrumb.Item>
            ))}
          </Breadcrumb>
        </div>
      );
    },
    // 服务器返回的动态菜单
    // menuDataRender: () => {
    //   const menuPermissions = initialState?.currentUser?.menuPermissions;
    //   // 前端过滤掉用户没有权限的菜单，后端是完整返回了
    //   const formatList = formatMenus(menuPermissions, []);
    //   // console.log(formatList);
    //   return formatList;
    // },
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

// @ts-ignore
interface Error extends ResponseError {
  message?: string;
  code?: number;
  traceId?: number | string;
  host?: string;
}
/** 异常处理程序
 * @see https://beta-pro.ant.design/docs/request-cn
 */
const errorHandler = (error: Error) => {
  const { response, request, message } = error;
  // 以下接口不做提示处理，需要自己在catch内做处理
  if (ignoreErrorRoutesReg.test(request.url)) {
    return;
  }

  // 需要排除获取用户信息接口的提示
  if (response && response.status) {
    const errorText = message || codeMessage[response.status] || response.statusText;
    const { status } = response;
    const { url } = request;

    if (url.includes('/users/find') && status === 401) {
      notification.warning({
        message: '登录状态过期或未登录',
        description: '请重新进行登录！',
      });
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText,
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

/**
 * @description 重刷token
 */
const refreshAccessToken = async () => {
  try {
    const data = await refreshToken();
    updateToken(data);
  } catch (err) {
    console.error('重新token失败', err);
  }
};

/**
 * @description 前端重刷token方案
 * 详细分析见项目 ReadMe.md内的 JWT 采用前端续期的问题
 */
const tokenRefreshInterceptor = (url: string, options: RequestOptionsInit) => {
  // 需要排除resetToken接口本身，否则会陷入死循环
  // 排除/users/login 和 /users/find接口
  if (url.match(/(\/users\/resetToken)|(\/users\/login)|(\/users\/find)/gi)) {
    return { url, options };
  }
  // 判断token时候过期
  if (!getToken()) {
    // token已过期
    history.push(loginPath);
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
  // 对于列表查询参数转换
  // current => page, pageSize => page_num
  const data: Record<string, any> = options.method === 'get' ? options.params : options.data;

  if (data?.current && data?.pageSize) {
    data.page = data?.current;
    data.limit = data?.pageSize;
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
  try {
    res = await response.clone().json();
  } catch (err) {
    // console.error(err);
    res = { code: 1 };
  }

  const code = res?.code;
  // 为了兼容antd pro原来的接口，以后替代完可以移除下面这句话
  if (code === undefined) {
    return response;
  }
  // 后台接口设计
  // 响应 { code: number, msg?: string, data: any, success: boolean }

  if (res.success === true) {
    // 对于查询列表
    // 格式响应list字段为data字段，适配antd pro-table的request配置
    if (res.data?.list && res.data?.total !== undefined) {
      res.data.data = res.data.list;
      delete res.data.list;
    }
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
  // eslint-disable-next-line
  return Promise.reject({
    code,
    message: res.msg,
    // traceId: 'xx',
    response,
  });
};

// https://umijs.org/zh-CN/plugins/plugin-request
export const request: RequestConfig = {
  // prefix: '/app', // http://10.10.30.251:8888
  timeout: 120 * 1000,
  errorHandler,
  requestType: 'json',
  requestInterceptors: [tokenRefreshInterceptor, requestInterceptor],
  responseInterceptors: [responseInterceptor],
};
