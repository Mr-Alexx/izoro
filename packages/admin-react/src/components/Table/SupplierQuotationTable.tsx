/**
 * @description 供应商报价方案表格
 * 商品开发详情等用到
 */
import { Button, Card, Table } from 'antd';
import type { ColumnsType } from 'antd/lib/table';
import type { FC } from 'react';
import { Link } from 'umi';

type SupplierQuotationItem = {
  id: string;
  supplier_name: string;
  purchase_link: string;
  is_provide_invoice: string;
  billing_type: string;
  tax_rate: string;
  product_quotation: string;
  currency: string;
  initial_purchase_quantity: string;
  additional_purchase: string;
  generation_cycle: string;
  weight: string;
  size: string;
  box_gauge_quantity: string;
  packing_method: string;
  priority: string;
  supplier_quotation_info: string;
  remark: string;
};

const SupplierQuotationTable: FC<{
  /** @description 数据源 */
  dataSource?: SupplierQuotationItem[];
  /** @description 新增供应商报价的链接 */
  link?: string;
}> = ({ dataSource, link }) => {
  const columns: ColumnsType<SupplierQuotationItem> = [
    {
      title: '序号',
      align: 'center',
      width: 60,
      render: (_, record, index) => {
        return index + 1;
      },
    },
    {
      title: '供应商名称',
      dataIndex: 'supplier_name',
      width: 100,
      ellipsis: true,
    },
    {
      title: '采购链接',
      dataIndex: 'purchase_link',
      width: 100,
    },
    {
      title: '是否提供发票',
      dataIndex: 'is_provide_invoice',
      width: 100,
    },
    {
      title: '开票类型',
      dataIndex: 'billing_type',
      width: 100,
    },
    {
      title: '税率%',
      dataIndex: 'tax_rate',
      width: 100,
    },
    {
      title: '产品报价',
      dataIndex: 'product_quotation',
      width: 100,
    },
    {
      title: '币种',
      dataIndex: 'currency',
      width: 100,
    },
    {
      title: '起购量',
      dataIndex: 'initial_purchase_quantity',
      width: 100,
    },
    {
      title: '加购量',
      dataIndex: 'additional_purchase',
      width: 100,
    },
    {
      title: '生成周期（天）',
      dataIndex: 'generation_cycle',
      width: 120,
    },
    {
      title: '重量（kg）',
      dataIndex: 'weight',
      width: 100,
    },
    {
      title: '尺寸（cm）',
      dataIndex: 'size',
      width: 100,
    },
    {
      title: '箱规数量',
      dataIndex: 'box_gauge_quantity',
      width: 100,
    },
    {
      title: '包装方式',
      dataIndex: 'packing_method',
      width: 100,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      width: 100,
    },
    {
      title: '供应商报价信息',
      dataIndex: 'supplier_quotation_info',
      width: 140,
    },
    {
      title: '备注',
      dataIndex: 'remark',
      width: 100,
    },
    // {
    //   title: '操作',
    //   valueType: 'option',
    //   width: 100,
    //   render: (text, record, _, action) => [<Button key="view">查看</Button>, <Button key="delete">删除</Button>],
    // },
  ];

  return (
    <Card
      size="small"
      title="商品报价方案"
      id="商品报价方案"
      style={{ marginTop: 15 }}
      extra={
        link && (
          <Link to={link}>
            <Button key="addSupplier" size="small">
              新增供应商报价
            </Button>
          </Link>
        )
      }>
      <Table
        size="small"
        rowKey="id"
        scroll={{ x: 1000 }}
        dataSource={dataSource}
        pagination={false}
        columns={columns}
      />
    </Card>
  );
};

export default SupplierQuotationTable;
