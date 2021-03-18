import router from './router'
import store from './store'
import { Message } from 'element-ui'

import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo
      // const hasRoles = store.getters.roles && store.getters.roles.length > 0
      const hasRoles = !!store.getters.roles
      // console.log('===' + store.getters.roles)
      // console.log(hasRoles)
      // console.log(store.getters.roles)
      if (hasRoles) {
        next()
      } else {
        try {
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const user = await store.dispatch('user/getInfo')

          const accessRoutes = await store.dispatch('permission/generateRoutes', [user.role])
          router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
        } catch (error) {
          console.error(error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message({
            type: 'error',
            message: error || 'Has Error'
          })
          next(`/login-regist/login?redirect=${to.fullPath}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
