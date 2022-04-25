import { get, patch, post } from '@/utils/request';

// 登录
export const login = (data: UserApi.LoginParams): Promise<UserApi.LoginRes> => post('/auth/login', data);

// token续期
export const refreshToken = (): Promise<UserApi.LoginRes> => get('/users/resetToken');

// 用户列表
export const getUsers = (data: UserApi.UserListParams): Promise<API.ListRes> => get('/user', data);

// 用户个人信息
export const getUser = (): Promise<UserApi.UserInfo> => get('/user/info');

// 新增用户
export const createUser = (data: UserApi.CreateUserParams): Promise<API.AnyRes> => post('/user', data);

// 编辑用户
export const editUser = (data: Partial<UserApi.UserInfo>): Promise<API.AnyRes> => patch(`/user/${data.id}`, data);

// 用户角色绑定
export const userBindRoles = (data: UserApi.UserBindRolesParams): Promise<API.AnyRes> =>
  post('/users/role/bind_user', data);

// 角色列表
export const getRoles = (params: UserApi.RoleListParams): Promise<API.ListRes> => get('/role', params);

// 创建角色
export const createRole = (data: UserApi.CreateRoleParams): Promise<API.AnyRes> => post('/role', data);

// 编辑角色
export const editRole = (data: UserApi.RoleInfo): Promise<API.AnyRes> => patch(`/role/${data.id}`, data);

// 角色授权
export const grantRole = (data: UserApi.GrantRoleParams): Promise<API.AnyRes> => post('/users/role/grant', data);

// 获取角色的菜单和权限列表
export const getRoleMenu = (data: UserApi.RoleMenuParams): Promise<UserApi.MenuItem[]> =>
  post('/users/menu_permission/list', data);

// 菜单列表
export const getMenus = (): Promise<UserApi.MenuItem[]> => get('/menu');

// 创建菜单
export const createMenu = (data: UserApi.CreateMenuParams): Promise<API.AnyRes> => post('/menu', data);

// 编辑菜单
export const editMenu = (data: UserApi.EditItemParams): Promise<API.AnyRes> => patch(`/menu/${data.id}`, data);

// 权限列表
export const getPermissions = (): Promise<API.ListRes> => get('/common/map-list', { type: 'permissions' });

// 创建权限
export const createPermission = (data: UserApi.CreatePermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/create', data);

// 编辑权限
export const eidtPermission = (data: UserApi.EditPermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/edit', data);

// 绑定权限
export const bindPermission = (data: UserApi.BindPermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/bind', data);

// 解绑权限
export const unbindPermission = (data: UserApi.BindPermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/unbind', data);

// api接口列表
export const getApiRoutes = (data: UserApi.ApiRouteListParams): Promise<API.ListRes> => post('/users/route/list', data);

// 创建api接口
export const createApiRoute = (data: UserApi.CreateApiRouteParams): Promise<API.AnyRes> =>
  post('/users/route/create', data);

// 编辑api接口
export const editApiRoute = (data: UserApi.EditApiRouteParams): Promise<API.AnyRes> => post('/users/route/edit', data);
