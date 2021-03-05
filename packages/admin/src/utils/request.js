import axios from 'axios'
import { Message } from 'element-ui'
import { getToken } from '@/utils/auth'
import router from '@/router'

// create an axios instance
const service = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_URL : process.env.VUE_APP_URL, // url = base url + request url
  // baseURL: 'http://api.bz-bss.com',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers.token = getToken()
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    const code = Number(res.code)
    // 状态码0为成功，1为失败, -99为token过期或未登录
    if (code === -99) {
      Message({
        type: 'error',
        message: '登录过期，请重新登录'
      })
      router.replace('/login')
      return
    } else if (code === 0) {
      return res.response || res.data
    } else {
      Message({
        type: 'error',
        message: res.msg || 'Error'
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      type: 'error',
      message: error.message || error.msg
    })
    return Promise.reject(error)
  }
)

export default service
