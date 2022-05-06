const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3001' : 'https://api.izoro.top';

export type Response = {
  success: boolean; // if request is success
  data?: any; // response data
  errorCode?: string; // code for errorType
  errorMessage?: string; // message display to user
  showType?: number; // error display type： 0 silent; 1 message.warn; 2 message.error; 4 notification; 9 page
  traceId?: string; // Convenient for back-end Troubleshooting: unique request ID
  host?: string; // onvenient for backend Troubleshooting: host of current access server
};

type Params = {
  params?: {
    [key: string]: any;
  };
};

type RequestOptions = RequestInit & Params;

export const request = async (url: string, options: RequestOptions = {}) => {
  const { headers, params, body } = options;
  const method = options.method.toLocaleUpperCase();

  // 如果接口是个完整的链接，则不添加前缀
  if (!/^http(s?):\/\//i.test(url)) {
    url = BASE_URL + url;
  }

  // 对get参数处理，整合成query形式
  if (typeof params === 'object') {
    const query = Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&');
    url += `${url.includes('?') ? '&' : '?'}${query}`;
  }

  // 对于body传参，统一处理成json形式
  if (!!body) {
    options.body = JSON.stringify(body);
  }

  if (method === 'GET') {
    // get统一使用query形式
  } else if (method === 'POST') {
    // post统一采用json
    headers['Content-Type'] = 'application/json';
  }

  return fetch(url, options)
    .then(async response => {
      // 走到这边不一定是成功的：
      // Fetch的特点的是，只要服务器有返回结果，不论状态码是多少，它都认为是成功
      const { status } = response;

      if (status < 200 || status >= 400) {
        return Promise.reject({
          success: false,
          errorCode: status,
          errorMessage: response.text(),
        });
      }

      const { data } = await response.json();
      return Promise.resolve(data);
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

export const get = (url: string, params?: Record<string, any>, options?: RequestOptions) =>
  request(url, {
    ...options,
    method: 'GET',
    params,
  });

export const post = (url: string, data?: BodyInit, options?: RequestOptions) =>
  request(url, {
    ...options,
    method: 'POST',
    body: data,
  });
