import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Button, Select, message, Row, Col, Card, Input, Form, Space } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';

import { Link, history } from 'umi';
import styles from './index.less';
import Upload from '@/components/Upload';

const { Option } = Select;

const AddSupplier: FC = () => {
  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Card>
        <ProForm
          layout="horizontal"
          className={styles.form}
          submitter={false}
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col lg={24} md={24}>
              <div className={styles.title}>基础信息</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="supplier_name"
                label="供应商名称"
                placeholder="请输入"
                rules={[{ required: true, message: '供应商名称不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="supplier_leader"
                label="供应商负责人"
                placeholder="请输入"
                rules={[{ required: true, message: '供应商负责人不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="supplier_contact_info"
                label="供应商联系方式"
                placeholder="请输入"
                rules={[{ required: true, message: '供应商联系方式不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="settlement_type"
                label="结款类型"
                rules={[
                  {
                    required: true,
                    message: '结款类型不能为空',
                  },
                ]}
                options={[
                  {
                    label: '线上结算',
                    value: '1',
                  },
                  {
                    label: '线下结算',
                    value: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="settlement_cycle"
                label="结款周期"
                rules={[
                  {
                    required: true,
                    message: '结款周期不能为空',
                  },
                ]}
                options={[
                  {
                    label: '月结',
                    value: '1',
                  },
                  {
                    label: '半月结',
                    value: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="supplier_follower"
                label="供应商跟进人"
                rules={[
                  {
                    required: true,
                    message: '供应商跟进人不能为空',
                  },
                ]}
                options={[
                  {
                    label: '张三',
                    value: '1',
                  },
                  {
                    label: '李四',
                    value: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormTextArea name="remark" label="备注" />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>佣金规则</div>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="是否使用抖音佣金">使用</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item
                label="线下佣金率"
                rules={[
                  {
                    required: true,
                    message: '线下佣金率不能为空',
                  },
                ]}>
                <Input
                  addonAfter={
                    <Select defaultValue=".com" className="select-after">
                      <Option value=".com">%</Option>
                      <Option value=".jp">元</Option>
                    </Select>
                  }
                />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>证件信息</div>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="合同附件">
                <Upload handleChange={getFileList} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="营业执照">
                <Upload handleChange={getFileList} />
              </Form.Item>
            </Col>
            <Col lg={24} md={24} style={{ textAlign: 'center' }}>
              <Space>
                <Button htmlType="button">保存 并 新增</Button>
                <Button type="primary" htmlType="submit">
                  保存 并 返回
                </Button>
              </Space>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default AddSupplier;
