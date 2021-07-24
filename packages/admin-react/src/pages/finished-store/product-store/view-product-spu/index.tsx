import type { FC } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Button, Card, Descriptions, Space, Table } from 'antd';
import ProTable from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import type { ColumnProps } from 'antd/es/table';

import TableToolBar from '@/components/TableToolBar';

import { history, Link } from 'umi';
import styles from './index.less';

import type { propertyItem, spuSkuItem, TableListPagination } from './data';
import Logs from '@/components/Logs';

const columns1: ColumnProps<propertyItem>[] = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '属性',
    dataIndex: 'property',
    key: 'property',
  },
];

const columns2: ProColumns<spuSkuItem>[] = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'SPU',
    dataIndex: 'spu',
    key: 'spu',
  },
  {
    title: '名称',
    dataIndex: 'product_title',
    key: 'product_title',
  },
  {
    title: '主图',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: '净值尺寸（开发）',
    dataIndex: 'net_size',
    key: 'net_size',
  },
  {
    title: '创建时间',
    dataIndex: 'created_at',
    key: 'created_at',
  },
  {
    title: '创建人',
    dataIndex: 'creater',
    key: 'creater',
  },
  {
    title: '产品开发人',
    dataIndex: 'product_developer',
    key: 'product_developer',
  },
  {
    title: '物流属性',
    dataIndex: 'log_properties',
    key: 'log_properties',
  },
  {
    title: '海关编码',
    dataIndex: 'hs_code',
    key: 'hs_code',
  },
];

const data1 = [
  {
    id: 123,
    property: '玩具',
  },
];

// 产品基础信息
const BasicInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="ID">13456</Descriptions.Item>
          <Descriptions.Item label="SPU">566422</Descriptions.Item>
          <Descriptions.Item label="产品名称">eBay 4LED塑料牌照灯 货车挂车尾灯车厢灯 2pcs</Descriptions.Item>
          <Descriptions.Item label="创建人">廖嘉燕</Descriptions.Item>
          <Descriptions.Item label="创建时间">2021-05-25 18:55:20</Descriptions.Item>
          <Descriptions.Item label="更新时间">2021-05-25 18:55:20</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};

const ViewProduct: FC = () => {
  return (
    <PageContainer
      title={`商品名称：eBay 4LED塑料牌照灯 货车挂车尾灯车厢灯 2pcs`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to={`/finished-store/product-store/create-product-spu?id=${location.query.id}`}>
                <Button type="primary">编辑SPU产品</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }
      content={<BasicInfo />}>
      <ProTable
        className="card-table"
        headerTitle="SPU属性信息"
        rowKey="id"
        search={false}
        options={false}
        columns={columns1}
        dataSource={data1}
        pagination={{
          pageSize: 50,
          showSizeChanger: false,
        }}
      />

      <ProTable<spuSkuItem, TableListPagination>
        className="card-table mt-20"
        headerTitle="SPU-SKU信息"
        columns={columns2}
        search={false}
        pagination={{
          pageSize: 50,
          showSizeChanger: false,
        }}
        options={false}
      />

      <ProTable<spuSkuItem, TableListPagination>
        className="card-table mt-20"
        headerTitle="SPU图片"
        columns={columns2}
        search={false}
        pagination={{
          pageSize: 50,
          showSizeChanger: false,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            onClick={() => {
              history.push({
                pathname: '/finished-store/product-store/add-spu-pic',
              });
            }}>
            新增SPU图片
          </Button>,
        ]}
        options={false}
      />

      {/* <Card title="日志" className={styles.mt20} style={{ width: '100%', minHeight: 300 }}>
        <div className={styles.alignCenter}>没有找到数据</div>
      </Card> */}
      <Logs style={{ marginTop: 20 }} />
    </PageContainer>
  );
};

export default ViewProduct;
