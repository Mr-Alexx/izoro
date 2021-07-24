import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Button, Select, message, Row, Col, Card, Input, Form, Space } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';

import { Link, history } from 'umi';
import styles from './index.less';
import Upload from '@/components/Upload';

const { Option } = Select;

interface productType {
  product_id: string;
  price: string;
  product_cate: string;
  settlement_type: string;
  settlement_cycle: string;
  offline_commission_rate: string;
}

const AddSupplier: FC = () => {
  const obj: productType = {
    product_id: '',
    price: '',
    product_cate: '',
    settlement_type: '',
    settlement_cycle: '',
    offline_commission_rate: '',
  };
  const [productList, setProductList] = useState<productType[]>([obj]);
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <Card title="供应商信息">
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={6} md={24}>
              <Form.Item label="供应商名称">服饰加工厂</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="供应商负责人">小红</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="供应商联系方式">18856965412</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="供应商跟进人">小绿</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="供应商跟进人" name="supplier-follower">
                <Input.TextArea />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title="添加商品"
        style={{ marginTop: 20 }}
        extra={
          <Button
            size="small"
            onClick={() => {
              const arr: productType[] = productList;
              arr.push(obj);
              setProductList(arr);
              console.log(productList);
            }}>
            添加商品
          </Button>
        }>
        <ProForm layout="horizontal" className={`${styles.form} ${styles.productInfo}`} submitter={false}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <ProFormText
                name="product_id"
                label="商品ID"
                placeholder="请输入商品ID"
                rules={[{ required: true, message: '商品ID不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item name="price" label="商品售价" rules={[{ required: true, message: '商品售价不能为空' }]}>
                <Input addonAfter="元" placeholder="请输入商品售价" />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="product_cate"
                label="商品分类"
                rules={[
                  {
                    required: true,
                    message: '商品分类不能为空',
                  },
                ]}
                options={[
                  {
                    label: '玩具',
                    value: '1',
                  },
                  {
                    label: '家居',
                    value: '2',
                  },
                ]}
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
              <Form.Item label="是否使用抖音佣金">使用</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item
                label="线下佣金率"
                name="offline_commission_rate"
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
          </Row>
        </ProForm>

        <div style={{ textAlign: 'center' }}>
          <Space>
            <Button htmlType="button">保存 并 新增</Button>
            <Button type="primary" htmlType="submit">
              保存 并 返回
            </Button>
          </Space>
        </div>
      </Card>
    </PageContainer>
  );
};

export default AddSupplier;
