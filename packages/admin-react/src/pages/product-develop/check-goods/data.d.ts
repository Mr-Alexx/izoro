export interface TableProps<T> {
  dataSource?: T[];
  columns: TableColumnConfig<T>[];
}

export interface commodityProfitType {
  id: number;
  product_size?: number;
  weight?: number;
  product_volume?: number;
  development_postage?: number;
  currency?: number;
  exchange_rate?: number;
  product_costs?: number;
  tail_freight_exchange_rate_before?: number;
  tail_freight_exchange_rate_after?: number;
  tail_freight_exchange_rate_before?: number;
  tail_freight_exchange_rate_after?: number;
  platform_cost?: number;
  procurement_freight?: number;
  wastage?: number;
  gst?: string;
  type?: string;
  freight?: number;
  profit?: number;
  gross_profit_rate?: number;
}
