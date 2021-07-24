import type { FC } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Form, Row, Col, Descriptions, Tag } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';

interface TransportItem {
  transport_mode: string;
  freight: string;
  price: string;
}
interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

const columns: ProColumns<TransportItem>[] = [
  {
    title: '',
    valueType: 'index',
    key: 'index',
  },
  {
    title: '日期',
    dataIndex: 'date',
    key: 'date',
    valueType: 'dateTime',
  },
  {
    title: '详情',
    dataIndex: 'detail',
    key: 'detail',
    render: (_, record) => {
      return <div>详情</div>;
    },
  },
];

// 产品基础信息
const OrderInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="平台订单ID">6464644646464646</Descriptions.Item>
          {/* <Descriptions.Item label="商品名称">运动速干衣防晒衣夏季清凉套运动速干衣防晒衣</Descriptions.Item> */}
          <Descriptions.Item label="商品ID">64664631313112131</Descriptions.Item>
          <Descriptions.Item label="结款类型">线上线下结算</Descriptions.Item>
          <Descriptions.Item label="整单收款状态">部分收款</Descriptions.Item>
          <Descriptions.Item label="结款周期">月结</Descriptions.Item>
          <Descriptions.Item label="供应商名称">爱依服供应商</Descriptions.Item>
          <Descriptions.Item label="达人昵称">mooki瑜伽</Descriptions.Item>
          <Descriptions.Item label="达人ID">16464646464</Descriptions.Item>
          <Descriptions.Item label="平台支付时间">2021-01-01 12:33:45</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};
const PublishListView: FC = () => {
  return (
    <PageContainer title={`商品名称：运动速干衣防晒衣夏季清凉套运动速干衣防晒衣`} content={<OrderInfo />}>
      <Card title="佣金信息" style={{ marginTop: 20 }}>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={8} md={24}>
              <Form.Item className={styles.secondTitle} label="汇总信息">
                <Tag className={styles.tag} color="#097CBB">
                  部分收款
                </Tag>
              </Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item className={styles.secondTitle} label="平台佣金信息">
                <Tag className={styles.tag} color="#09BB3D">
                  已收
                </Tag>
              </Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item className={styles.secondTitle} label="线下佣金信息">
                <Tag className={styles.tag} color="#F95457">
                  未收
                </Tag>
              </Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="成交金额">35.9元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="平台佣金率">20%</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="线下佣金率">10%</Form.Item>
            </Col>

            <Col lg={8} md={24}>
              <Form.Item label="商品售价">35.9元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="技术服务费">0.25元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="线下预估佣金收入">12元</Form.Item>
            </Col>

            <Col lg={8} md={24}>
              <Form.Item label="成交差额">0.00元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="平台预估佣金收入">12.5元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="线下结算佣金收入">-</Form.Item>
            </Col>

            <Col lg={8} md={24}>
              <Form.Item label="总佣金">22.3元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="平台结算佣金收入">12.5元 </Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="线下结算时间">-</Form.Item>
            </Col>

            <Col lg={8} md={24}>
              <Form.Item label="预估总佣金收入">20.5元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="平台结算时间">2021-02-03 12:22:34</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="线下结算确认人">-</Form.Item>
            </Col>

            <Col lg={8} md={24}>
              <Form.Item label="结算总佣金收入">10.5元</Form.Item>
            </Col>
            <Col lg={8} md={24}>
              <Form.Item label="线下结算渠道">-</Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="日志" style={{ marginTop: 20 }}>
        <ProTable<TransportItem, TableListPagination>
          sticky
          rowKey="id"
          toolBarRender={false}
          search={false}
          columns={columns}
        />
      </Card>
    </PageContainer>
  );
};

export default PublishListView;
