import { Request, Response } from 'express';
import Mock from 'mockjs';

export default {
  // ebay上架计划
  'GET /api/shelf/ebay-schedule': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        sku: 'P0231' + i,
        spu: '1005' + (i + 1),
        product_name: '这是测试产品名称-' + (i + 1),
        sku_bind_people: Mock.mock('@cname()'),
        kwyword: Mock.mock('@cword(3, 5)'),
        gmv: '1965.8600',
        sales_status: '(5.15-11.30) 备货--季节性产品春夏天销售',
        optimization_time: Mock.mock('@datetime()'),
        country: '澳大利亚',
        shop_name: 'trade_deal99',
        type: '存量',
        overseas_warehouse_available_days: '30.4137',
        finish_at: Mock.mock('@datetime()'),
        is_finish_on_time: '是',
        plan_state: 'unknown-dba',
        creater: Mock.mock('@cname()'),
        created_at: Mock.mock('@datetime()'),
        updated_at: Mock.mock('@datetime()'),
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
  // ebay商品列表
  'GET /api/shelf/ebay-product-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        product_editor: Mock.mock('@cname()'),
        avatar: 'https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/SyIAAOSwLndftM67/$_1.JPG?set_id=2',

        sku: 'P0231' + i,
        spu: '1005' + (i + 1),
        site: '澳大利亚',
        shop: ['gifts_mall2011', 'verruecktefabrik', 'wallartFamily'],
        product_name: '这是测试产品名称-' + (i + 1),
        title: '产品名称' + (i + 1),
        state: '正常',
        product_creation_time: Mock.mock('@datetime()'),
        automatic_replenishment_rule: '-',
        provider: Mock.mock('@cname()'),
        inquirer: Mock.mock('@cname()'),
        salesman: Mock.mock('@cname()'),
        seller: Mock.mock('@cname()'),
        item_id: '1234' + (i + 1),
        sales_volume: Mock.mock({
          'number|1-100': 100,
        }).number,
        sales_volume_money: Mock.mock({
          'number|60-1000': 100,
        }).number,
        ebay_same_lowest_price: Mock.mock({
          'number|60-100': 100,
        }).number,
        keywords: Mock.mock('@csentence(3, 5)'),
        erp_product_classification: '-',
        initial_purchase_quantity: '-',
        platform_classification1: '-',
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

  // ebay刊登列表
  'GET /api/shelf/ebay-publish-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        avatar: 'https://i.ebayimg.com/00/s/MTAwMFgxMDAw/z/SyIAAOSwLndftM67/$_1.JPG?set_id=2',
        sku: 'P0231' + i,
        process_state: '正常',
        push_state: '推送成功',
        shelf_state: '上架',
        shop_name: '店铺' + (i + 1),
        site: '澳大利亚',
        goods_location: 'Sydney',
        publisher: Mock.mock('@cname()'),
        platform_category_id1: '11600' + (i + 1),
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

  // ebay刊登列表
  'GET /api/shelf/ebay-publist-push-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        push_at: Mock.mock('@datetime()'),
        shop_name: '店铺' + (i + 1),
        site: '澳大利亚',
        item_id: '3135717480' + (i + 1),
        push_status: '成功',
        err_msg: 'Warning:Retu.',
        title: '435X Wall Stickers Luminous Stars Moon Planet Decal Glow In Dark Kids Room Decor',
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

  // ebay刊登列表
  'GET /api/operation-center/yangtao-mobile-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        tel: '172886049' + (i + 1),
        meal: '【阿里小宝卡】',
        monthly_balance: '76.00',
        monthly_balmonthly_balance_voucherance: 'http://cdn2.bz-bss.com/B05KU/193086G.jpg!h64',
        monthly_balance_recording_time: Mock.mock('@datetime()'),
        recharge_amount_application: '30.00',
        application_recharge_amount_time: Mock.mock('@datetime()'),
        user_mode: '正常',
        custodian_department: '广州市洋桃传媒有限公司',
        cardholder: Mock.mock('@cname()'),
        keeper: Mock.mock('@cname()'),
        card_type: '公司',
        opened_time: Mock.mock('@date()'),
        pay_date_rent: Mock.mock('@date()'),
        monthly_rent: '19.00',
        operator: '联通',
        use_type: '直播账号',
        binding_info: '',
        recent_recharge_amount: '50.00',
        recharge_amount: '50.00',
        last_recharge_time: Mock.mock('@datetime()'),
        recharge_time: Mock.mock('@datetime()'),
        top_up_state: '失败',
        accumulated_recharge_amount: '0',
        accumulated_recharge_times: 10,
        creator: Mock.mock('@cname()'),
        creation_time: Mock.mock('@datetime()'),
        update_time: Mock.mock('@datetime()'),
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
