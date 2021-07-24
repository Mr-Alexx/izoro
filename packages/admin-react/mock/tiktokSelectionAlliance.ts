import { Request, Response } from 'express';
import Mock from 'mockjs';

export default {
  // 精选联盟订单列表
  'GET /api/tiktok-selection-alliance-order/order-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        platform_id: '48112450037618643' + (i + 1),
        product_name: Mock.mock('@csentence(5)'),
        product_id: '34843828147476367' + (i + 1),
        turnover: '39.00',
        price: '65.00',
        deal_difference: '0.00',
        tiktok_commission_rate: '35%',
        offline_commission_rate: '-',
        total_commission: '13.93',
        technical_service_fee: '1.39',
        proportion: '100%',
        estimate_total_commission: '12.54',
        talent_id: '38522983620419' + (i + 1),
        tiktok_settlement_commission_income: '-',
        offline_settlement_commission_income: '-',
        offline_settlement_commission_label: '-',
        estimate_commission_income_offline: '0.000',
        payment_type: '线上结算',
        tiktok_order_status: '订单付款',
        whole_order_collection_status: '未收款',
        talent_nickname: 'Mooki瑜伽',
        supplier_name: '纳丽雅电子商务有限公司',
        offline_settlement_confirmation: 'unknown',
        offline_settlement_time: '-',
        tiktok_estimates_commission_income: '12.54',
        order_payment_time: '2021-06-22 02:46:41',
        order_settlement_time: '-',
        offline_settlement_channel: 'unknown-dba',
      });
    }

    res.send({
      code: 0,
      msg: 'success',
      response: {
        list: data,
        total: 20,
      },
    });
  },

  // 精选联盟供应商列表
  'GET /api/tiktok-selection-alliance-order/supplier-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        supplier_id: 'G' + (i + 1),
        supplier_name: Mock.mock('@csentence(5)'),
        supplier_leader: Mock.mock('@cname()'),
        supplier_contact_info: '15875619488',
        settlement_type: '线上结算',
        supplier_follower: Mock.mock('@cname()'),
        creater: Mock.mock('@cname()'),
        created_at: Mock.mock('@datetime()'),
      });
    }

    res.send({
      code: 0,
      msg: 'success',
      response: {
        list: data,
        total: 20,
      },
    });
  },
};
