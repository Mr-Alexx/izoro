import { Request, Response } from 'express';
// import Mock from 'mockjs';
// let productList: Record<string, any>[] = [];

const data = [
  {
    id: 1,
    product_category: '玩具&游戏类',
    children: [
      {
        id: 11,
        product_category: '遥控玩具',
      },
      {
        id: 12,
        product_category: '军事模型',
        children: [
          {
            key: 121,
            id: 121,
            product_category: '模型车船',
          },
        ],
      },
      {
        id: 13,
        product_category: '	动漫玩具',
        children: [
          {
            id: 131,
            product_category: '	变形金刚',
            children: [
              {
                id: 1311,
                product_category: '	变形',
              },
              {
                id: 1312,
                product_category: '	金刚',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    product_category: '	益智游戏',
  },
];

export default {
  // 捆绑商品列表
  'GET /api/product-category/list': (req: Request, res: Response) => {
    const query: Record<string, any> = req.query;
    const { current, pageSize } = query;
    const start = (current - 1) * pageSize;
    // let list = [...productList];

    // if (bundle) {
    //   list = list.filter(v => v.bundle.indexOf(bundle) > -1);
    // }
    // if (bundle_name) {
    //   list = list.filter(v => {
    //     v.bundle_name.indexOf(bundle_name) > -1;
    //   });
    // }
    res.send({
      success: true,
      code: 0,
      response: {
        total: data.length,
        list: data,
      },
    });
  },
};
