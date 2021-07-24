import { Request, Response } from 'express';
import Mock from 'mockjs';
let productList: Record<string, any>[] = [];
let productDetailList: Record<string, any>[] = [];
let jointList: Record<string, any>[] = [];

for (let i = 0; i < 30; i++) {
  productList.push({
    bundle: 'B2121' + i,
    bundle_name: Mock.mock('@csentence(5)'),
    sku: 'p1230' + (i + 1),
    remark: Mock.mock('@cparagraph(5, 10)'),
    status: 1,
    create_department: '产品部',
    creater: Mock.mock('@cname()'),
    created_at: Mock.mock('@now()'),
  });
}

for (let i = 0; i < 2; i++) {
  productDetailList.push({
    id: i + 1,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    spu: 'P02828' + (i + 1),
    sku: '56400' + (i + 1),
    product_name: Mock.mock('@cparagraph(5, 10)'),
    quantity: i + 1,
  });
}

for (let i = 0; i < 30; i++) {
  jointList.push({
    target_sku: '52121' + i,
    target_spu: 'P01991' + i,
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
    target_product: Mock.mock('@cparagraph(5, 10)'),
    quantity: i + 1,
    processing_name: '530765=530294+532093',
    warehouse: '备货仓（eBay）',
    status: '仓库完成',
    creater: Mock.mock('@cname()'),
    created_at: Mock.mock('@datetime()'),
  });
}

export default {
  // 捆绑商品列表
  'GET /api/bundle-joint/bundle-list': (req: Request, res: Response) => {
    const query: Record<string, any> = req.query;
    const { bundle, bundle_name, current, pageSize } = query;
    const start = (current - 1) * pageSize;
    let list = [...productList];

    if (bundle) {
      list = list.filter(v => v.bundle.indexOf(bundle) > -1);
    }
    if (bundle_name) {
      list = list.filter(v => {
        v.bundle_name.indexOf(bundle_name) > -1;
      });
    }
    res.send({
      success: true,
      code: 0,
      response: {
        total: list.length,
        list: list.slice(start, start + pageSize),
      },
    });
  },
  // 捆绑商品详情
  'GET /api/bundle-joint/bundle-detail': (req: Request, res: Response) => {
    res.send({
      success: true,
      code: 0,
      response: {
        total: productDetailList.length,
        list: productDetailList,
      },
    });
  },
  // 组合商品列表
  'GET /api/bundle-joint/joint-list': (req: Request, res: Response) => {
    const query: Record<string, any> = req.query;
    const { target_sku, target_spu, current, pageSize } = query;
    const start = (current - 1) * pageSize;
    let list = [...jointList];

    if (target_sku) {
      list = list.filter(v => v.target_sku.indexOf(target_sku) > -1);
    }
    if (target_spu) {
      list = list.filter(v => {
        v.target_spu.indexOf(target_spu) > -1;
      });
    }
    res.send({
      success: true,
      code: 0,
      response: {
        total: list.length,
        list: list.slice(start, start + pageSize),
      },
    });
  },
};
