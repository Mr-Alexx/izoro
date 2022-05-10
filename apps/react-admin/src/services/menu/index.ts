import { get, post, patch, del } from '@/utils/request';

/* 权限map列表 */
export const getPermissionsMap = () => get('/menu/permissions');

/* 菜单列表 */
export const getMenus = () => get('/menu');

/* 添加菜单 */
export const addMenu = data => post('/menu', data);

/* 修改菜单 */
export const editMenu = data => patch(`/menu/${data.id}`, data);

/* 删除菜单 */
export const deleteMenu = (id: number) => del(`/menu/${id}`);
