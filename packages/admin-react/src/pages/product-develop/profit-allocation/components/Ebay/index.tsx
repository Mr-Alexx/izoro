import React from 'react';
import type { FC } from 'react';
import { Row, Col, Button, message, Space } from 'antd';
import ProForm, { ProFormText } from '@ant-design/pro-form';

import styles from './index.less';

// const layout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
const Ebay: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div>
      <div className={styles.selection}>
        <div className={`${styles.title} ${styles.mb20}`}>利润配置</div>
        {/* <Form
          name="basic"
          className={styles.form}
          initialValues={{ exchange_rate: 12 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}> */}
        <ProForm
          submitter={false}
          className={styles.form}
          initialValues={{ exchange_rate: 12 }}
          layout="horizontal"
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20} className={styles.mb20}>
            <Col lg={8} md={24}>
              <ProFormText
                name="price_before_exchange_rate"
                label="售价(汇率前)"
                rules={[{ required: true, message: '售价不能为空' }]}
                placeholder="请输入"
              />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText
                name="exchange_rate"
                label="汇率"
                rules={[{ required: true, message: '汇率不能为空' }]}
                placeholder="请输入"
              />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText
                name="product_costs"
                label="产品成本"
                rules={[{ required: true, message: '产品成本不能为空' }]}
                placeholder="请输入"
              />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText name="first_carrier_freight" label="头程运费" placeholder="请输入" />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText name="final_freight" label="程运费(汇率前)" placeholder="请输入" />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText name="final_freight_f2" label="尾程运费(F2)" placeholder="请输入" />
            </Col>
          </Row>
          <Row gutter={20} className={styles.crossLine}>
            <Col lg={12} md={24}>
              <ProFormText name="price" label="售价(D)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="platform_rate" label="平台费率(E)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="gst" label="GST(T)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="procurement_freight" label="采购运费(P)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="wastage" label="损耗(L)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="gross_profit_rate" label="毛利率(R)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="profit" label="利润(G)" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.selection}>
                <div className={`${styles.title} ${styles.mb20}`}>运费配置</div>
              </div>
            </Col>
          </Row>

          <Row gutter={20}>
            <Col lg={8} md={24}>
              <ProFormText name="length" label="长" placeholder="请输入" />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText name="width" label="宽" placeholder="请输入" />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText name="height" label="高" placeholder="请输入" />
            </Col>
          </Row>
          <Row gutter={20} className={styles.mb20}>
            <Col lg={8} md={24}>
              <ProFormText
                name="ocean_freight"
                label="海运费"
                rules={[{ required: true, message: '海运费不能为空' }]}
                placeholder="请输入"
              />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText name="air_freight" label="空运费" placeholder="请输入" />
            </Col>
            <Col lg={8} md={24}>
              <ProFormText
                name="weight"
                label="重量"
                placeholder="请输入"
                rules={[{ required: true, message: '重量不能为空' }]}
              />
            </Col>
          </Row>
          <Row gutter={20} className={styles.crossLine}>
            <Col lg={12} md={24}>
              <ProFormText name="bulk" label="体积(G)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="shipping_first_leg" label="海运头程(H)" placeholder="请输入" />
            </Col>
          </Row>
          <Row gutter={20} className={styles.mb20}>
            <Col lg={12} md={24}>
              <ProFormText name="airfreight_first_leg" label="空运头程(I)" placeholder="请输入" />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col lg={24} md={24} style={{ textAlign: 'center' }}>
              <Space>
                <Button htmlType="button">取消修改</Button>
                <Button type="primary" style={{ margin: '0 8px' }} htmlType="submit">
                  确定保存
                </Button>
              </Space>
            </Col>
          </Row>
        </ProForm>
      </div>
    </div>
  );
};

export default Ebay;
