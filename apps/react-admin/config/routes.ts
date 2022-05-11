export default [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: '首页',
    icon: 'icon-home',
    // component: './home/index',
    component: './dashboard/workplace',
  },
  {
    path: '/user',
    name: '用户',
    hideInMenu: true,
    routes: [
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        path: '/user/login',
        name: '登录',
        component: './user/login',
        layout: false,
        hideInSearch: true,
      },
      {
        path: '/user/center',
        name: '个人中心',
        component: './user/center/index',
      },
      // {
      //   path: '/user/change-password',
      //   name: '修改密码',
      //   component: './user/change-password/index',
      //   hideInMenu: true,
      //   hideInSearch: true,
      // },
      {
        component: '404',
        hideInSearch: true,
      },
    ],
  },
  {
    name: '账号管理',
    icon: 'icon-account',
    path: '/account',
    component: './account/index',
  },
  {
    name: '角色管理',
    icon: 'icon-role',
    path: 'role',
    component: './role/index',
  },
  {
    name: '菜单管理',
    icon: 'icon-menu',
    path: '/menu',
    component: './menu/index',
  },

  // {
  //   name: '权限管理',
  //   path: 'permission',
  //   component: './system/permission/index',
  // },
  // {
  //   name: '接口管理',
  //   path: 'api-route',
  //   component: './system/api-route/index',
  // },

  {
    name: '分类管理',
    icon: 'icon-category',
    path: 'category',
    component: './category/index',
  },
  {
    name: '文章管理',
    icon: 'icon-article',
    path: '/article',
    routes: [
      {
        path: '/article',
        redirect: '/article/index',
      },
      {
        path: '/article/index',
        component: './article/index',
      },
      {
        name: '新增文章',
        path: '/article/add',
        component: './article/edit',
        layout: false,
        hideInMenu: true,
      },
      {
        name: '编辑文章',
        path: '/article/edit/:id',
        component: './article/edit',
        hideInMenu: true,
        hideInSearch: true,
      },
    ],
  },

  // {
  //   name: '定时任务管理',
  //   path: 'schedule',
  //   component: './system/schedule',
  // },
  {
    component: '404',
  },
];
