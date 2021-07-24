import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Card, Form, Row, Col, Input, Select, DatePicker, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormDateTimePicker } from '@ant-design/pro-form';
import styles from './index.less';
import Editor from '@/components/Editor';

import { history } from 'umi';

const productAttrDetail: FC = () => {
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
      <Card className={styles.mt10}>
        {/* <Form className={styles.form} initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}> */}
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
              <ProFormText name="product_name" label="产品SPU名称" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              {/* 此处应该为富文本编辑器 */}
              <ProFormText name="content" label="内容" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="status"
                label="状态"
                placeholder="请输入"
                rules={[{ required: true, message: '请输入产品状态' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="language"
                label="语言"
                showSearch
                options={[
                  {
                    label: '中文',
                    value: '1',
                  },
                  {
                    label: '英文',
                    value: '2',
                  },
                ]}
                placeholder="请选择"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDateTimePicker name="version" label="版本" style={{ width: '100%' }} />
            </Col>
            <Col md={24} lg={24} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};
export default productAttrDetail;
