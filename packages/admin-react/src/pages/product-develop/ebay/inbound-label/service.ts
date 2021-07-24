import { request } from 'umi';
import type { TableListItem } from './data';

export async function fetchList(params: Record<string, any>) {
  return request<{
    data: TableListItem[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/product-develop/ebay-inbound-label', {
    method: 'GET',
    params,
  });
}
