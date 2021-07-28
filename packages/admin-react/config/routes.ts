/** @format */

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
        name: '业务类型管理',
        path: 'business-type',
        component: './system/business-type/index',
      },
      {
        name: '状态字典管理',
        path: 'status-dictionary',
        component: './system/status-dictionary/index',
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
  {
    path: '/approval-flow',
    icon: 'icon-chanpin',
    name: '审批流',
    // hideInMenu: true,
    routes: [
      {
        path: 'index',
        name: '审批流管理',
        component: './approval-flow/index',
      },
      {
        path: 'edit/:id',
        name: '编辑审批流',
        component: './approval-flow/edit',
        hideInMenu: true,
      },
      {
        path: 'create',
        name: '新增审批流',
        component: './approval-flow/edit',
        hideInMenu: true,
        // layout: false,
      },
      {
        path: 'test',
        name: '全局配置测试',
        component: './approval-flow/test.tsx',
      },
    ],
  },
  {
    path: '/product-develop',
    icon: 'icon-chanpin',
    name: '商品开发',
    routes: [
      {
        path: '/product-develop/yangtao',
        name: '洋桃',
        component: './product-develop/yangtao/index',
      },
      //ebay
      {
        path: '/product-develop/ebay/index',
        name: 'Ebay商品开发',
        component: './product-develop/ebay/index',
      },
      {
        path: '/product-develop/ebay/view',
        name: 'Ebay商品开发',
        component: './product-develop/ebay/view/index',
        hideInMenu: true,
      },
      {
        path: '/product-develop/amazon',
        name: 'Amazon商品开发',
        component: './product-develop/amazon/index',
      },
      {
        path: '/product-develop/check-goods',
        name: '商品详情',
        component: './product-develop/check-goods/index',
        hideInMenu: true,
      },
      {
        path: '/product-develop/profit-allocation',
        name: '商品利润配置',
        component: './product-develop/profit-allocation/index',
        // hideInMenu: true,
      },

      //amazon-开发新品
      {
        path: '/product-develop/amazon/create',
        name: '开发新品',
        component: './product-develop/amazon/create/index',
        hideInMenu: true,
      },
      //ebay-开发新品
      {
        path: '/product-develop/ebay/create',
        name: '开发新品',
        component: './product-develop/ebay/create/index',
        hideInMenu: true,
      },
      {
        path: '/product-develop/ebay/inbound-label',
        name: '入库标签管理',
        component: './product-develop/ebay/inbound-label/index',
        hideInMenu: true,
      },
      {
        path: '/product-develop/ebay/category-analysis',
        name: '分类分析图',
        component: './product-develop/ebay/category-analysis/index',
        hideInMenu: true,
      },
      //洋桃-开发新品
      {
        path: '/product-develop/yangtao/create',
        name: '开发新品',
        component: './product-develop/yangtao/create/index',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/finished-store',
    icon: 'icon-chengpinku',
    name: '商品成品库',
    routes: [
      {
        path: 'product-store',
        name: '商品库',
        routes: [
          {
            path: 'spu',
            name: 'SPU管理',
            component: './finished-store/product-store/spu/index',
          },
          {
            path: 'sku',
            name: 'SKU管理',
            component: './finished-store/product-store/sku/index',
          },
          {
            path: 'create-product-sku',
            name: '新增商品',
            component: './finished-store/product-store/create-product-sku/index',
            hideInMenu: true,
          },
          //查看商品sku
          {
            path: 'view-product-sku',
            name: '查看商品',
            component: './finished-store/product-store/view-product-sku/index',
            hideInMenu: true,
          },
          {
            path: 'package-update',
            name: '商品包装编辑',
            component: './finished-store/product-store/package-update/index',
            hideInMenu: true,
          },
          //查看商品spu
          {
            path: 'view-product-spu',
            name: '查看商品',
            component: './finished-store/product-store/view-product-spu/index',
            hideInMenu: true,
          },
          {
            path: 'add-spu-pic',
            name: '新增SPU图片',
            component: './finished-store/product-store/add-spu-pic/index',
            hideInMenu: true,
          },
          {
            path: 'product-attr-detail',
            name: '详情列表',
            component: './finished-store/product-store/product-attr-detail/index',
            hideInMenu: true,
          },
          {
            path: 'add-product-detail',
            name: '添加详情',
            component: './finished-store/product-store/product-attr-detail/add-product-detail/index',
            hideInMenu: true,
          },
        ],
      },
      {
        path: 'bundle-joint-product',
        name: '捆绑/组合商品',
        routes: [
          {
            path: 'bundle',
            name: '捆绑商品',
            component: './finished-store/bundle-joint-product/bundle/index',
          },
          {
            path: 'create-bundle-product',
            name: '新增捆绑商品',
            component: './finished-store/bundle-joint-product/create-bundle-product/index',
            hideInMenu: true,
          },
          {
            path: 'view-product-bundle',
            name: '查看捆绑商品',
            component: './finished-store/bundle-joint-product/view-product-bundle/index',
            hideInMenu: true,
          },
          {
            path: 'joint',
            name: '组合商品',
            component: './finished-store/bundle-joint-product/joint/index',
          },
          {
            path: 'view-product-joint',
            name: '查看组合商品',
            component: './finished-store/bundle-joint-product/view-product-joint/index',
            hideInMenu: true,
          },
          {
            path: 'new-processing',
            name: '新增加工',
            component: './finished-store/bundle-joint-product/new-processing/index',
            hideInMenu: true,
          },
        ],
      },
      // {
      //   path: 'product-category',
      //   name: '商品分类管理',
      //   component: './finished-store/product-category/index',
      // },
      // {
      //   path: 'product-spu-attr',
      //   name: '商品属性管理',
      //   component: './finished-store/product-spu-attr/index',
      // },
      // {
      //   path: 'product-development-sheet/index',
      //   name: '报价方案管理',
      //   component: './finished-store/product-development-sheet/index',
      // },
      // {
      //   path: 'product-development-sheet/view',
      //   name: '报价方案详情',
      //   component: './finished-store/product-development-sheet/view/index',
      //   hideInMenu: true,
      // },
      // {
      //   path: 'product-development-sheet/add-quotation',
      //   name: '添加报价',
      //   component: './finished-store/product-development-sheet/add-quotation/index',
      //   hideInMenu: true,
      // },
      // {
      //   path: 'template-module',
      //   name: '模板管理',
      //   routes: [
      //     {
      //       path: 'master-template-upload/index',
      //       name: '母版',
      //       component: './finished-store/template-module/master-template-upload/index',
      //     },
      //     {
      //       path: 'master-template-upload/create',
      //       name: '添加母版',
      //       component: './finished-store/template-module/master-template-upload/create/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'master-template-upload/view',
      //       name: '旧系统模版',
      //       component: './finished-store/template-module/master-template-upload/view/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'master-module/index',
      //       name: '母版模板',
      //       component: './finished-store/template-module/master-module/index',
      //     },
      //     {
      //       path: 'master-module/create',
      //       name: '新增母版模板',
      //       component: './finished-store/template-module/master-module/create/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'template-upload/index',
      //       name: '上架模板',
      //       component: './finished-store/template-module/template-upload/index',
      //     },
      //     {
      //       path: 'template-upload/view',
      //       name: '上架模板',
      //       component: './finished-store/template-module/template-upload/view/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'template-upload/module-content-update',
      //       name: '编辑模版模块内容',
      //       component: './finished-store/template-module/template-upload/module-content-update/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'template-component/index',
      //       name: '模板组件',
      //       component: './finished-store/template-module/template-component/index',
      //     },
      //     {
      //       path: 'template-content-version/index',
      //       name: '内容版本',
      //       component: './finished-store/template-module/template-content-version/index',
      //     },
      //     {
      //       path: 'template-content-version/view',
      //       name: '内容版本',
      //       component: './finished-store/template-module/template-content-version/view/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'template-content-version/content-update',
      //       name: '编辑模版内容',
      //       component: './finished-store/template-module/template-content-version/content-update/index',
      //       hideInMenu: true,
      //     },
      //     {
      //       path: 'template-content-version/create',
      //       name: '添加内容版本',
      //       component: './finished-store/template-module/template-content-version/create/index',
      //       hideInMenu: true,
      //     },
      //   ],
      // },
      {
        path: 'shot-product/index',
        name: '图片需求单',
        component: './finished-store/shot-product/index',
      },
      {
        path: 'shot-product/create',
        name: '新增图片需求',
        component: './finished-store/shot-product/create/index',
        hideInMenu: true,
      },
      {
        path: 'shot-product/view',
        name: '查看图片需求单',
        component: './finished-store/shot-product/view/index',
        hideInMenu: true,
      },
    ],
  },
  {
    path: '/shelf',
    icon: 'icon-shangjia',
    name: '商品上架',
    routes: [
      {
        path: 'ebay',
        icon: 'setting',
        name: 'ebay上架管理',
        routes: [
          //上架计划
          {
            path: 'schedule/index',
            icon: 'setting',
            name: '上架计划',
            component: './shelf/ebay/ebay-schedule/index',
          },
          {
            path: 'schedule/view',
            icon: 'setting',
            name: '查看上架计划',
            component: './shelf/ebay/ebay-schedule/view/index',
            hideInMenu: true,
          },
          {
            path: 'schedule/update',
            icon: 'setting',
            name: '编辑',
            component: './shelf/ebay/ebay-schedule/update/index',
            hideInMenu: true,
          },
          {
            path: 'schedule/create',
            icon: 'setting',
            name: '新增上架计划',
            component: './shelf/ebay/ebay-schedule/create/index',
            hideInMenu: true,
          },
          {
            path: 'schedule/bind-index',
            icon: 'setting',
            name: '上架计划（捆绑号）',
            component: './shelf/ebay/ebay-schedule/bind-index/index',
            hideInMenu: true,
          },
          {
            path: 'schedule/bind-create',
            icon: 'setting',
            name: '新增上架计划（捆绑号）',
            component: './shelf/ebay/ebay-schedule/bind-create/index',
            hideInMenu: true,
          },
          {
            path: 'schedule/bind-view',
            icon: 'setting',
            name: '查看上架计划（捆绑号）',
            component: './shelf/ebay/ebay-schedule/bind-view/index',
            hideInMenu: true,
          },
          {
            path: 'schedule/bind-update',
            icon: 'setting',
            name: '编辑上架计划（捆绑号）',
            component: './shelf/ebay/ebay-schedule/bind-update/index',
            hideInMenu: true,
          },
          //商品列表
          {
            path: 'product-list/index',
            icon: 'setting',
            name: '商品列表',
            component: './shelf/ebay/product-list/index',
          },
          {
            path: 'product-list/create',
            icon: 'setting',
            name: '商品新增',
            component: './shelf/ebay/product-list/create/index',
            hideInMenu: true,
          },
          //刊登列表
          {
            path: 'publish-list',
            icon: 'setting',
            name: '刊登列表',
            routes: [
              {
                path: 'index',
                icon: 'setting',
                name: '刊登列表',
                component: './shelf/ebay/publish-list/index',
              },
              // {
              //   path: 'stay-on',
              //   icon: 'setting',
              //   name: '刊登列表',
              //   component: './shelf/ebay/publish-list/stay-on/index',
              //   hideInMenu: true,
              // },
              // {
              //   path: 'shelves',
              //   icon: 'setting',
              //   name: '刊登列表',
              //   component: './shelf/ebay/publish-list/shelves/index',
              //   hideInMenu: true,
              // },
              {
                path: 'view',
                icon: 'setting',
                name: '查看',
                component: './shelf/ebay/publish-list/view/index',
                hideInMenu: true,
              },
              {
                path: 'edit',
                icon: 'setting',
                name: '编辑',
                component: './shelf/ebay/publish-list/edit/index',
                hideInMenu: true,
              },
              {
                path: 'sku',
                icon: 'setting',
                name: 'SKU列表',
                component: './shelf/ebay/publish-list/sku/index',
              },
            ],
          },
          {
            path: 'publish-push/index',
            icon: 'setting',
            name: '上架推送列表',
            component: './shelf/ebay/publish-push/index',
          },
          {
            path: 'ad',
            icon: 'setting',
            name: 'ebay广告',
            routes: [
              {
                path: 'publish-campaign/index',
                icon: 'setting',
                name: '刊登列表',
                component: './shelf/ebay/advertise/publish-campaign/index',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: '运营中心',
    icon: 'user',
    path: '/operation-center',
    routes: [
      {
        name: '洋桃运营',
        icon: 'smile',
        path: 'yangtao',
        routes: [
          {
            name: '充值',
            icon: 'smile',
            path: 'mobile-list/index',
            component: './operation-center/yangtao/mobile-list/index',
          },
          {
            name: '新增手机号',
            icon: 'smile',
            path: 'mobile-list/create',
            component: './operation-center/yangtao/mobile-list/create/index',
            hideInMenu: true,
          },
          {
            name: '编辑手机号',
            icon: 'smile',
            path: 'mobile-list/edit',
            component: './operation-center/yangtao/mobile-list/create/index',
            hideInMenu: true,
          },
          {
            name: '查看',
            icon: 'smile',
            path: 'mobile-list/view',
            component: './operation-center/yangtao/mobile-list/view/index',
            hideInMenu: true,
          },
          {
            name: '账号管理',
            icon: 'smile',
            path: 'live-user-manage/index',
            component: './operation-center/yangtao/live-user-manage/index',
          },
          {
            name: '新增账号',
            icon: 'smile',
            path: 'live-user-manage/create',
            component: './operation-center/yangtao/live-user-manage/create/index',
            hideInMenu: true,
          },
          {
            name: '编辑账号',
            icon: 'smile',
            path: 'live-user-manage/edit',
            component: './operation-center/yangtao/live-user-manage/create/index',
            hideInMenu: true,
          },
          // {
          //   name: '店铺账号管理',
          //   icon: 'smile',
          //   path: 'shop-user-manage',
          //   component: './operation-center/yangtao/shop-user-manage/index',
          // },
        ],
      },
    ],
  },
  {
    name: '精选联盟',
    icon: 'user',
    path: '/tiktok-selection-alliance',
    routes: [
      {
        name: '订单管理',
        icon: 'smile',
        path: 'order',
        routes: [
          {
            name: '订单管理',
            icon: 'smile',
            path: 'index',
            component: './tiktok-selection-alliance/order/index',
          },
          {
            name: '查看',
            icon: 'smile',
            path: 'view',
            component: './tiktok-selection-alliance/order/view/index',
            hideInMenu: true,
          },
          {
            name: '线下结算',
            icon: 'smile',
            path: 'offline-commission',
            component: './tiktok-selection-alliance/order/offline-commission/index',
          },
        ],
      },
      {
        name: '供应商管理',
        icon: 'smile',
        path: 'supplier',
        routes: [
          {
            name: '供应商',
            icon: 'smile',
            path: 'index',
            component: './tiktok-selection-alliance/supplier/index',
          },
          {
            name: '查看',
            icon: 'smile',
            path: 'view',
            component: './tiktok-selection-alliance/supplier/view/index',
            hideInMenu: true,
          },
          {
            name: '新增供应商',
            icon: 'smile',
            path: 'add-supplier',
            component: './tiktok-selection-alliance/supplier/add-supplier/index',
            hideInMenu: true,
          },
          {
            name: '新增商品',
            icon: 'smile',
            path: 'add-product',
            component: './tiktok-selection-alliance/supplier/add-product/index',
            hideInMenu: true,
          },
        ],
      },
    ],
  },
  // {
  //   path: '/',
  //   icon: 'icon-douyin',
  //   name: '抖音运营',
  // },
  // {
  //   path: '/',
  //   icon: 'icon-kefu',
  //   name: '客服管理',
  // },
  // {
  //   path: '/dashboard',
  //   name: '首页',
  //   icon: 'dashboard',
  //   routes: [
  //     {
  //       name: '分析页',
  //       icon: 'smile',
  //       path: '/dashboard/analysis',
  //       component: './dashboard/analysis',
  //     },
  //     {
  //       name: '监控页',
  //       icon: 'smile',
  //       path: '/dashboard/monitor',
  //       component: './dashboard/monitor',
  //     },
  //     {
  //       name: '工作台',
  //       icon: 'smile',
  //       path: '/dashboard/workplace',
  //       component: './dashboard/workplace',
  //     },
  //   ],
  // },
  // {
  //   path: '/test',
  //   icon: 'form',
  //   name: '测试菜单',
  //   routes: [
  //     {
  //       path: '/test/test-form',
  //       icon: 'form',
  //       name: '测试表格',
  //       component: './test/index',
  //     },
  //     {
  //       path: '/test/dnd',
  //       icon: 'form',
  //       name: '拖动测试',
  //       component: './test/dnd',
  //     },
  //   ],
  // },
  {
    path: '/form',
    icon: 'form',
    name: '表单',
    routes: [
      //     {
      //       name: '基础表单',
      //       icon: 'smile',
      //       path: '/form/basic-form',
      //       component: './form/basic-form',
      //     },
      //     {
      //       name: '分步表单',
      //       icon: 'smile',
      //       path: '/form/step-form',
      //       component: './form/step-form',
      //     },
      {
        name: '高级表单',
        icon: 'smile',
        path: '/form/advanced-form',
        component: './form/advanced-form',
      },
    ],
  },
  // {
  //   path: '/list',
  //   icon: 'table',
  //   name: '列表',
  //   routes: [
  //     {
  //       path: '/list/search',
  //       name: '搜索列表',
  //       component: './list/search',
  //       routes: [
  //         {
  //           path: '/list/search',
  //           redirect: '/list/search/articles',
  //         },
  //         {
  //           name: '文章列表',
  //           icon: 'smile',
  //           path: '/list/search/articles',
  //           component: './list/search/articles',
  //         },
  //         {
  //           name: '项目列表',
  //           icon: 'smile',
  //           path: '/list/search/projects',
  //           component: './list/search/projects',
  //         },
  //         {
  //           name: '应用列表',
  //           icon: 'smile',
  //           path: '/list/search/applications',
  //           component: './list/search/applications',
  //         },
  //       ],
  //     },
  //     {
  //       name: '表格列表',
  //       icon: 'smile',
  //       path: '/list/table-list',
  //       component: './list/table-list',
  //     },
  //     {
  //       name: '基础列表',
  //       icon: 'smile',
  //       path: '/list/basic-list',
  //       component: './list/basic-list',
  //     },
  //     {
  //       name: '卡片列表',
  //       icon: 'smile',
  //       path: '/list/card-list',
  //       component: './list/card-list',
  //     },
  //   ],
  // },
  // {
  //   path: '/profile',
  //   name: '配置文件',
  //   icon: 'profile',
  //   routes: [
  //     {
  //       name: '基础配置',
  //       icon: 'smile',
  //       path: '/profile/basic',
  //       component: './profile/basic',
  //     },
  //     {
  //       name: '高级配置',
  //       icon: 'smile',
  //       path: '/profile/advanced',
  //       component: './profile/advanced',
  //     },
  //   ],
  // },
  // {
  //   name: '结果页',
  //   icon: 'CheckCircleOutlined',
  //   path: '/result',
  //   routes: [
  //     {
  //       name: '成功',
  //       icon: 'smile',
  //       path: '/result/success',
  //       component: './result/success',
  //     },
  //     {
  //       name: '失败',
  //       icon: 'smile',
  //       path: '/result/fail',
  //       component: './result/fail',
  //     },
  //   ],
  // },
  // {
  //   name: '错误页',
  //   icon: 'warning',
  //   path: '/exception',
  //   routes: [
  //     {
  //       name: '403',
  //       icon: 'smile',
  //       path: '/exception/403',
  //       component: './exception/403',
  //     },
  //     {
  //       name: '404',
  //       icon: 'smile',
  //       path: '/exception/404',
  //       component: './exception/404',
  //     },
  //     {
  //       name: '500',
  //       icon: 'smile',
  //       path: '/exception/500',
  //       component: './exception/500',
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

  // {
  //   name: '编辑',
  //   icon: 'highlight',
  //   path: '/editor',
  //   routes: [
  //     {
  //       name: '流程图',
  //       icon: 'smile',
  //       path: '/editor/flow',
  //       component: './editor/flow',
  //     },
  //     {
  //       name: '脑图',
  //       icon: 'smile',
  //       path: '/editor/mind',
  //       component: './editor/mind',
  //     },
  //     {
  //       name: '拓扑图',
  //       icon: 'smile',
  //       path: '/editor/koni',
  //       component: './editor/koni',
  //     },
  //   ],
  // },
  {
    component: '404',
  },
];
