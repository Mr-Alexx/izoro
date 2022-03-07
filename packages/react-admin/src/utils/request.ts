import { request } from 'umi';
import type { RequestOptionsInit } from 'umi-request';

// config define: {}内定义的PRODUCT_SERVER，.eslintrc.js内加入globals对象
// @ts-ignore
const prefix = PRODUCT_SERVER ? 'https://www.izoro.top' : 'http://localhost:3001';
// const prefix = PRODUCT_SERVER ? 'http://teamsure.api.bz-bss.com' : 'http://local.op.com';
console.log(`[API]: ${prefix}`);

export const get = (url: string, params?: Record<string, any> | URLSearchParams, options?: RequestOptionsInit) => {
  const fullUrl = url.includes('/api') ? url : prefix + url;
  return request(fullUrl, {
    ...options,
    method: 'GET',
    params,
    // useCache: true,
    // getResponse: true,
  });
};

export const post = (url: string, data?: any, options?: RequestOptionsInit) => {
  const fullUrl = url.includes('/api') ? url : prefix + url;
  // see https://github.com/umijs/umi-request
  return request(fullUrl, {
    ...options,
    method: 'POST',
    data,
  });
};

export const patch = (url: string, data?: any, headers?: any) => {
  const fullUrl = url.includes('/api') ? url : prefix + url;
  return request(fullUrl, {
    method: 'PATCH',
    data,
    headers,
  });
};

export const del = (url: string, data?: any, headers?: any) => {
  const fullUrl = url.includes('/api') ? url : prefix + url;
  return request(fullUrl, {
    method: 'DELETE',
    data,
    headers,
  });
};
