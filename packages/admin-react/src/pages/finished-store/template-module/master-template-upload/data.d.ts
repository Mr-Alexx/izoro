export type TableListItem = {
  id: number;
  name: string;
  type: string;
  creater: string;
  created_at: string;
  updated_at: string;
};

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
