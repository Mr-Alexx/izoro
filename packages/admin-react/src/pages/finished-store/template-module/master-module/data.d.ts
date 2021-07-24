export interface TableListItem {
  id: number;
  master_mask: string;
  name: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
