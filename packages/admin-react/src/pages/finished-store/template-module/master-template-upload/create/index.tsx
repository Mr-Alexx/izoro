import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';

import { Card, Row, Col, Form, Descriptions, Select, Button, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Link } from 'umi';
import Editor from '@/components/Editor';

import styles from './index.less';

const { Option } = Select;

const MasterTemplateCreate: FC = props => {
  const { location } = props as { location?: any };
  //   const editorRef = useRef<HTMLInputElement>(null);
  //   const log = () => {
  //     if (editorRef.current) {
  //       console.log(editorRef.current.getContent());
  //     }
  //   };
  const [cardTitle, setCardTitle] = useState<string>('新增母版');
  const [id, setId] = useState<string | number>('');
  useEffect(() => {
    if (Number(location.query.cate) === 2) {
      setCardTitle('编辑: 旧系统模版');
      setId(location.query.id);
    } else {
      setCardTitle('新增母版');
    }
  }, [location.query]);
  return (
    <PageContainer
      title={`添加母版`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to="/finished-store/template-module/master-template-upload/index">
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }>
      {/* <Link to="/finished-store/template-module/master-template-upload/index">
        <Button>返回</Button>
      </Link> */}
      <Card title={cardTitle} style={{ marginTop: '10px' }}>
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
              {/* <Form.Item label="名称" name="name" rules={[{ required: true, message: '名称不能为空' }]}>
                <Input />
              </Form.Item> */}
              <ProFormText
                name="name"
                label="名称"
                placeholder="请输入"
                rules={[{ required: true, message: '名称不能为空' }]}
              />
            </Col>
            <Col md={24} lg={12}>
              {/* <Form.Item label="类型" name="type" rules={[{ required: true, message: '类型不能为空' }]}>
                <Select showSearch allowClear>
                  <Option value="">请选择</Option>
                  <Option value="产品">产品</Option>
                  <Option value="店铺">店铺</Option>
                </Select>
              </Form.Item> */}
              <ProFormSelect
                name="type"
                label="类型"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: '',
                  },
                  {
                    label: '产品',
                    value: '1',
                  },
                  {
                    label: '店铺',
                    value: '2',
                  },
                ]}
                placeholder=""
                rules={[{ required: true, message: '类型不能为空' }]}
              />
            </Col>
            <Col md={24} lg={24}>
              <Form.Item label="母版内容" rules={[{ required: true, message: '母版内容不能为空' }]}>
                <Editor />
              </Form.Item>
            </Col>
            <Col md={24} lg={24}>
              <Col md={24} lg={24} style={{ textAlign: 'center' }}>
                <Button type="primary" htmlType="submit">
                  提交保存
                </Button>
              </Col>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default MasterTemplateCreate;
