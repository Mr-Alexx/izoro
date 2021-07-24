import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';

import { Button, message, Card, Row, Col, Select, Form } from 'antd';

import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { debounce } from 'lodash';
import { Link } from 'umi';
import Editor from '@/components/Editor';
import styles from './index.less';

const { Option } = Select;

const ContentUpdate: FC = () => {
  const [cardTitle, setCardTitle] = useState<string>('新增母版');
  return (
    <PageContainer
      title={`编辑模版内容`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to="/finished-store/template-module/template-content-version/index">
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }>
      <Card title={cardTitle} style={{ marginTop: '10px' }}>
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
              <ProFormText name="version" label="版本号" placeholder="请输入" />
            </Col>
            <Col md={24} lg={12}>
              <ProFormSelect
                name="component"
                label="组件"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: '',
                  },
                  {
                    label: '旧系统顶部图片',
                    value: '1',
                  },
                ]}
                placeholder=""
                rules={[{ required: true, message: '请选择' }]}
              />
            </Col>
            <Col md={24} lg={24}>
              <Form.Item label="母版内容" rules={[{ required: true, message: '母版内容不能为空' }]}>
                <Editor />
              </Form.Item>
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

export default ContentUpdate;
