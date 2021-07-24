import type { FC } from 'react';
import { useState, useEffect } from 'react';

import { PageContainer } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Button, Card, Row, Col, Form, Space, message } from 'antd';

import styles from './index.less';

import { Link, history } from 'umi';

const EbayScheduleBindUpdate: FC = () => {
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Button
        onClick={() => {
          history.goBack();
        }}
        type="primary">
        返回
      </Button>
      <Card title="新增上架计划" style={{ marginTop: '10px' }}>
        <ProForm
          submitter={false}
          className={styles.form}
          layout="horizontal"
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <ProFormText name="bound_num" label="捆绑号" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="country"
                label="国家"
                showSearch
                options={[
                  {
                    value: '1',
                    label: '澳大利亚',
                  },
                  {
                    value: '2',
                    label: '德国',
                  },
                  {
                    value: '3',
                    label: '英国',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="shelf_shop"
                label="上架店铺"
                placeholder="请输入"
                rules={[{ required: true, message: '上架店铺不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="optimization_time"
                label="优化时间"
                placeholder="请输入"
                rules={[{ required: true, message: '优化时间不能为空' }]}
              />
            </Col>
            <Col lg={24} md={24} className={styles.col}>
              12345
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="product_name" label="产品名称" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="bind_people" label="绑定人" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="keyword" label="关键词" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="overseas_warehouse_available_days" label="海外仓可用天数" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="type" label="类型" placeholder="请输入" />
            </Col>
            <Col md={24} lg={24} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                提交保存
              </Button>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default EbayScheduleBindUpdate;
