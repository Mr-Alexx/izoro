export interface TableListItem {
  bundle: number;
  bundle_name?: string;
  sku?: string;
  remark?: string;
  status?: string;
  create_department?: string;
  creater?: string;
  created_at?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
