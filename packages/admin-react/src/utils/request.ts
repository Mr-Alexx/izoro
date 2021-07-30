import { request } from 'umi';

const prefix = 'http://localhost:3000';

export const get = (url: string, params?: any) => {
  const fullUrl = url.includes('/api') ? url : prefix + url;
  return request(fullUrl, {
    method: 'GET',
    params,
  });
};

export const post = (url: string, data?: any, headers?: any) => {
  const fullUrl = url.includes('/api') ? url : prefix + url;
  return request(fullUrl, {
    method: 'POST',
    data,
    headers,
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
