import type { FC } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import { Card, Form, Row, Col, Divider, Descriptions, Button } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';
import { Link } from 'umi';

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
    title: '国内运输方式',
    dataIndex: 'transport_mode',
    key: 'transport_mode',
  },
  {
    title: '运费',
    dataIndex: 'freight',
    key: 'freight',
  },
  {
    title: '每件加收',
    dataIndex: 'price',
    key: 'price',
  },
];
const columns3: ProColumns<TransportItem>[] = [
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

// 基础信息
const BasicInfo: FC = () => {
  return (
    <RouteContext.Consumer>
      {({ isMobile }) => (
        <Descriptions size="small" column={isMobile ? 1 : 2}>
          <Descriptions.Item label="店铺">423</Descriptions.Item>
          <Descriptions.Item label="站点">15</Descriptions.Item>
          <Descriptions.Item label="Item ID">393394887787</Descriptions.Item>
          <Descriptions.Item label="标题">
            Electric Drill Nail Manicure Pedicure Acrylic Sanding Pen Art 12Files AU Plug
          </Descriptions.Item>
          <Descriptions.Item label="币种">4</Descriptions.Item>
          <Descriptions.Item label="ebay-主要类别">11872</Descriptions.Item>
          <Descriptions.Item label="ebay-第二类别">178960</Descriptions.Item>
          <Descriptions.Item label="商店-主类别">0</Descriptions.Item>
          <Descriptions.Item label="商店-第二类别">0</Descriptions.Item>
          <Descriptions.Item label="物品状态">1000</Descriptions.Item>
          <Descriptions.Item label="物品名">New</Descriptions.Item>
          <Descriptions.Item label="条件说明"> </Descriptions.Item>
          <Descriptions.Item label="持续时间">GTC</Descriptions.Item>
          <Descriptions.Item label="允许最优惠">1</Descriptions.Item>
          <Descriptions.Item label="Auto decline offers lower than">0.00000000</Descriptions.Item>
          <Descriptions.Item label="Auto accept offers of at least">0.00000000</Descriptions.Item>
          <Descriptions.Item label="Hit Counter">BasicStyle</Descriptions.Item>
          <Descriptions.Item label="浏览量">1</Descriptions.Item>
          <Descriptions.Item label="">18</Descriptions.Item>
          <Descriptions.Item label="链接地址">
            https://www.ebay.com/itm/Electric-Drill-Nail-Manicure-Pedicure-Acrylic-Sanding-Pen-Art-12Files-AU-Plug-/393394887787
          </Descriptions.Item>
          <Descriptions.Item label="收藏量">1</Descriptions.Item>
          <Descriptions.Item label="销售数量">1</Descriptions.Item>
        </Descriptions>
      )}
    </RouteContext.Consumer>
  );
};
const PublishListView: FC = () => {
  return (
    <PageContainer
      title={`基础属性`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to={`/shelf/ebay/publish-list/index`}>
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }
      content={<BasicInfo />}>
      <Card title="付款" style={{ marginTop: 20 }}>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="账号">huangjuntanpp@gmail.com</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="支付方式">PayPal</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="Description">We accept Paypal payment only.</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="是否立即支付">否</Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="物品所在地" style={{ marginTop: 20 }}>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="国家（中文）">澳大利亚</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国家（英文）">Australia</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="物品所在地">Sydney</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="邮编">2143</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="说明"></Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="物品所在地" style={{ marginTop: 20 }}>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="国内支持退货">是</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国内退货天数">Days_30</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国内退货运费承担方">Buyer</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国内退货方式"></Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国际支持退货">否</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国际退货天数">14</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国际退货运费承担方">Seller</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国际退货方式">MoneyBack</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="退货政策详情">
                30 days after the buyer receives it You must return items in their original packaging and in the same
                condition as when you received them. If you don't follow our item condition policy for returns, you may
                not receive a full refund. Refunds by law: In Australia, consumers have a legal right to obtain a refund
                from a business if the goods purchased are faulty, not fit for purpose or don't match the seller's
                description. More information at returns.
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="货运方式" style={{ marginTop: 20 }}>
        <Divider orientation="left">国内运输</Divider>
        <ProTable<TransportItem, TableListPagination>
          sticky
          rowKey="id"
          toolBarRender={false}
          search={false}
          columns={columns}
        />
        <Divider orientation="left">国际运输</Divider>
        <ProTable<TransportItem, TableListPagination>
          sticky
          rowKey="id"
          toolBarRender={false}
          search={false}
          columns={columns}
        />
      </Card>
      <Card title="日志" style={{ marginTop: 20 }}>
        <ProTable<TransportItem, TableListPagination>
          sticky
          rowKey="id"
          toolBarRender={false}
          search={false}
          columns={columns3}
        />
      </Card>
    </PageContainer>
  );
};

export default PublishListView;
