export interface TableListItem {
  id: number;
  master_mask: string;
  template_name: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
