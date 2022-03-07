export default [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: '首页',
    icon: 'icon-shouye',
    // component: './home/index',
    component: './dashboard/workplace',
  },
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: '登录',
        component: './user/login',
      },
      {
        path: '/user',
        redirect: '/user/login',
      },
      {
        component: '404',
      },
    ],
  },
  {
    path: '/system',
    icon: 'icon-shezhi',
    name: '系统管理',
    routes: [
      {
        name: '账号管理',
        path: 'user',
        component: './system/user/index',
      },
      {
        name: '角色管理',
        path: 'role',
        component: './system/role/index',
      },
      {
        name: '菜单管理',
        path: 'menu',
        component: './system/menu/index',
      },
      {
        name: '权限管理',
        path: 'permission',
        component: './system/permission/index',
      },
      {
        name: '接口管理',
        path: 'api-route',
        component: './system/api-route/index',
      },
      {
        name: '日志注册管理',
        path: 'logs',
        component: './system/logs/index',
      },
      {
        name: '定时任务管理',
        path: 'schedule',
        component: './system/schedule',
      },
    ],
  },
  // {
  //   path: '/approval-flow',
  //   icon: 'icon-chanpin',
  //   name: '审批流',
  //   // hideInMenu: true,
  //   routes: [
  //     {
  //       path: 'index',
  //       name: '审批流管理',
  //       component: './approval-flow/index',
  //     },
  //     {
  //       path: 'edit/:id',
  //       name: '编辑审批流',
  //       component: './approval-flow/edit',
  //       hideInMenu: true,
  //     },
  //     {
  //       path: 'create',
  //       name: '新增审批流',
  //       component: './approval-flow/edit',
  //       hideInMenu: true,
  //       // layout: false,
  //     },
  //     {
  //       path: 'test',
  //       name: '全局配置测试',
  //       component: './approval-flow/test.tsx',
  //     },
  //   ],
  // },
  {
    name: '账号',
    icon: 'user',
    path: '/account',
    hideInMenu: true,
    routes: [
      {
        name: '设置',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
      },
    ],
  },
  {
    component: '404',
  },
];
