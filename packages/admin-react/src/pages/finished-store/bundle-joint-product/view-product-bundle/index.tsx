import type { FC } from 'react';
import { useState, useEffect } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Row, Col, Form } from 'antd';

import styles from './index.less';

import { history } from 'umi';
import type { TableListItem } from './data';

import { getBundleDetail } from '@/services/product';

const columns: ProColumns<TableListItem>[] = [
  {
    title: '图片',
    dataIndex: 'avatar',
    key: 'avatar',
    valueType: 'image',
    width: 120,
  },
  {
    title: 'SPU',
    dataIndex: 'spu',
    key: 'spu',
    width: 120,
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
    width: 120,
  },
  {
    title: '名称',
    key: 'product_name',
    width: 120,
    dataIndex: 'product_name',
  },
  {
    title: '数量',
    key: 'quantity',
    width: 120,
    dataIndex: 'quantity',
  },
];

const ViewProductBound: FC = () => {
  const [productTitle, setProductTitle] = useState<string>('');
  useEffect(() => {
    setProductTitle('ebay 绿萝爬墙绿植藤蔓绿藤攀爬贴墙式固定器 200pcs一卖（564004*2）');
  }, [productTitle]);
  return (
    <PageContainer>
      <div>
        <Button
          onClick={() => {
            history.goBack();
          }}>
          返回
        </Button>
      </div>
      <Card className={styles.mt10} title={productTitle}>
        <Form name="basic" className={styles.form} initialValues={{}}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="捆绑号">B21216</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="捆绑名称">ebay 绿萝爬墙绿植藤蔓绿藤攀爬贴墙式固定器 200pcs一卖（564004*2）</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="备注">200pcs一卖</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="状态">正常</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="创建部门">销售部</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="创建人">罗舒敏(罗舒敏)</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="创建时间">2021-05-26 17:16:15</Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card className={styles.mt20} title="捆绑详情">
        <>
          <ProTable<TableListItem>
            columns={columns}
            // request={getBundleDetail({ bundle: 'B21210' })}
            rowKey="key"
            search={false}
            toolBarRender={false}
          />
        </>
      </Card>
    </PageContainer>
  );
};

export default ViewProductBound;
