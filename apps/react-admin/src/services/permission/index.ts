import { get, post, patch, del } from '@/utils/request';

/* 菜单列表 */
export const getPermissions = (
  params?: PermissionApi.PermissionQueryParams,
): Promise<Api.ListRes<PermissionApi.Permission[]>> => get('/permission', params);

/* 添加菜单 */
export const addPermission = (data: PermissionApi.PermissionCreateDto): Promise<PermissionApi.Permission> =>
  post('/permission', data);

/* 修改菜单 */
export const editPermission = (data: PermissionApi.PermissionEditDto): Promise<PermissionApi.Permission> =>
  patch(`/permission/${data.id}`, data);

/* 删除菜单 */
export const deletePermission = (id: number): Promise<string> => del(`/permission/${id}`);
