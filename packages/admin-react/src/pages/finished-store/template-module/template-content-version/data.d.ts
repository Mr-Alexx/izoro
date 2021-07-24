export interface TableListItem {
  id: number;
  version: string;
  template_name: string;
  language: string;
  creater: string;
  created_at: string;
  updated_at: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
