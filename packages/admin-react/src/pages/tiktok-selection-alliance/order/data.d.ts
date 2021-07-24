export interface TableListItem {
  platform_id: string;
  platform_payment_time: string;
  product_id: string;
  talent_id: string;
  product_info: string;
  turnover: string;
  price: string;
  transaction_balance: string;
  platform_commission_rate: string;
  technical_service_fee: string;
  total_commission: string;
  estimate_total_commission_income: string;
  platform_estimate_commission_income: string;
  platform_settlement_commission_income: string;
  offline_commission_rate: string;
  offline_estimate_commission_income: string;
  offline_settlement_commission_income: string;
  platform_settlement_time: string;
  platform_settlement_time: string;
  settlement_cycle: string;
  settlement_type: string;
  platform_order_status: string;
  platform_payment_time: string;
  whole_order_collection_status: string;
  offline_settlement_time: string;
  offline_settlement_channel: string;
  offline_settlement_confirmation: string;
  product_name: string;
  supplier_name: string;
  talent_nickname: string;
  proportion: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface BatchTableItem {
  platform_id: string;
  product_id: string;
  price: string;
}
