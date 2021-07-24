/** @format */

export interface TableListItem {
  id: number;
  avatar: string;
  status?: number;
  spu: string;
  sku: string;
  product_development_no?: string;
  product_name?: string;
  purchase_price?: number;
  selling_price?: number;
  competing_goods_link?: string;
  competing_goods_advert_link?: string;
  supplier_links?: string;
  product_category?: string;
  category?: string;
  product_developer?: string;
  creater?: string;
  create_time?: Date;
  remark?: string;
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
