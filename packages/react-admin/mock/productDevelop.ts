import { Request, Response } from 'express';
let productList: Record<string, any>[] = [];
for (let i = 0; i < 30; i++) {
  productList.push({
    id: i + 1,
    product_development_no: 'F02004' + i,
    spu: 'P20802' + i,
    sku: 'sku',
    avatar: '',
    product_name: '测试名称-' + (i + 1),
    purchase_price: 100 + i,
    selling_price: 100 + i,
    status: i !== 0 && i % 3 === 0 ? 0 : 1,
    competing_goods_link: '竞品链接' + (i + 1),
    competing_goods_advert_link: '竞品广告链接' + (i + 1),
    supplier_links: '供应商链接' + (i + 1),
    product_category: '产品分类' + (i + 1),
    category: '分类' + (i + 1),
    product_developer: '',
    creater: '',
    created_at: new Date(),
    remark: '备注' + (i + 1),
  });
}

let labelList: Record<string, any>[] = [];
const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];
for (let i = 0; i < 30; i += 1) {
  labelList.push({
    id: i,
    status: '未处理',
    status_text: '未处理',
    confirm_at: new Date(),
    confirm_people: `小明${i}`,
    avatar: 'https://i.ebayimg.com/images/g/-4AAAOSwfmFf-SNu/s-l300.png',
    spu: `5663${i}`,
    sku: `P0292${i}`,
    product_developer: creators[Math.ceil(Math.random() * 4)],
    title: 'eBay 原木戒指展示架多层耳环展示架饰品架可拆摆耳环卡片首饰架 3 Tier',
    english_title: '',
    keyword: 'Earring Holder',
    brand: 'Unbrand',
    model: 'None',
    product_size: '40.00 x 10.00 x 5.00',
    supplier_name_english: '义乌市瑞羿电子商务有限公司',
    supplier_address: '中国',
    origin_place: 'Made in China',
    created_at: new Date(),
  });
}
export default {
  // amazon商品列表
  'GET /api/product-develop/amazon-list': (req: Request, res: Response) => {
    const query: Record<string, any> = req.query;
    const { product_name, current, pageSize, product_development_no } = query;
    const start = (current - 1) * pageSize;
    let list = [...productList];

    if (product_name) {
      list = list.filter(v => v.product_name.indexOf(product_name) > -1);
    }
    if (product_development_no) {
      list = list.filter(v => {
        v.product_development_no.indexOf(product_development_no) > -1;
      });
    }
    res.send({
      msg: '成功',
      code: 0,
      response: {
        total: list.length,
        list: list.slice(start, start + pageSize),
      },
    });
  },
  // ebay商品列表
  'GET /api/product-develop/ebay-list': (req: Request, res: Response) => {
    const query: Record<string, any> = req.query;
    const { product_name, current, pageSize, product_development_no } = query;
    const start = (current - 1) * pageSize;
    let list = [...productList];

    if (product_name) {
      list = list.filter(v => v.product_name.indexOf(product_name) > -1);
    }
    if (product_development_no) {
      list = list.filter(v => {
        v.product_development_no.indexOf(product_development_no) > -1;
      });
    }
    res.send({
      msg: '成功',
      code: 0,
      response: {
        total: list.length,
        list: list.slice(start, start + pageSize),
      },
    });
  },
};
