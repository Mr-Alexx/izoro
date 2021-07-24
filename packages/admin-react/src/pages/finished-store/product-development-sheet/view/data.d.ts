export type TableListItem = {
  id: number;
  sku: string;
  avatar: string;
  product_name: string;
  sales_date: string;
  sales_price: number;
  purchase_status: string;
  sales_volume: number;
  is_quotation: boolean;
  attribute_name: string;
  source_status: string;
  link_1688: string;
};

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
