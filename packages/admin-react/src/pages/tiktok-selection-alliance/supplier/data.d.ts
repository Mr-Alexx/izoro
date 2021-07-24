export interface TableListItem {
  supplier_id: string;
  supplier_name: string;
  supplier_leader: string;
  supplier_contact_info: string;
  settlement_type: string;
  supplier_follower: string;
  creater: string;
  created_at: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
