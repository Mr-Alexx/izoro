import { get, post } from '@/utils/request';
import { request } from 'umi';

// 获取竞选联盟订单管理列表数据
export async function getOrderList(params: Record<string, any>) {
  return request<{
    data: SELECTION_ALLIANCE_API.OrderList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/tiktok-selection-alliance-order/order-list', {
    method: 'GET',
    params,
  });
}

// 获取竞选联盟订单管理列表数据
export async function getSupplierList(params: Record<string, any>) {
  return request<{
    data: SELECTION_ALLIANCE_API.SupplierList[];
    /** 列表的内容总数 */
    total?: number;
  }>('/api/tiktok-selection-alliance-order/supplier-list', {
    method: 'GET',
    params,
  });
}
