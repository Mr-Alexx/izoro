/**
 * @description 权限配置
 * 该插件只会在项目初始化后执行一次
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */

// 将权限菜单扁平化为一维对象数组
const formatTreeData2Data = (data?: UserApi.MenuItem[]): UserApi.MenuItem[] => {
  if (!data) {
    return [];
  }
  const res: UserApi.MenuItem[] = [];
  data.forEach((item: UserApi.MenuItem) => {
    if (item.children) {
      res.push({
        ...item,
        children: [],
      });
      res.push(...formatTreeData2Data(item.children));
    } else {
      res.push(item);
    }
  });
  return res;
};

export default function access(initialState: { currentUser?: (UserApi.UserInfo & ANT_API.CurrentUser) | undefined }) {
  const { currentUser } = initialState || {};
  // 将权限数组转化为对象，查找速度快
  const permissionObj: Record<string, string> = {};
  (currentUser?.permissions || []).forEach((item: UserApi.PermissionItem) => {
    permissionObj[item.code] = item.route_name;
  });

  // 将用户的树形菜单列表扁平化为一维对象数组
  // 将用户能够显示的菜单过滤出来
  // 以path作为key存储到routeObj对象内
  // 如果 当前路由对象 的path在routeObj内，则由权限访问
  const routeObj: Record<string, boolean> = {};
  const menus = formatTreeData2Data(currentUser?.menuPermissions);
  menus.forEach(menu => {
    if (menu.checked === 1) {
      routeObj[menu.path] = true;
    }
  });

  const get = (code: string): boolean => {
    return true;
    if (!permissionObj) {
      return false;
    }
    return !!permissionObj[code];
  };
  return {
    /**
     * @description 路由权限判定方法
     * 判断当前路由对象是否在存在该用户能访问的菜单里面
     * @param {Object} route 路由配置对象
     * @see https://beta-pro.ant.design/docs/authority-management-cn
     */
    routeAccessFilter: (route: any) => {
      // console.log('route', route);
      // return routeObj[route.path];
      return true;
    },
    // 系统管理
    system: {
      user: {
        create: get('users:CreateUser'),
        edit: get('users:EditUser'),
        view: get('users:ListUser'),
        detail: get('users:FindUser'),
        bindRole: get('users:UserBindRole'),
        grandPermission: get('users:GrantUser'), // 用户菜单授权，暂时没用
      },
      menu: {
        create: get('users:CreateMenu'),
        edit: get('users:EditMenu'),
        view: get('users:ListMenu'),
        grandPermission: get('users:BindPermission'),
        permissionList: get('users:ListPermission'),
      },
      role: {
        create: get('users:CreateRole'),
        edit: get('users:EditRole'),
        view: get('users:ListRole'),
        grandMenuPermission: get('users:GrantRole'), // 角色授权菜单和权限
      },
      permission: {
        create: get('users:CreatePermission'),
        edit: get('users:EditPermission'),
        view: get('users:ListPermission'),
        createRoute: get('users:CreateRoute'),
        routeList: get('users:ListRoute'),
        editRoute: get('users:EditRoute'),
      },
      route: {
        view: get('users:ListRoute'),
        edit: get('users:EditRoute'),
        create: get('users:CreateRoute'),
      },
      business: {
        create: get('business:CreateWork'),
        edit: get('business:EditWork'),
        view: get('business:ListWork'),
      },
      dictionary: {
        create: get('dictionary:CreateStatus'),
        edit: get('dictionary:EditStatus'),
        delete: get('dictionary:DeleteStatus'),
        view: get('dictionary:StatusList'),
      },
    },
    // 商品成品库
    product: {
      // ebay设计配置
      ebayDesignConfig: {
        create: get('product:CreateShotProduct'),
        edit: get('product:UpdateShotProduct'),
        view: get('product:ListShotProduct'),
        detail: get('product:GetShotProduct'),
        addConfig: get('product:SetDesignConfig'),
      },
    },
    // 商品开发
    develop: {
      amazon: {
        view: get('develop:AmazonDevProductList'),
        detail: get('develop:AmazonDevProductView'),
        create: get('develop:AmazonDevProductCreate'),
        edit: get('develop:AmazonDevProductUpdate'),
      },
      shopee: {
        view: get('develop:ShopeeDevProductList'),
        detail: get('develop:ShopeeDevProductView'),
        create: get('develop:ShopeeDevProductCreate'),
        edit: get('develop:ShopeeDevProductUpdate'),
      },
      yangtao: {
        view: get('develop:YtDevProductList'),
        detail: get('develop:YtDevProductView'),
        create: get('develop:YtDevProductCreate'),
        edit: get('develop:YtDevProductUpdate'),
      },
      shopify: {
        view: get('develop:ShopifyDevProductList'),
        detail: get('develop:ShopifyDevProductView'),
        create: get('develop:ShopifyDevProductCreate'),
        edit: get('develop:ShopifyDevProductUpdate'),
      },
    },
    // 平台分类
    platformCategory: {
      amazon: {
        view: get('develop:AmazonCategoryList'),
        detail: get('develop:AmazonCategoryView'),
        create: get('develop:AmazonCategoryCreate'),
        edit: get('develop:AmazonCategoryUpdate'),
        sort: get('develop:AmazonCategorySort'),
      },
      shopee: {
        view: get('develop:ShopeeCategoryList'),
        detail: get('develop:ShopeeCategoryView'),
        create: get('develop:ShopeeCategoryCreate'),
        edit: get('develop:ShopeeCategoryUpdate'),
        sort: get('develop:ShopeeCategorySort'),
      },
      yangtao: {
        view: get('develop:YtCategoryList'),
        detail: get('develop:YtCategoryView'),
        create: get('develop:YtCategoryCreate'),
        edit: get('develop:YtCategoryUpdate'),
        sort: get('develop:YtCategorySort'),
      },
      shopify: {
        view: get('develop:ShopifyCategoryList'),
        detail: get('develop:ShopifyCategoryView'),
        create: get('develop:ShopifyCategoryCreate'),
        edit: get('develop:ShopifyCategoryUpdate'),
        sort: get('develop:ShopifyCategorySort'),
      },
    },
  };
}
