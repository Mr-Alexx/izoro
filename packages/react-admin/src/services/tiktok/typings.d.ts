/**
 * @description  商品模块接口 参数/结果 类型
 */
declare namespace SELECTION_ALLIANCE_API {
  type OrderList = {
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
    talent_id: string;
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
    order_payment_time: string;
    order_settlement_time: string;
    offline_settlement_channel: string;
  };

  type SupplierList = {
    supplier_id: string;
    supplier_name: string;
    supplier_leader: string;
    supplier_contact_info: string;
    settlement_type: string;
    supplier_follower: string;
    creater: string;
    created_at: string;
  };
}
