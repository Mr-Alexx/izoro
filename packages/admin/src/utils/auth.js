import Cookies from 'js-cookie'
const TokenKey = 'ErpBiToken'

export function getToken () {
  return Cookies.get(TokenKey)
}

/**
 * @date 2020/04/30 13:49
 * @author 潜
 * @description 设置token
 * @param { String } token
 * @param { Boolean } isRemember
 * ① isRemember为true，则当天免登录
 * ② isRemember为false，则一小时后token过期
 * cookie设置过期时间
 */
export function setToken (token, isRemember) {
  let expires = 1 // 1天过期
  if (isRemember) {
    // 当天23:59:59
    expires = new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
  }
  return Cookies.set(TokenKey, token, { expires })
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}
