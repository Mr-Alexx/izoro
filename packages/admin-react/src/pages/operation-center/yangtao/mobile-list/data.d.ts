// 列表项数据类型
export interface TableListItem {
  id: number;
  mobile: string;
  status: number;
  department_id: number;
  department_name: string;
  username: string;
  user_id: number;
  user_compound_name: string;
  card_type: number;
  open_time: string;
  monthly_rent_time: string;
  monthly_rent: number;
  operator: string;
  set_meal: string;
  use_type: number;
  remark: string;
  create_time: string;
  update_time: string;
  last_mobile_apply_recharge: {
    balance: number;
    balance_file: string;
    create_time: string;
  };

  allow_recharge_price: number;
  mobile_Bind: {
    bind_name: string;
    bind_value: string;
    remark: string;
  };
  last_recharge: {
    create_time: string;
    amount: string;
  };
  recharge_status: number;
  totalRechargeAmount: number;
  totalRechargeCount: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

// 筛选条件类型
export interface MapTemp {
  value: number;
  label: string;
}

export interface EditTableItem {
  id: React.Key;
  binding_name?: string;
  binding_value?: string;
  remark?: string;
}

export interface DataSourceType {
  tel?: string;
  recent_recharge_amount?: string;
  last_recharge_time?: string;
  recharge_amount_application?: string;
  monthly_balance?: string;
  monthly_balance_voucher?: string;
}
