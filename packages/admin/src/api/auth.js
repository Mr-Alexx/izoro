import request from '@/utils/request'

// 登录
export function login ({ account, password }) {
  return request({
    url: '/auth/login',
    method: 'POST',
    data: {
      account,
      password
    }
  })
}
