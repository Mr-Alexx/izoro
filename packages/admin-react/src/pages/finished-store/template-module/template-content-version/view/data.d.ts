export interface TableListItem {
  version: string;
  component: string;
  creater: string;
  created_at: string;
  updated_at: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
