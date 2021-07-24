import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Card, Row, Col, Form, Select, Button, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Link } from 'umi';
import Editor from '@/components/Editor';

import styles from './index.less';

const TemplateContentVersion: FC = () => {
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Link to="/finished-store/template-module/template-content-version/index">
        <Button>返回</Button>
      </Link>
      <Card title="新增内容版本" style={{ marginTop: '10px' }}>
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
              <ProFormSelect
                name="upload_template"
                label="上传模版"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: '',
                  },
                  {
                    label: '仿旧系统上架模板',
                    value: '1',
                  },
                  {
                    label: 'tp',
                    value: '2',
                  },
                ]}
                placeholder="请选择"
                rules={[{ required: true, message: '上传模版不能为空' }]}
              />
            </Col>
            <Col md={24} lg={12}>
              <ProFormSelect
                name="language"
                label="语言"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: '',
                  },
                  {
                    label: '汉语',
                    value: '1',
                  },
                  {
                    label: '英语',
                    value: '2',
                  },
                ]}
                placeholder="请选择"
                rules={[{ required: true, message: '语言不能为空' }]}
              />
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default TemplateContentVersion;
