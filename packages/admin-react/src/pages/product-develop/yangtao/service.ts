import { request } from 'umi';
import type { TableListItem } from './data';
import type { RoleListItem } from './data';

// 获取账号列表
export async function account (
  params: Record<string, any>,
) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/system/account', {
    method: 'GET',
    params
  });
}

// 删除账号
export async function remove (id: number) {
  return request('/api/system/delete-account', {
    method: 'POST',
    data: { id }
  })
}

// 角色列表
export async function role (
  params: Record<string, any>
) {
  return request<{
    data: RoleListItem[];
    /** 列表的内容总数 */
    total: number;
  }>('/api/system/role', {
    method: 'GET',
    params
  });
}
