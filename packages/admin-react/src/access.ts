/**
 * @description 权限配置
 * 该插件只会在项目初始化后执行一次
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: (USERS_API.UserInfo & ANT_API.CurrentUser) | undefined }) {
  const { currentUser } = initialState || {};
  // 将权限数组转化为对象，查找速度快
  const permissionObj: Record<string, string> = {};
  (currentUser?.permissions || []).forEach((item: USERS_API.PermissionItem) => {
    permissionObj[item.code] = item.route_name;
  });

  const get = (code: string): boolean => {
    return true;
    if (!permissionObj) {
      return false;
    }
    return !!permissionObj[code];
  };
  return {
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
  };
}
