import type { FC } from 'react';
import { useState, useEffect } from 'react';

import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Card, Row, Col, Form, Space } from 'antd';
import styles from './index.less';

import { Link, history } from 'umi';

const EbayScheduleBindView: FC = () => {
  return (
    <PageContainer
      title={`商品名称：eBay 4LED塑料牌照灯 货车挂车尾灯车厢灯 2pcs`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return [
              <Link to="/shelf/ebay/schedule/bind-update">
                <Button type="primary">编辑</Button>
              </Link>,
              <Link to="/shelf/ebay/schedule/bind-index">
                <Button>返回</Button>
              </Link>,
            ];
          }}
        </RouteContext.Consumer>
      }>
      <Card title="基础属性" style={{ marginTop: 10 }}>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="SKU">100506</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="SPU">100506</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="产品名称:">ebay谷仓-微型增压直流泵 （做货周期7-10天）</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="SKU绑定人">陈冰珣(Abby)</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="优化时间:">2021-06-07 23:59:59</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="国家（中文）">澳大利亚</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="店铺名">trade_deal99</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="类型">存量</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="完成时间">-</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="海外仓可用天数">30.4137</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="是否按时完成">是</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="创建人">陈冰珣(Abby)</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="创建时间">2021-06-07 12:39:36</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="更新时间">2021-06-07 12:39:36</Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};

export default EbayScheduleBindView;
