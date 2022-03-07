import { get, post } from '@/utils/request';
import type { ColumnsState } from '@ant-design/pro-table';

// 获取页面配置
export const getPageSettings = (name: string) =>
  get('/api/setting/page', { name });

// 更新页面配置
export const updatePageSettings = (data: {
  name?: string,
  data: Record<string, ColumnsState>,
}) => post('/api/setting/page', data);
