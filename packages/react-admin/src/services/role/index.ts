import { get, patch, post, del } from '@/utils/request';

/** 角色列表 */
export const getRoles = (params: RoleApi.RoleQueryParams): Promise<Api.ListRes<RoleApi.Role[]>> => get('/role', params);

/** 新增角色 */
export const addRole = (data: RoleApi.RoleCreateDto): Promise<RoleApi.Role> => post('/role', data);

/** 编辑角色 */
export const editRole = (data: RoleApi.RoleEditDto): Promise<RoleApi.Role> => patch('/role', data);

/** 删除角色 */
export const deleteRole = (id: number): Promise<string> => del(`/role/${id}`);

/** 角色授权 */
