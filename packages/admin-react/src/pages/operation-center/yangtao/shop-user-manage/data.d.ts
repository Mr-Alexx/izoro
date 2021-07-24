export interface TableListItem {
  id: string;
  keyword: string;
  subject: string;
  platform: string;
  account_name: string;
  account_type: string;
  status: string;
  real_name_authentication: string;
  account_id: string;
  bind_bank_card: string;
  bind_phone: string;
  bind_email: string;
  cash_deposit: string;
  account_balance: string;
  shake_coin: string;
  account_keeper: string;
  use_function: string;
  remark?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
