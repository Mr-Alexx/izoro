import type { FC } from 'react';
import { PageContainer, FooterToolbar, RouteContext } from '@ant-design/pro-layout';
import { Card, Button, Row, Col, Form, Radio, Descriptions, Input } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { Link } from 'umi';
import styles from './index.less';
import type { TableListItem } from './data';
import { TableListPagination } from './data';

const columns: ProColumns<TableListItem>[] = [];
const ViewSupplier: FC = () => {
  return (
    <PageContainer
      title={`查看供应商`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {(value: RouteContextType) => {
            return (
              <Link to={`/tiktok-selection-alliance/supplier/index`}>
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }>
      <Card title="基础信息" style={{ marginTop: 20 }} extra={<Button size="small">编辑基础信息</Button>}>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={6} md={24}>
              <Form.Item label="供应商ID">G26</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="供应商名称">杭州轻食公司</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="结款类型">线上线下结算</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="结款周期">月结</Form.Item>
            </Col>

            <Col lg={6} md={24}>
              <Form.Item label="供应商负责人">小兰</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="供应商联系方式">18856965412</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="供应商跟进人">小红</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="是否使用抖音佣金率">使用</Form.Item>
            </Col>

            <Col lg={6} md={24}>
              <Form.Item label="线下佣金率">5%</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="合同附件  ">图片</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="营业执照"> - </Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="创建人">小吴</Form.Item>
            </Col>

            <Col lg={6} md={24}>
              <Form.Item label="创建时间">2020-01-02 12:33:23</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="更新时间">2020-01-02 12:33:23</Form.Item>
            </Col>
            <Col lg={12} md={24}></Col>
            <Col lg={12} md={24}>
              <Form.Item label="备注">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card title="商品信息" style={{ marginTop: 20 }} extra={<Button size="small">新增商品</Button>}></Card>
    </PageContainer>
  );
};

export default ViewSupplier;
