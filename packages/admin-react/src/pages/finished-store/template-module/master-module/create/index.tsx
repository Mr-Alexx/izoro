import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Card, Row, Col, Form, Input, Select, Button, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Link } from 'umi';

import styles from './index.less';

const { Option } = Select;
const TemplateModuleCreate: FC = () => {
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Link to="/finished-store/template-module/master-template-upload/index">
        <Button>返回</Button>
      </Link>
      <Card title="新增母版" style={{ marginTop: '10px' }}>
        {/* <Form
          name="master-template-upload"
          className={styles.form}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}> */}
        <ProForm
          submitter={false}
          className={styles.form}
          layout="horizontal"
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col md={24} lg={12}>
              <ProFormText
                name="name"
                label="名称"
                placeholder="请输入"
                rules={[{ required: true, message: '名称不能为空' }]}
              />
            </Col>
            <Col md={24} lg={12}>
              <ProFormSelect
                name="master"
                label="母版"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: '',
                  },
                  {
                    label: '旧系统模板',
                    value: '1',
                  },
                  {
                    label: 'tp',
                    value: '2',
                  },
                ]}
                placeholder=""
                rules={[{ required: true, message: '请选择' }]}
              />
            </Col>
            <Col md={24} lg={12}>
              <ProFormText
                name="label"
                label="标签"
                placeholder="请输入"
                rules={[{ required: true, message: '标签不能为空' }]}
              />
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

export default TemplateModuleCreate;
