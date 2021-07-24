import flowData from './testdata';

const data = [];
export const workList = [
  'Ebay新品开发',
  '飞购产品开发',
  '图片需求单',
  'hopify产品开发',
  '产品供应商',
  '调拨审批',
  '其它入库单',
  '其它出库单',
  '物流商对账单',
  '采购退款单',
].map((v, index) => ({ label: v, value: index + 1 }));

export const modelList = ['userModel', 'systemModel', 'amazonModel', 'ebayModel', 'yangtaoModel', 'shopeeModel'].map(
  v => ({ label: v, value: v }),
);

for (let i = 0; i < 10; i++) {
  data.push({
    id: i + 1,
    name: `审批流-${i}`,
    code: `code-${i}`,
    work_id: workList[i]?.value,
    model: modelList[i >= 6 ? i - 6 : i]?.value,
    front_route: `/route/${i}`,
    status: 1,
    created_at: new Date(),
    updated_at: new Date(),
    data: {
      front_end: flowData,
      back_end: [],
    },
  });
}

export default data;
