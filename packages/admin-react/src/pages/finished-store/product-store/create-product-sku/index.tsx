/**
 * @description 新增产品页
 */

import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Form, Input, Button, Row, Col, Select, TreeSelect, Divider, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import { history } from 'umi';
import styles from './index.less';

import Upload from '@/components/Upload';

const { Option } = Select;

const CreateProduct: FC = () => {
  const [proCardTitle, setProCardTitle] = useState<string>('新增产品');

  const [supplierName, setSupplierName] = useState<string>('');
  const [supplierList, setSupplierList] = useState<string[]>(['jack', 'lucy']);
  const addSupplier = () => {
    setSupplierList([...supplierList, supplierName.length > 0 ? supplierName : `New item${supplierList.length}`]);
  };

  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };

  // 获取路由参数
  // useEffect(() => {

  // }, [location]);

  return (
    <PageContainer>
      <div>
        <Button
          htmlType="button"
          onClick={() => {
            history.goBack();
          }}>
          返回
        </Button>
      </div>
      <ProCard title={proCardTitle} style={{ marginTop: '10px' }} headerBordered>
        <ProForm
          submitter={false}
          className={styles.form}
          initialValues={{}}
          layout="horizontal"
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <Form.Item label="SPU" name="spu" rules={[{ required: true, message: '请输入spu' }]}>
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
            {/* 编辑产品显示，新增产品不显示 */}
            <Col lg={12} md={24}>
              <ProFormText name="property" label="属性" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="product_name" label="名字" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="tank_gauge_number" label="箱规数量" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="package_quantity" label="包装数量" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="主图" name="package_quantity">
                <Upload handleChange={getFileList} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}></Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="product_developer"
                label="产品开发人"
                showSearch
                options={[
                  {
                    label: '产品开发人1',
                    value: '1',
                  },
                  {
                    label: '产品开发人2',
                    value: '2',
                  },
                  {
                    label: '产品开发人3',
                    value: '3',
                  },
                ]}
                placeholder=""
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item
                label="产品类别"
                name="product_category"
                rules={[{ required: true, message: '请选择产品类别' }]}>
                <TreeSelect
                  treeData={[{ title: 'Light', value: 'light', children: [{ title: 'Bamboo', value: 'bamboo' }] }]}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="rough_weight" label="毛重" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="quality_inspection_standard" label="质检标准" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="texture" label="材质" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="product_description" label="产品描述" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="product_usage" label="产品用途" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="suttle" label="净重" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="包装尺寸（CM）">
                <div className={styles.flex}>
                  <Form.Item name="pack_length" className={styles.flex1} style={{ marginRight: '20px' }}>
                    <Input addonBefore="长" allowClear />
                  </Form.Item>
                  <Form.Item name="pack_width" className={styles.flex1} style={{ marginRight: '20px' }}>
                    <Input addonBefore="宽" allowClear />
                  </Form.Item>
                  <Form.Item name="pack_height" className={styles.flex1}>
                    <Input addonBefore="高" allowClear />
                  </Form.Item>
                </div>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="净值尺寸(cm)">
                <div className={styles.flex}>
                  <Form.Item name="net_value_length" className={styles.flex1} style={{ marginRight: '20px' }}>
                    <Input addonBefore="长" allowClear />
                  </Form.Item>
                  <Form.Item name="net_value_width" className={styles.flex1} style={{ marginRight: '20px' }}>
                    <Input addonBefore="宽" allowClear />
                  </Form.Item>
                  <Form.Item name="net_value_height" className={styles.flex1}>
                    <Input addonBefore="高" allowClear />
                  </Form.Item>
                </div>
              </Form.Item>
            </Col>
            <Col md={24} lg={24} style={{ textAlign: 'center' }}>
              <Button type="primary" htmlType="submit">
                提交保存
              </Button>
            </Col>
          </Row>
        </ProForm>
      </ProCard>
    </PageContainer>
  );
};

export default CreateProduct;
