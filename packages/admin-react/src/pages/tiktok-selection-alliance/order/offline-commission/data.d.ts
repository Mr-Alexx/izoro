export interface TableListItem {
  platform_id: string;
  product_name: string;
  product_id: string;
  turnover: string;
  price: string;

  deal_difference: string;
  tiktok_commission_rate: string;
  offline_commission_rate: string;
  total_commission: string;
  technical_service_fee: string;
  proportion: string;
  estimate_total_commission: string;
  tiktok_settlement_commission_income: string;
  offline_settlement_commission_income: string;
  offline_settlement_commission_label: string;
  estimate_commission_income_offline: string;
  payment_type: string;
  tiktok_order_status: string;
  whole_order_collection_status: string;
  talent_nickname: string;
  supplier_name: string;
  offline_settlement_confirmation: string;
  offline_settlement_time: string;
  tiktok_estimates_commission_income: string;
  tiktok_order_payment_time: string;
  tiktok_order_settlement_time: string;
  approval_status: string;
  first_time: string;
  offline_settlement_channel: string;
  first_person: string;
  preliminary_remarks: string;
  credit_note: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface BatchTableItem {
  platform_id: string;
  product_info?: string;
  offline_commission_rate?: string;
  estimate_commission_income_offline?: string;
  offline_settlement_commission_income?: string;
  supplier_name?: string;
}
