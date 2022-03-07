export interface UserItem {
  id: number;
  avatar: string;
  name: string;
  account: string;
  nickname: string;
  status?: number;
  status_text: string;
  roles: Record<string, any>[];
  created_at?: Date;
  updated_at?: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter?: string;
  status?: string;
  name?: string;
  desc?: string;
  key?: number;
  pageSize?: number;
  currentPage?: number;
}

export interface RoleListItem {
  id: number;
  name: string;
}

export interface StatusListItem {
  value: number | string;
  label: string;
}
