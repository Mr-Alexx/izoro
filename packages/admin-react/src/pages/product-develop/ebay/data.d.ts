/** @format */

export interface TableListItem {
  id: number;
  avatar: string;
  name: string;
  account: string;
  nickname: string;
  // status?: number;
  status_text: string;
  roles: Record<string, any>[];
  created_at?: Date;
  updated_at?: Date;

  spu: string;
  sku: string;
  title: string;
  item_id?: string;
  seller?: string;
  rival_sales?: string;
  rival_sales_money?: number;
  product_chinese_name?: string;
  gross_profit_rate?: number;
  initial_purchase_quantity?: number;
  history_purchase_quantity?: number;
  supplier_name?: string;
  product_category?: string;
  platform_category_id1?: string;
  platform_category_id2?: string;
  erp_product_classification?: string;
  keyword?: string;
  product_developer?: string;
  product_lead_provider?: string;
  inquirer?: string;
  salesman?: string;
  tank_gauge_number: number;
  development_postage?: number;
  status?: number;
  minimum_selling_price?: number;
  product_development_no?: string;
  picking_list?: string;
  country?: string;
  first_time?: Date;
  review_time?: Date;
  create_time?: Date;
  approval_flow_state?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
