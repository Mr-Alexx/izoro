/**
 * @description  商品模块接口 参数/结果 类型
 */
declare namespace PRODUCTS_API {
  type BundleDetail = {
    bundle: string; // 捆绑号
  };
  type BundleDetailRes = {
    id: number;
    avatar: string;
    spu: string;
    sku: string;
    product_name: string;
    quantity: number;
  };

  type JointList = {
    target_sku: string;
    target_spu?: string;
    avatar?: string;
    target_product?: string;
    quantity?: number;
    processing_name?: string;
    warehouse?: string;
    status?: string;
    creater?: string;
    created_at?: string;
  };

  type productCategory = {
    id: number;
    product_category: string;
  };

  // 商品属性管理
  type productSpuAttr = {
    id: number;
    name: string;
    product_name: string;
  };

  // 商品报价管理
  type productDevelopmentSheet = {
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

  // 查看报价方案
  type productDevelopmentView = {
    id: number;
    sku: string;
    avatar: string;
    product_name: string;
    sales_date: string;
    sales_price: number;
    purchase_status: string;
    sales_volume: number;
    is_quotation: boolean;
    attribute_name: string;
    source_status: string;
    link_1688: string;
  };

  // 母版
  type masterTemplateUpload = {
    id: number;
    name: string;
    type: string;
    creater: string;
    created_at: string;
    updated_at: string;
  };

  // 母版
  type masterModuleList = {
    id: number;
    master_mask: string;
    name: string;
  };

  type templateUpload = {
    id: number;
    master_mask: string;
    template_name: string;
    store: string;
    creater: string;
    created_at: string;
  };

  // 内容版本
  type templateContentVersion = {
    id: number;
    version: string;
    template_name: string;
    language: string;
    creater: string;
    created_at: string;
    updated_at: string;
  };

  // 图片需求单
  type shotProduct = {
    id: number;
    apply_department: string;
    shooting_demand_no?: string;
    product_name?: string;
    sku?: string;
    demand_sheet_type?: number;
    is_need_filmed?: string;
    sales_follow_up?: string;
    documents_state?: string;
    creater?: string;
    acceptor?: string;
    shoot_in?: string;
    designer?: string;
    design_order_confirm_time?: string;
    transit_time?: string;
    design_receipt_timeout?: string;
    design_complet_timeout?: string;
    estimated_completion_time?: string;
    eBay_design_pick_up_person: string;
    estimat_receiv_order_time: string;
    shooting_completion_time: string;
    design_completion_time: string;
    acceptance_completion_time: string;
    created_at: string;
    remark: string;
    photo_path: string;
    shipping_time: string;
  };

  type ebaySchedule = {
    id: number;
    sku: string;
    spu?: string;
    product_name?: string;
    sku_bind_people: string;
    kwyword: string;
    gmv: string;
    sales_status: string;
    optimization_time: string;
    country: string;
    shop_name: string;
    type: string;
    overseas_warehouse_available_days: string;
    finish_at: string;
    is_finish_on_time: string;
    plan_state: string;
    creater: string;
    created_at: string;
    updated_at: string;
  };

  type ebayProductList = {
    id: number;
    product_editor: string;
    avatar?: string;
    spu?: string;
    sku: string;
    site: string;
    shop: any[];
    product_name: string;
    title: string;
    state: string;
    product_creation_time: string;
    automatic_replenishment_rule: string;
    provider: string;
    inquirer: string;
    salesman: string;
    seller: string;
    item_id: string;
    sales_volume: string;
    sales_volume_money: string;
    ebay_same_lowest_price: string;
    keywords: string;
    erp_product_classification: string;
    initial_purchase_quantity: string;
    platform_classification1: string;
  };

  type ebayPublishList = {
    id: string;
    avatar: string;
    process_state?: string;
    push_state?: string;
    shelf_state?: string;
    shop_name?: number;
    site?: string;
    location_articles?: string;
    publisher?: string;
    off_shelves?: string;
    item_id?: string;
    platform_category_id1?: string;
    platform_category_id2?: string;
    price_range?: string;
    currency_code?: string;
    online_number?: string;
    collection?: string;
    views?: string;
    sales_num: string;
    attention_num: string;
    title: string;
    publish_time?: string;
    off_shelves?: string;
    off_time?: string;
    created_at?: string;
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
    sales_num?: string;
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
  };

  type publishPushList = {
    id: number;
    push_at?: string;
    shop_name?: string;
    site?: string;
    item_id?: string;
    push_status?: string;
    err_msg?: string;
    title?: string;
  };
}
