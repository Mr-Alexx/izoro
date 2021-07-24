export interface TableListItem {
  id: number;
  master_mask: string;
  template_name: string;
  store: string;
  creater: string;
  created_at: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
