import type { FC } from 'react';

import { Card, Button, Row, Col, Form, Input, InputNumber } from 'antd';

import { history } from 'umi';
import styles from './index.less';

import { PageContainer } from '@ant-design/pro-layout';

const PackageUpdate: FC = () => {
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
      <Card title="产品包装编辑">
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="包装方式" name="pack_way">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="装箱数量" name="packing_number">
                <InputNumber min={1} style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="装箱重量（g）" name="packing_weight">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="长（cm）" name="length">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="宽（cm）" name="width">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="高（cm）" name="height">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="其他" name="remark">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item wrapperCol={{ span: 24 }} style={{ textAlign: 'center' }}>
                <Button htmlType="button" type="primary">
                  提交保存
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </PageContainer>
  );
};
export default PackageUpdate;
