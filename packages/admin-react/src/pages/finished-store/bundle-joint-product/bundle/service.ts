import { request } from 'umi';
import type { TableListItem } from './data';

// 获取数据列表
export async function fetchList(params: Record<string, any>) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/bundle-joint/bundle-list', {
    method: 'GET',
    params,
  });
}
