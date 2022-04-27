import { get, patch, post } from '@/utils/request';

// 登录
export const login = (data: UserApi.LoginDto): Promise<UserApi.LoginRes> => post('/auth/login', data);

// token续期
export const refreshToken = (): Promise<UserApi.LoginRes> => get('/users/resetToken');

// 用户列表
export const getUsers = (data: UserApi.UserQueryParams): Promise<Api.ListRes<UserApi.User[]>> => get('/user', data);

// 用户个人信息
export const getUser = (): Promise<UserApi.User> => get('/user/info');

// 新增用户
export const createUser = (data: UserApi.UserCreateDto): Promise<UserApi.User> => post('/user', data);

// 编辑用户
export const editUser = (data: UserApi.UserEditDto): Promise<number> => patch(`/user/${data.id}`, data);

// 删除用户
export const deleteUser = (id: number): Promise<string> => patch(`/user/${id}`);

// 用户角色绑定
// export const userBindRoles = (data: UserApi.UserBindRolesParams): Promise<API.AnyRes> =>
//   post('/users/role/bind_user', data);
