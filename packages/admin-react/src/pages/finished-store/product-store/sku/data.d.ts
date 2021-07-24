export interface TableListItem {
  id: number;
  sku?: string;
  spu?: string;
  product_name?: string;
  avatar?: string;
  net_size?: string;
  including_package_size?: string;
  package_size?: string;
  package_weighs?: string;
  size_confirmed?: string;
  created_at?: string;
  purchasing_status?: string;
  remark?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
