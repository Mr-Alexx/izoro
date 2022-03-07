/**
 * @description  users模块接口 参数/结果 类型
 */
declare namespace USERS_API {
  type LoginParams = {
    account: string; // 账号
    password: string; // 密码
  };
  type LoginRes = {
    accessExpire: number; // token过期时间
    refreshAfter: number; // token在这之后刷新
    accessToken: string; // token
  };

  /* =============== user =============== */
  // 用户列表查询参数
  type UserListParams = API.ListQueryParams & {
    // page?: number; // 页码
    // pageNum?: number; // //每页数量
    nickname?: string; // 昵称
    account?: string; // 账号
    real_name?: string; // 真实姓名
    email?: string; // email
    leader_user_id?: number; // //上级ID
    status?: number; // 状态：0 禁用，1 正常，默认1
    tag?: number; // 标签
    order?: string; // 排序(asc,desc)
  };
  // 用户信息
  type UserInfo = {
    id: number; // 用户ID
    nickname: string; // 昵称
    account: string; // 账号
    real_name: string; // 真实姓名
    avatar: string; // 头像
    email: string; // email
    need_change_pw: number; // 是否需要修改密码
    leader_user_id: number; // 上级ID
    status: number; // 状态：0 离职，1 正常
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
    tag: number; // 标签
    password?: string;
    roles?: RoleInfo[];
    menuPermissions: MenuItem[];
    permissions: PermissionItem[];
  };
  // 创建用户
  type CreateUserParams = {
    nickname?: string; // 昵称
    account: string; // 账号
    real_name?: string; // 真实姓名
    email?: string; // email
    password: string; // 密码
    leader_user_id?: number; // 上级ID
    status?: number; // 状态：0 离职，1 正常
    tag?: number; // 标签
  };
  // 用户绑定角色参数类型
  type UserBindRolesParams = {
    user_id: number; // 用户id
    role_ids: number[] | undefined; // 角色id数组
  };

  /* =============== role =============== */
  // 角色列表查询参数
  type RoleListParams = API.ListQueryParams & {
    id?: number; // ID
    name?: string; // 名称
    status?: number; // 状态：0 禁用，1 启用，-1 不限
  };
  // 角色查询列表结果
  type RoleListRes = API.ListRes & {
    list: RoleInfo[];
  };
  // 角色列表项信息
  type RoleInfo = {
    id: number; // 角色id
    name: string; // 角色名称
    status: number; // 状态：0 禁用，1 启用
    description?: string; // 角色描述
    created_at?: string;
    updated_at?: string;
  };
  // 创建角色类型
  type CreateRoleParams = {
    name: string; // 角色名称
    status: number; // 状态：0 禁用，1 启用
    description?: string; // 角色描述
  };
  // 角色授权类型
  type GrantRoleParams = {
    role_id: number; // 角色id
    permission_info: MenuPermissionInfo; // 权限信息
  };
  // 角色授权菜单的参数格式
  type MenuPermissionInfo = Record<string | number, string>[]; // 格式：[{"菜单id1" : "权限ID1,权限ID2..."}, {"菜单id1" : "权限ID1,权限ID2..."}]

  // 角色菜单和权限列表参数
  type RoleMenuParams = {
    role_id: number; // 角色id
  };

  /* =============== menu & permision =============== */
  type PermissionItem = {
    id: number; // ID
    name: string; // 名称
    code: string; // 编码
    route_id: number; // 路由ID
    route_name: string; // 路由名称
    order: number; // 排序
    status: number; // 状态：0 禁用，1 正常
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
    checked: number; // 用户权限（有该权限为1，反之为0）
  };
  // 创建菜单参数
  type CreateMenuParams = {
    name: string; // 菜单名称
    menu_code?: string; // 菜单标识
    pid: number; // 父id
    node_type: number; // 节点类型，1目录 2页面 3按钮
    icon?: string; // 图标
    sort: number; // 排序
    url?: string; // 外链
    path: string; // 页面路径
    status: number; // 状态，-1删除 0隐藏 1显示
    description?: string; // 菜单描述
    component?: string; // 组件路径
    redirect?: string; // 重定向
    cache?: number; // 0否，1缓存
    breadcrumb?: number; // 0否，1显示在面包屑里
    affix?: number; // 0否，1固定到顶部tab栏显示（显示tab栏才有效）
  };
  // 菜单项类型
  type MenuItem = CreateMenuParams & {
    id: number; // 菜单id
    created_at: string; // 创建时间
    updated_at: string; // 更新时间
    children: MenuInfo[]; // 子菜单
    permissions: PermissionInfo[]; // 权限数组
    checked: number; // 用户权限（有该权限为1，反之为0）
  };
  // 编辑菜单类型
  type EditItemParams = CreateMenuParams & {
    id: number; // 菜单id
  };

  // 权限列表查询参数
  type PerimssionListParams = API.ListQueryParams & {
    menu_id?: number; // 菜单id
  };
  // 创建权限参数
  type CreatePermissionParams = {
    name: string; // 名称
    code: string; // 编码
    route_id: number; // 路由ID
    route?: string; // 路由地址
    order?: number; // 排序，默认1
    status: number; // 状态：0 禁用，1 正常
    menu_id: number; // 菜单ID
  };
  // 编辑权限参数
  type EditPermissionParams = CreatePermissionParams & {
    id: number; // 权限id
  };
  // 权限项
  type PermissionItem = CreatePermissionParams &
    API.TableItem & {
      checked: number; // 用户权限（有该权限为1，反之为0）
    };
  // 菜单绑定权限参数
  type BindPermissionParams = {
    permissions: string[]; // 权限id
    id: number; // 菜单id
  };

  /* =============== api route =============== */
  type ApiRouteListParams = API.ListQueryParams & {
    route?: string; // 路由
    id?: number;
  };
  type CreateApiRouteParams = {
    route: string; // 路由名称
    status?: number; // 状态：0 禁用，1 启用
  };
  type EditApiRouteParams = CreateApiRouteParams & {
    id: number; // 路由id
  };
  type ApiRouteItem = EditApiRouteParams & API.TableItem;
}
