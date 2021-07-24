import { get } from '@/utils/request';
import { request } from 'umi';
import type { SpuSearchParams, SpuTableData, TableListItem } from './data';
import type { RoleListItem } from './data.d';

// 获取账号列表
// spu列表
export const fetchSpu = async (params: SpuSearchParams): Promise<SpuTableData> =>
  get('/api/finished-store/spu', params);
