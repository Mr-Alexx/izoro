/** @format */

export interface TableListItem {
  id: number;
  status?: string;
  status_text?: string;
  confirm_at?: Date;
  confirm_people?: string;
  avatar: string;
  spu: string;
  sku: string;
  product_developer?: string;
  product_name?: string;
  product_english_name?: string;
  keyword?: string;
  brand?: string;
  model?: string;
  product_size?: string;
  supplier_name_english?: string;
  supplier_address?: string;
  origin_place?: string;
  created_at?: Date;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
