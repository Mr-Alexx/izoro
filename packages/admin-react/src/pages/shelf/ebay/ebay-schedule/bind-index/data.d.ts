export interface TableListItem {
  id: number;
  bound_num: string;
  product_name?: string;
  bind_people?: string;
  sku: string;
  optimization_time: string;
  country: string;
  shop_name: string;
  type: string;
  overseas_warehouse_available_days: string;
  finish_at: string;
  is_finish_on_time: string;
  plan_state: string;
  creater: string;
  created_at: string;
  updated_at: string;
}

export interface EditItem {
  bound_num: string;
  country: string;
  shelf_shop: string;
  optimization_time: string;
  product_name: string;
  bind_people: string;
  keyword: string;
  overseas_warehouse_available_days: string;
  type: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
