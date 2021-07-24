export interface TableListItem {
  id: string;
  avatar: string;
  sku: string;
  shelf_status?: string;
  product_name: string;
  title: string;
  sales_num_y?: string;
  sales_num_q?: string;
  item_id?: string;
  shop_name?: string;
  site?: string;
  keyword?: string;
  publish_way?: string;
  type?: string;
  duration_time?: string;
  binding_people?: string;
  articles_location?: string;
  sold_num?: number;
  price?: number;
  online_num?: number;
  gross_profit_rate?: string;
  upset_price?: string;
  break_even_price?: string;
  purchase_price?: string;
  purchase_status?: string;
  sales_status?: string;
  warehouse?: string;
  upc_code?: string;
  ean_code?: string;
  automatic_replenishment_name?: string;
  automatic_replenishment_status?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
