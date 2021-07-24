import { get, patch, post } from '@/utils/request';

// 登录
export const login = (data: USERS_API.LoginParams): Promise<USERS_API.LoginRes> => post('/auth/login', data);

// token续期
export const refreshToken = (): Promise<USERS_API.LoginRes> => get('/users/resetToken');

// export const login = (data: USERS_API.LoginParams): Promise<USERS_API.LoginRes> => {
//   return Promise.resolve({
//     accessExpire: (new Date().getTime() + 3600 * 48 * 1000) / 1000,
//     refreshAfter: (new Date().getTime() + 3600 * 24 * 1000) / 1000,
//     accessToken:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjIxMDcyNjIsImlhdCI6MTYyMjAyMDg2MiwidXNlcklkIjoxfQ.Y1B9ExTfxdN--29eteEJgjyjbJ8QiAmkLHtHOs39VfE',
//   });
// }; // post('/users/login', data);

// export const refreshToken = (): Promise<USERS_API.LoginRes> => {
//   return Promise.resolve({
//     accessExpire: (new Date().getTime() + 3600 * 48 * 1000) / 1000,
//     refreshAfter: (new Date().getTime() + 3600 * 24 * 1000) / 1000,
//     accessToken:
//       'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MjIxMDcyNjIsImlhdCI6MTYyMjAyMDg2MiwidXNlcklkIjoxfQ.Y1B9ExTfxdN--29eteEJgjyjbJ8QiAmkLHtHOs39VfE',
//   });
// }; // get('/users/resetToken');

// 用户列表
export const getUsers = (data: USERS_API.UserListParams): Promise<API.ListRes> => get('/user', data);

// 用户个人信息
export const getUserDetail = (): Promise<USERS_API.UserInfo> => get('/user/info');

// 新增用户
export const createUser = (data: USERS_API.CreateUserParams): Promise<API.AnyRes> => post('/user', data);

// 编辑用户
export const editUser = (data: Partial<USERS_API.UserInfo>): Promise<API.AnyRes> => patch(`/user/${data.id}`, data);

// 用户角色绑定
export const userBindRoles = (data: USERS_API.UserBindRolesParams): Promise<API.AnyRes> =>
  post('/users/role/bind_user', data);

// 角色列表
export const getRoles = (params: USERS_API.RoleListParams): Promise<API.ListRes> => get('/role', params);

// 创建角色
export const createRole = (data: USERS_API.CreateRoleParams): Promise<API.AnyRes> => post('/role', data);

// 编辑角色
export const editRole = (data: USERS_API.RoleInfo): Promise<API.AnyRes> => patch(`/role/${data.id}`, data);

// 角色授权
export const grantRole = (data: USERS_API.GrantRoleParams): Promise<API.AnyRes> => post('/users/role/grant', data);

// 获取角色的菜单和权限列表
export const getRoleMenu = (data: USERS_API.RoleMenuParams): Promise<USERS_API.MenuItem[]> =>
  post('/users/menu_permission/list', data);

// 菜单列表
export const getMenus = (): Promise<USERS_API.MenuItem[]> => get('/menu');

// 创建菜单
export const createMenu = (data: USERS_API.CreateMenuParams): Promise<API.AnyRes> => post('/menu', data);

// 编辑菜单
export const editMenu = (data: USERS_API.EditItemParams): Promise<API.AnyRes> => patch('/menu', data);

// 权限列表
export const getPermissions = (data: USERS_API.PerimssionListParams): Promise<API.ListRes> =>
  post('/users/permission/list', data);

// 创建权限
export const createPermission = (data: USERS_API.CreatePermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/create', data);

// 编辑权限
export const eidtPermission = (data: USERS_API.EditPermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/edit', data);

// 绑定权限
export const bindPermission = (data: USERS_API.BindPermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/bind', data);

// 解绑权限
export const unbindPermission = (data: USERS_API.BindPermissionParams): Promise<API.AnyRes> =>
  post('/users/permission/unbind', data);

// api接口列表
export const getApiRoutes = (data: USERS_API.ApiRouteListParams): Promise<API.ListRes> =>
  post('/users/route/list', data);

// 创建api接口
export const createApiRoute = (data: USERS_API.CreateApiRouteParams): Promise<API.AnyRes> =>
  post('/users/route/create', data);

// 编辑api接口
export const editApiRoute = (data: USERS_API.EditApiRouteParams): Promise<API.AnyRes> =>
  post('/users/route/edit', data);
