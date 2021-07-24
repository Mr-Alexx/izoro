export interface propertyItem {
  id: number;
  property?: string;
}

export interface spuSkuItem {
  sku?: string;
  spu?: string;
  product_title?: string;
  avatar: ?string;
  net_size: ?string;
  created_at: ?string;
  creater: ?string;
  product_developer: ?string;
  log_properties: ?string;
  hs_code: ?string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}
