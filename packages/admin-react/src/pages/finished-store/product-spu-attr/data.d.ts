export type TableListItem = {
  id: number;
  name: string;
  product_name: string;
};

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
