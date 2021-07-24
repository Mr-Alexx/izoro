export type TableListItem = {
  id: number;
  spu: string;
  product_name: string;
  product_source?: string;
  first_category?: string;
  second_category?: string;
  third_category?: string;
};

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
