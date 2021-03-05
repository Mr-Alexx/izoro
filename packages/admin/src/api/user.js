import request from '@/utils/request'

/**
 * @date 2020/04/30 15:46
 * @author 潜
 * @description 登录
 * @param { Object } data { userNumber: 工号, password: 密码 }
 */
export function login (data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

/**
 * @date 2020/04/30 15:48
 * @author 潜
 * @description 获取用户信息
 * @param { String } token
 */
export function getInfo () {
  return request({
    url: '/auth/list',
    method: 'get'
  })
}

/**
 * @date 2020/04/30 15:49
 * @author 潜
 * @description 登出
 */
export function logout () {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
