/** @format */

export interface TableListItem {
    id: number;
    avatar: string;
    name: string;
    account: string;
    nickname: string;
    // status?: number;
    status_text: string;
    roles: Record<string, any>[];
    created_at?: Date;
    updated_at?: Date;

    spu: string;
    sku: string;
    title: string;
    item_id?: string;
    seller?: string;
    rival_sales?: string;
    rival_sales_money?: number;
    product_chinese_name?: string;
    gross_profit_rate?: number;
    initial_purchase_quantity?: number;
    history_purchase_quantity?: number;
    supplier_name?: string;
    product_category?: string;
    platform_category_id1?: string;
    platform_category_id2?: string;
    keyword?: string;
    product_developer?: string;
    product_lead_provider?: string;
    inquirer?: string;
    tank_gauge_number: number;
    development_postage?: number;
    status?: number;
    minimum_selling_price?: number;
    product_development_no?: string;
    picking_list?: string;
    country?: string;
    first_time?: Date;
    review_time?: Date;
    create_time?: Date;

  }
  
  export interface TableListPagination {
    total: number;
    pageSize: number;
    current: number;
  }
  
  export interface TableListData {
    list: TableListItem[];
    pagination: Partial<TableListPagination>;
  }
  
  export interface TableListParams {
    sorter?: string;
    status?: string;
    name?: string;
    desc?: string;
    key?: number;
    pageSize?: number;
    currentPage?: number;
  }
  
  export interface RoleListItem {
    id: number;
    name: string;
  }
  
  export interface StatusListItem {
    value: number | string;
    label: string;
  }
  