export type TableListItem = {
  id: number;
  spu: string;
  spu_name: string;
  avatar: string;
  category: string;
  status: string;
  purchase_status: string;
  source: string;
  service_line: string;
  follow_people: string;
  total_sales: number;
  item_msg: string;
  created_at: Date;
  updated_at: Date;
};

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
