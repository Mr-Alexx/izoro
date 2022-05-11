import { get, post, patch, del } from '@/utils/request';

/* 权限map列表 */
export const getPermissionsMap = () => get('/menu/permissions');

/* 菜单列表 */
export const getMenus = (params?: { roleIds?: number[] }) => get('/menu', params);

/* 添加菜单 */
export const addMenu = (data: MenuApi.MenuCreateDto): Promise<MenuApi.Menu> => post('/menu', data);

/* 修改菜单 */
export const editMenu = (data: MenuApi.MenuEditDto): Promise<MenuApi.Menu> => patch(`/menu/${data.id}`, data);

/* 删除菜单 */
export const deleteMenu = (id: number): Promise<string> => del(`/menu/${id}`);
