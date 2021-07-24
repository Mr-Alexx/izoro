import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';

import { Card, Row, Col, Form, Select, Button, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { Link } from 'umi';
import Editor from '@/components/Editor';

import styles from './index.less';

const { Option } = Select;

const MmoduleContentUpdate: FC = props => {
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
  // const onFinish = (values: any) => {
  //   console.log('Success:', values);
  // };

  // const onFinishFailed = (errorInfo: any) => {
  //   console.log('Failed:', errorInfo);
  // };
  return (
    <PageContainer
      title={`编辑模版模块内容`}
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
              <ProFormText name="template-upload" label="上架模版" placeholder="请输入" />
            </Col>
            <Col md={24} lg={12}>
              <ProFormSelect
                name="master_module"
                label="母版模块"
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
                  {
                    label: '旧模板文本内容',
                    value: '2',
                  },
                ]}
                placeholder="请选择"
                rules={[{ required: true, message: '母版模块不能为空' }]}
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

export default MmoduleContentUpdate;
