import { Request, Response } from 'express';
import Mock from 'mockjs';

export default {
  'GET /api/finished-store/spu': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: 102409 + i,
        spu: 'P023134' + i,
        product_name: '这是测试产品名称-' + i,
        product_source: Math.random() * 100 > 5 ? '' : '现货款',
        first_category: '一级分类',
        second_category: '二级分类',
        third_category: '三级分类',
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
  'GET /api/finished-store/product-spu-attr': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 20; i++) {
      data.push({
        id: i + 1,
        name: Mock.mock('@first()'),
        product_name: Mock.mock('@csentence(3, 5)'),
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
  'GET /api/finished-store/product-development-sheet': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        id: i + 1,
        spu: 'P028072' + i,
        spu_name: Mock.mock('@csentence(3, 5)'),
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        category: '摆件',
        status: '新单',
        purchase_status: '新品',
        source: '审核不通过',
        service_line: 'Fergobuy',
        follow_people: Mock.mock('@cname()'),
        total_sales: Mock.mock('@integer(60, 100)'),
        item_msg: Mock.mock('@csentence(5)'),
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
  'GET /api/finished-store/product-development-view': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      data.push({
        id: i + 1,
        sku: 'P028072' + i,
        avatar: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        product_name: Mock.mock('@csentence(5)'),
        sales_date: Mock.mock('@datetime()'),
        sales_price: Mock.mock('@integer(60, 100)'),
        purchase_status: '新品',
        sales_volume: Mock.mock('@integer(60, 100)'),
        is_quotation: Mock.mock('@boolean()'),
        attribute_name: Mock.mock('@csentence(5)'),
        source_status: '正常',
        link_1688: '-',
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
  'GET /api/finished-store/master-template-upload': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      data.push({
        id: i + 1,
        name: '旧系统模版',
        type: '产品',
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
  'GET /api/finished-store/master-module-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      data.push({
        id: i + 1,
        master_mask: '旧系统模版',
        name: '	tp',
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

  'GET /api/finished-store/template-upload': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      data.push({
        id: i + 1,
        master_mask: '旧系统模版',
        template_name: '仿旧系统上架模版',
        store: '-',
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

  'GET /api/finished-store/template-content-version': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 8; i++) {
      data.push({
        id: i + 1,
        version: '0000000' + (i + 1),
        template_name: '仿旧系统上架模版',
        language: '英语',
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

  'GET /api/finished-store/shot-product-list': (req: Request, res: Response) => {
    const data = [];
    for (let i = 0; i < 30; i++) {
      data.push({
        id: i + 1,
        apply_department: 'eBay',
        shooting_demand_no: 'IMG1910160004' + (i + 1),
        product_name: 'ebay 手机桌面无线充三合一',
        sku: '4384' + (i + 1),
        demand_sheet_type: '新品',
        is_need_filmed: '拍摄',
        sales_follow_up: 'Serena',
        documents_state: '设计完成',
        creater: 'Serena',
        acceptor: '-',
        shoot_in: 'edison',
        designer: 'Alin',
        design_order_confirm_time: Mock.mock('@datetime()'),
        transit_time: Mock.mock('@datetime()'),
        design_receipt_timeout: '否',
        design_complet_timeout: '否',
        estimated_completion_time: Mock.mock('@datetime()'),
        eBay_design_pick_up_person: Mock.mock('@cname()'),
        estimat_receiv_order_time: Mock.mock('@datetime()'),
        shooting_completion_time: Mock.mock('@datetime()'),
        design_completion_time: Mock.mock('@datetime()'),
        acceptance_completion_time: Mock.mock('@datetime()'),
        created_at: Mock.mock('@datetime()'),
        remark: '-',
        photo_path: '/',
        shipping_time: Mock.mock('@datetime()'),
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
