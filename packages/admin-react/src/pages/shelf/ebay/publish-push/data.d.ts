export interface TableListItem {
  id: number;
  push_at?: string;
  shop_name?: string;
  site?: string;
  item_id?: string;
  push_status?: string;
  err_msg?: string;
  title?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
