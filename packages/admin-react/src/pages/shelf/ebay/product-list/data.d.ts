export interface TableListItem {
  id: number;
  product_editor: string;
  avatar?: string;
  spu?: string;
  sku: string;
  site: string;
  shop: any[];
  product_name: string;
  title: string;
  state: string;
  product_creation_time: string;
  automatic_replenishment_rule: string;
  provider: string;
  inquirer: string;
  salesman: string;
  seller: string;
  item_id: string;
  sales_volume: string;
  sales_volume_money: string;
  ebay_same_lowest_price: string;
  keywords: string;
  erp_product_classification: string;
  initial_purchase_quantity: string;
  platform_classification1: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
