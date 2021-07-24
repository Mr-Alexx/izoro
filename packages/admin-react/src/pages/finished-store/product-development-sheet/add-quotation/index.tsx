import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Card, Form, Input, Button, Row, Col, Select, Divider, Radio, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect, ProFormTextArea } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';

import styles from './index.less';

import { Link } from 'umi';

const { Option } = Select;
const AddQuotation: FC = () => {
  const [supplierName, setSupplierName] = useState<string>('');
  const [supplierList, setSupplierList] = useState<string[]>(['jack', 'lucy']);
  const addSupplier = () => {
    setSupplierList([...supplierList, supplierName.length > 0 ? supplierName : `New item${supplierList.length}`]);
  };

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Link to="/finished-store/product-development-sheet/view">
        <Button>返回</Button>
      </Link>
      <Card className={styles.mt10} title="添加报价">
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
              <ProFormText name="sku" label="Sku" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="product_name" label="产品名称" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="产品供应商ID" name="supplier_id">
                <Select
                  placeholder="请选择或新增供应商"
                  allowClear
                  dropdownRender={menu => (
                    <div>
                      {menu}
                      <Divider style={{ margin: '4px 0' }} />
                      <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                        <Input
                          style={{ flex: 'auto' }}
                          value={supplierName}
                          onChange={event => {
                            setSupplierName(event.target.value);
                          }}
                        />
                        <a
                          style={{ flex: 'none', padding: '8px', display: 'block', cursor: 'pointer' }}
                          onClick={() => {
                            addSupplier();
                          }}>
                          <PlusOutlined /> Add item
                        </a>
                      </div>
                    </div>
                  )}>
                  {supplierList.map(item => (
                    <Option key={item} value={item}>
                      {item}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="currency_id"
                label="币种ID"
                showSearch
                options={[
                  {
                    label: '人民币',
                    value: '1',
                  },
                  {
                    label: '美元',
                    value: '2',
                  },
                  {
                    label: '英镑',
                    value: '3',
                  },
                ]}
                placeholder="请选择"
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="是否开票" name="is_make_invoice">
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>不提供</Radio>
                  <Radio value={2}>提供</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="price" label="价格" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="tax_point" label="开票税点" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="min_order" label="起购量" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="add_purchase" label="加购量" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="采购方式" name="purchase_method">
                <Radio.Group defaultValue={1}>
                  <Radio value={1}>1688</Radio>
                  <Radio value={2}>线下</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="production_cycle" label="生产周期(天)" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="priority" label="优先级" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="purchase_link" label="采购链接" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="with_sku_quotation"
                label="同步SKU报价"
                showSearch
                options={[
                  {
                    label: '跨境新品1',
                    value: '1',
                  },
                  {
                    label: '跨境新品2',
                    value: '2',
                  },
                ]}
                placeholder="请选择"
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

export default AddQuotation;
