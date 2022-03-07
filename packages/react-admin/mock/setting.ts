/** @format */
// 用户配置api
import { Request, Response } from 'express';

// 测试表头
const columnObj: Record<string, any> = {
  // 账号表头
  account: {
    // id: { order: 0, show: false },
    avatar: { order: 1, show: true },
    account: { order: 2, show: true },
    nickname: { order: 3, show: true },
    roles: { order: 4, show: true, tips: '账号角色，可以有多个' },
    status: { order: 5, show: true },
    created_at: { order: 6, show: true },
    updated_at: { order: 7, show: false },
    option: { order: 8, show: true, fixed: 'right' },
  },
  // 角色表头
  role: {
    name: { order: 1, show: true },
    description: { order: 2, show: true },
    status: { order: 3, show: true },
    created_at: { order: 4, show: true },
    option: { order: 5, show: true, fixed: 'right' },
  },
  // ebay数据列表表头
  ebay: {
    product_development_no: { order: 1, show: true },
    spu: { order: 2, show: true },
    sku: { order: 3, show: true },
    avatar: { order: 4, show: true },
    title: { order: 5, show: true },
    item_id: { order: 6, show: true },
    seller: { order: 7, show: true },
    rival_sales: { order: 8, show: true },
    rival_sales_money: { order: 9, show: true },
    product_chinese_name: { order: 10, show: true },
    gross_profit_rate: { order: 11, show: true },
    initial_purchase_quantity: { order: 12, show: true },
    history_purchase_quantity: { order: 13, show: true },
    supplier_name: { order: 14, show: true },
    product_category: { order: 15, show: true },
    platform_category_id1: { order: 16, show: true },
    platform_category_id2: { order: 17, show: true },
    erp_product_classification: { order: 18, show: true },
    keyword: { order: 19, show: true },
    product_developer: { order: 20, show: true },
    product_lead_provider: { order: 21, show: true },
    inquirer: { order: 22, show: true },
    salesman: { order: 23, show: true },
    tank_gauge_number: { order: 24, show: true },
    development_postage: { order: 25, show: true },
    status: { order: 26, show: true },
    minimum_selling_price: { order: 27, show: true },
    picking_list: { order: 28, show: true },
    country: { order: 29, show: true },
    first_time: { order: 30, show: true },
    review_time: { order: 31, show: true },
    create_time: { order: 32, show: true },
    approval_flow_state: { order: 33, show: true },
    option: { order: 34, show: true, fixed: 'right' },
  },
  yangtao: {
    id: { order: 1, show: true },
    avatar: { order: 2, show: true },
    name: { order: 3, show: true },
    account: { order: 4, show: true },
    nickname: { order: 5, show: true },
    status_text: { order: 6, show: true },
    roles: { order: 7, show: true },
    created_at: { order: 8, show: true },
    updated_at: { order: 9, show: true },

    spu: { order: 10, show: true },
    sku: { order: 11, show: true },
    title: { order: 12, show: true },
    item_id: { order: 13, show: true },
    seller: { order: 14, show: true },
    rival_sales: { order: 15, show: true },
    rival_sales_money: { order: 16, show: true },
    product_chinese_name: { order: 17, show: true },
    gross_profit_rate: { order: 18, show: true },
    initial_purchase_quantity: { order: 19, show: true },
    history_purchase_quantity: { order: 20, show: true },
    supplier_name: { order: 21, show: true },
    product_category: { order: 22, show: true },
    platform_category_id1: { order: 23, show: true },
    platform_category_id2: { order: 24, show: true },
    keyword: { order: 25, show: true },
    product_developer: { order: 26, show: true },
    product_lead_provider: { order: 27, show: true },
    inquirer: { order: 28, show: true },
    tank_gauge_number: { order: 29, show: true },
    development_postage: { order: 30, show: true },
    status: { order: 31, show: true },
    minimum_selling_price: { order: 32, show: true },
    product_development_no: { order: 33, show: true },
    picking_list: { order: 34, show: true },
    country: { order: 35, show: true },
    first_time: { order: 36, show: true },
    review_time: { order: 37, show: true },
    create_time: { order: 38, show: true },
  },
  inboundLabel: {
    id: {},
    status: {},
    confirm_at: {},
    confirm_people: {},
    avatar: {},
    sku: {},
    spu: {},
    product_developer: {},
    product_name: {},
    product_english_name: {},
    keyword: {},
    brand: {},
    model: {},
    product_size: {},
    supplier_name_english: {},
    supplier_address: {},
    origin_place: {},
    created_at: {},
    option: {},
  },
  // amaazon数据列表表头
  amazon: {
    product_development_no: { order: 1, show: true },
    spu: { order: 2, show: true },
    sku: { order: 3, show: true },
    avatar: { order: 4, show: true },
    product_name: { order: 5, show: true },
    purchase_price: { order: 6, show: true },
    selling_price: { order: 7, show: true },
    status: { order: 8, show: true },
    competing_goods_link: { order: 9, show: true },
    competing_goods_advert_link: { order: 10, show: true },
    supplier_links: { order: 11, show: true },
    product_category: { order: 12, show: true },
    category: { order: 13, show: true },
    product_developer: { order: 14, show: true },
    creater: { order: 15, show: true },
    create_time: { order: 16, show: true },
    remark: { order: 17, show: true },
    option: { order: 18, show: true, fixed: 'right' },
  },
};

export default {
  // 页面配置，搜索、表头
  'GET /api/setting/page': (req: Request, res: Response) => {
    const name: string = req.query?.name as string;

    if (!columnObj[name]) {
      res.send({
        code: 1,
        msg: '找不到该列表页的表头配置！',
      });
      return;
    }

    res.send({
      msg: 'success',
      code: 0,
      response: columnObj[name],
    });
  },
  // 更新页面配置
  'POST /api/setting/page': (req: Request, res: Response) => {
    let { name, data } = req.body;
    console.log(data);
    columnObj[name || 'account'] = data;

    res.send({
      msg: 'success',
      code: 0,
      response: '保存成功',
    });
  },
};
