export interface TableListItem {
  id: number;
  sku: string;
  spu?: string;
  product_name?: string;
  sku_bind_people: string;
  kwyword: string;
  gmv: string;
  sales_status: string;
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
  spu: string;
  sku: string;
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
