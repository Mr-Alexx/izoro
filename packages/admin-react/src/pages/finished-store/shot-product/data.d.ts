export interface TableListItem {
  id: number;
  apply_department: string;
  shooting_demand_no?: string;
  product_name?: string;
  sku?: string;
  demand_sheet_type?: number;
  is_need_filmed?: string;
  sales_follow_up?: string;
  documents_state?: string;
  creater?: string;
  acceptor?: string;
  shoot_in?: string;
  designer?: string;
  design_order_confirm_time?: string;
  transit_time?: string;
  design_receipt_timeout?: string;
  design_complet_timeout?: string;
  estimated_completion_time?: string;
  eBay_design_pick_up_person: string;
  estimat_receiv_order_time: string;
  shooting_completion_time: string;
  design_completion_time: string;
  acceptance_completion_time: string;
  created_at: string;
  remark: string;
  photo_path: string;
  shipping_time: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
