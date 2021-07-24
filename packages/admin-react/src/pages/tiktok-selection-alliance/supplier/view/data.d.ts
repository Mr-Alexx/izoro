export interface TableListItem {
  product_id: string;
  product_cate: string;
  price: string;
  settlement_type: string;
  settlement_cycle: string;
  commission_rules: string;
  creater: string;
  created_at: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
