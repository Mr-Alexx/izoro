export type RoleItem = {
  id: number;
  name: string;
  description?: string;
  status?: number;
  status_text?: string;
  created_at?: Date;
  updated_at?: Date;
};

export type TableListPagination = {
  total: number;
  pageSize: number;
  current: number;
};

export type TableListData = {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
};

export type TableListParams = {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
};

export type MenuItem = {
  id: number;
  name: string;
  children?: Record<string, any>[];
};
