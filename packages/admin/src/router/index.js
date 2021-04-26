import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  // 登录
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  // {
  //   path: '/auth-redirect',
  //   component: () => import('@/views/login/auth-redirect'),
  //   hidden: true
  // },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/permission/user',
    meta: {},
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '工作台', icon: 'home', affix: true } // dashboard
      }
    ]
  },
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/index',
    meta: { title: '系统管理', icon: 'el-icon-setting' },
    children: [
      {
        path: 'index',
        component: () => import('@/views/permission/index'),
        name: 'Permission',
        meta: { title: '权限管理', icon: '' }
      },
      {
        path: 'user',
        component: () => import('@/views/permission/user'),
        name: 'User',
        meta: { title: '账号管理', icon: '' }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'Role',
        meta: { title: '角色管理', icon: '' }
      },
      {
        path: 'menu',
        component: () => import('@/views/permission/menu'),
        name: 'Menu',
        meta: { title: '菜单管理', icon: '' }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/tiktok',
    component: Layout,
    redirect: '/tiktok/talent-library',
    hidden: true,
    meta: { title: '抖音数据', icon: 'tiktok' },
    children: [
      {
        path: 'talent-library',
        name: 'TalentLibrary',
        component: () => import('@/views/tiktok/talent-library'),
        meta: { title: '达人库', icon: 'daren' }
      },
      {
        path: 'talent-detail/:id',
        name: 'TalentDetail',
        component: () => import('@/views/tiktok/talent-detail'),
        meta: { title: '达人详情' },
        hidden: true
      },
      {
        path: 'crawler',
        name: 'Crawler',
        component: () => import('@/views/tiktok/crawler'),
        meta: { title: '爬虫管理', icon: 'pachong' }
      },
      {
        path: 'category-list',
        name: 'TiktokCategoryList',
        component: () => import('@/views/tiktok/category-list'),
        meta: { title: '分类管理', icon: 'fenlei' }
      },
      {
        path: 'video-analysis-details/:id',
        name: 'VideoAnalysisDetails',
        component: () => import('@/views/tiktok/video-analysis-details'),
        meta: { title: '视频分析' },
        hidden: true
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    redirect: '/article/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'ArticleManage',
        component: () => import('@/views/article'),
        meta: { title: '文章管理', icon: 'tiktok' }
      },
      {
        path: 'editor',
        meta: { title: '写文章' },
        hidden: true,
        component: () => import('@/views/article/editor')
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/index',
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'AccountManage',
        meta: { title: '帐号管理', icon: 'tiktok' },
        component: () => import('@/views/account')
      }
    ]
  },
  {
    path: '/category',
    component: Layout,
    redirect: '/category/index',
    hidden: true,
    children: [
      {
        path: 'category',
        name: 'CategoryManage',
        meta: { title: '分类管理', icon: '' },
        component: () => import('@/views/category')
      }
    ]
  },
  {
    path: '/tag',
    component: Layout,
    redirect: '/tag/index',
    hidden: true,
    children: [
      {
        path: 'tag',
        name: 'TagManage',
        meta: { title: '标签管理', icon: '' },
        component: () => import('@/views/tag')
      }
    ]
  }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
