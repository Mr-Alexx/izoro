import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Select } from 'antd';

import { debounce } from 'lodash';

import type { TableListItem, TableListPagination } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getEbayPublishList } from '@/services/product';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { Option } = Select;

const SkuList: FC = () => {
  const [activekey, setActiveKey] = useState<React.Key>('1');
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  useEffect(() => {
    const { query = {} } = history.location;
    console.log(query);
  }, [activekey]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '图片',
      width: 120,
      dataIndex: 'avatar',
      key: 'avatar',
      valueType: 'image',
      search: false,
    },
    {
      title: 'SKU',
      width: 120,
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: '上架状态',
      width: 120,
      dataIndex: 'shelf_status',
      key: 'shelf_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '1',
          },
          {
            label: '上架',
            value: '2',
          },
          {
            label: '下架',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '名称',
      width: 120,
      dataIndex: 'product_name',
      key: 'product_name',
      search: false,
    },
    {
      title: '标题',
      width: 120,
      dataIndex: 'title',
      key: 'title',
      search: false,
    },
    {
      title: '昨天销售单数',
      width: 120,
      dataIndex: 'sales_num_y',
      key: 'sales_num_y',
      search: false,
    },
    {
      title: '前天销售单数',
      width: 120,
      dataIndex: 'sales_num_q',
      key: 'sales_num_q',
      search: false,
    },
    {
      title: 'Item ID',
      width: 120,
      dataIndex: 'item_id',
      key: 'item_id',
    },
    {
      title: '店铺名称',
      width: 120,
      dataIndex: 'shop_name',
      key: 'shop_name',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: 'alien-wolf',
            value: '1',
          },
          {
            label: 'verruecktefabrik',
            value: '2',
          },
          {
            label: 'e-onlinebuy',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '站点',
      width: 120,
      dataIndex: 'site',
      key: 'site',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '澳大利亚',
            value: '1',
          },
          {
            label: '美国',
            value: '2',
          },
          {
            label: '英国',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '关键词',
      width: 120,
      dataIndex: 'keyword',
      key: 'keyword',
      search: false,
    },
    {
      title: '刊登方式',
      width: 120,
      dataIndex: 'publish_way',
      key: 'publish_way',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '一口价',
            value: '1',
          },
          {
            label: '多属性',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '类型',
      width: 120,
      dataIndex: 'type',
      key: 'type',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '一口价',
            value: '1',
          },
          {
            label: '多属性',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '持续时间',
      width: 120,
      dataIndex: 'duration_time',
      key: 'duration_time',
      search: false,
    },
    {
      title: '绑定人',
      width: 120,
      dataIndex: 'binding_people',
      key: 'binding_people',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅',
            value: '1',
          },
          {
            label: '严胜娇',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '物品所在地',
      width: 120,
      dataIndex: 'articles_location',
      key: 'articles_location',
    },
    {
      title: '上架时间',
      width: 120,
      dataIndex: 'shelf_time',
      key: 'shelf_time',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '下架时间',
      width: 120,
      dataIndex: 'sold_out_time',
      key: 'sold_out_time',
      hideInTable: true,
      valueType: 'dateRange',
    },
    {
      title: '已售数',
      width: 120,
      dataIndex: 'sold_num',
      key: 'sold_num',
      search: false,
    },
    {
      title: '价格',
      width: 120,
      dataIndex: 'price',
      key: 'price',
      search: false,
    },
    {
      title: '在线数量',
      width: 120,
      dataIndex: 'online_num',
      key: 'online_num',
      search: false,
    },
    {
      title: '毛利率',
      width: 120,
      dataIndex: 'gross_profit_rate',
      key: 'gross_profit_rate',
      search: false,
    },
    {
      title: '最低售价',
      width: 120,
      dataIndex: 'upset_price',
      key: 'upset_price',
      search: false,
    },
    {
      title: '保本售价',
      width: 120,
      dataIndex: 'break_even_price',
      key: 'break_even_price',
      search: false,
    },
    {
      title: '采购价格',
      width: 120,
      dataIndex: 'purchase_price',
      key: 'purchase_price',
      search: false,
    },
    {
      title: '采购状态',
      width: 120,
      dataIndex: 'purchase_status',
      key: 'purchase_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '新品',
            value: '1',
          },
          {
            label: '正常供货',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '销售状态',
      width: 120,
      dataIndex: 'sales_status',
      key: 'sales_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '新品',
            value: '1',
          },
          {
            label: '正常供货',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '仓库 ： 在库数 / 可用数',
      width: 120,
      dataIndex: 'warehouse',
      key: 'warehouse',
      search: false,
    },
    {
      title: 'UPC码',
      width: 120,
      dataIndex: 'upc_code',
      key: 'upc_code',
    },
    {
      title: 'EAN码',
      width: 120,
      dataIndex: 'ean_code',
      key: 'ean_code',
    },
    {
      title: '自动补货名称',
      width: 120,
      dataIndex: 'automatic_replenishment_name',
      key: 'automatic_replenishment_name',
      search: false,
    },
    {
      title: '自动补货状态',
      width: 120,
      dataIndex: 'automatic_replenishment_status',
      key: 'automatic_replenishment_status',
      search: false,
    },
  ];
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        headerTitle="SKU列表"
        request={getEbayPublishList}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <TableToolBar
            options={{ download: false, mark: true }}
            columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))}
          />,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}>
                {selectedRows.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          <>
            <Button key="1">批量打开eBay item 详情页面</Button>
            <Button key="2">批量打开eBay item sold 页面</Button>
            <Button key="3">启动自动补货</Button>
            <Button key="4">停止自动补货</Button>
            <Button key="5">添加自动补货</Button>
            <Button key="6">批量打开</Button>
          </>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default SkuList;
