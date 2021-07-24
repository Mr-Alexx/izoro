export type TableListItem = {
  id: number;
  product_category: string;
};

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
