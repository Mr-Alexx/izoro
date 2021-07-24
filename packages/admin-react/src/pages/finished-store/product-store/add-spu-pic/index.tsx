import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Input, Button, Row, Col } from 'antd';
import Upload from '@/components/Upload';

import styles from './index.less';
import { history } from 'umi';

const addSpuPic: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };
  return (
    <PageContainer>
      <div>
        <Button
          type="primary"
          onClick={() => {
            history.goBack();
          }}>
          返回
        </Button>
      </div>
      <Card title="新增SPU图片" className={styles.mt10} style={{ width: '100%' }}>
        <Form onFinish={onFinish} onFinishFailed={onFinishFailed} className={styles.form}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="产品名称" name="product_name">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="名称" name="name">
                <Input />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="图片" rules={[{ required: true, message: '请添加图片' }]}>
                <Upload handleChange={getFileList} />
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

export default addSpuPic;
