import Cookies from 'js-cookie';

const TokenKey = 'cms-admin-token';
type Options = {
  expires?: number | Date;
};
type CookieItem = {
  key: string;
  value: string;
  expires: number | Date;
};

export function getCookie(key: string) {
  return Cookies.get(key);
}

export function setCookie(options: CookieItem) {
  const { key, value, expires } = options;
  Cookies.set(key, value, { expires });
}

export function getToken() {
  return Cookies.get(TokenKey);
}

/**
 * @date 2020/04/30 13:49
 * @author 潜
 * @description 设置token
 * @param { String } token
 * @param { Object } options
 * cookie设置过期时间
 */
export function setToken(token: string, options: Options) {
  return Cookies.set(TokenKey, token, options);
}

export function removeToken() {
  Cookies.remove(TokenKey);
  Cookies.remove('accessExpire');
  Cookies.remove('refreshAfter');
}

type AccessToken = {
  accessExpire: number | undefined;
  refreshAfter: number | undefined;
  accessToken: string | undefined;
};
export function updateToken(token: AccessToken) {
  const { accessExpire, refreshAfter, accessToken } = token;
  if (!accessExpire || !refreshAfter || !accessToken) {
    return;
  }
  const expires = accessExpire * 1000;
  const date = new Date(expires);
  // 设置token及过期时间
  setToken(accessToken, { expires: date });
  // 保存过期时间
  setCookie({ key: 'accessExpire', value: `${expires}`, expires: date });
  // 设置可刷新token临界时间
  setCookie({ key: 'refreshAfter', value: `${refreshAfter * 1000}`, expires: date });
}
