export interface TableListItem {
  id: string;
  avatar: string;
  process_state?: string;
  push_state?: string;
  //   shelf_state?: string;
  shop_name?: number;
  site?: string;
  goods_location?: string;
  publisher?: string;
  //   off_shelves?: string;
  item_id?: string;
  platform_category_id1?: string;
  platform_category_id2?: string;
  price_range?: string;
  currency_code?: string;
  online_number?: string;
  //   collection?: string;
  views?: string;
  //   sales_num: string;
  attention_num: string;
  title: string;
  publish_time?: string;
  //   off_time?: string;
  //   created_at?: string;
  published_way?: string;
  rate_table?: string;
  package_weight?: string;
  sku?: string;
  account?: string;
  discount_name?: string;
  markdown_name?: string;
  md_start?: string;
  md_end?: string;
  ad_series_name?: string;
  exposure_num?: string;
  click_num?: string;
  ad_rate?: string;
  handle_time?: string;
  day_sales?: string;
  price?: string;
  keyword?: string;
  ad_Keyword_ranking?: string;
  na_Keyword_ranking?: string;
  bm_ranking?: string;
  bm_update?: string;
  bm_exposure?: string;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface KeywordsRanking {
  updated_at: string;
  keyword: string;
  rate: string;
  ranking_type: string;
  ranking: string;
}
