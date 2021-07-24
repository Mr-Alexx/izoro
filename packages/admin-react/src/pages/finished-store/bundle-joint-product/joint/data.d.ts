export interface TableListItem {
  target_sku: string;
  target_spu?: string;
  avatar?: string;
  target_product?: string;
  quantity?: number;
  processing_name?: string;
  warehouse?: string;
  status?: string;
  creater?: string;
  created_at?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
