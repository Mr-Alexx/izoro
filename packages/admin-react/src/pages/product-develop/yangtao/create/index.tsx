import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import ProCard from '@ant-design/pro-card';
import { Form, Input, Button, Row, Col, Select, TreeSelect, Divider, Radio, Space, message } from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

import ProForm, { ProFormText, ProFormSelect, ProFormRadio, ProFormTextArea } from '@ant-design/pro-form';
import styles from './index.less';

import Iconfont from '@/components/Iconfont';
import Upload from '@/components/Upload';
import Editor from '@/components/Editor';

const { Option } = Select;
const stepList = [
  {
    name: '① 基础信息',
    id: '1',
  },
  {
    name: '② 规格属性',
    id: '2',
  },
  {
    name: '③ 报价信息',
    id: '3',
  },
  {
    name: '④ 物流信息',
    id: '4',
  },
];

const CreateProduct: FC = () => {
  const [supplierName, setSupplierName] = useState<string>('');
  const [supplierList, setSupplierList] = useState<string[]>(['jack', 'lucy']);

  const addSupplier = () => {
    setSupplierList([...supplierList, supplierName.length > 0 ? supplierName : `New item${supplierList.length}`]);
  };

  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };
  return (
    <PageContainer>
      <ProCard>
        <div className={`${styles.flex} ${styles.alignCenter} ${styles.stepBox}`}>
          {stepList.map((v, index) => {
            return (
              <div className={`${styles.flex1} ${styles.stepItem}`} key={v.id}>
                {index > 0 && (
                  <i>
                    <Iconfont type="icon-angle-right" />
                  </i>
                )}
                <span>{v.name}</span>
              </div>
            );
          })}
        </div>
        <ProForm
          submitter={false}
          className={styles.form}
          layout="horizontal"
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col lg={24} md={24}>
              <div className={styles.title}>基础信息</div>
            </Col>

            <Col lg={12} md={24}>
              <Form.Item name="product_category" label="商品分类">
                <TreeSelect
                  treeData={[
                    {
                      title: '玩具&游戏',
                      value: '1',
                      children: [
                        { title: '遥控玩具', value: '1-1', children: [{ title: '遥控飞机', value: '1-1-1' }] },
                      ],
                    },
                  ]}
                />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="attribute_template"
                label="季节"
                mode="multiple"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: '',
                  },
                  {
                    label: '春季',
                    value: '1',
                  },
                  {
                    label: '夏季',
                    value: '2',
                  },
                  {
                    label: '秋季',
                    value: '3',
                  },
                  {
                    label: '冬季',
                    value: '3',
                  },
                ]}
                placeholder="请选择"
              />
            </Col>

            <Col lg={24} md={24}>
              <Form.Item label="产品名称" name="product_name">
                <Input.TextArea maxLength={80} showCount />
              </Form.Item>
            </Col>

            <Col lg={12} md={24}>
              <Form.Item label="净重" name="suttle">
                <Input addonAfter="kg" />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="净值尺寸（CM）">
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
            <Col lg={12} md={24}>
              <ProFormText name="product_material" label="商品材质" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <ProFormTextArea name="quality_standard" label="质检标准" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>图文信息</div>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="主图">
                <Upload
                  list={[
                    {
                      uid: '-1',
                      name: 'image.png',
                      status: 'done',
                      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    },
                  ]}
                  handleChange={getFileList}
                />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="商品详情">
                <Editor />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>报价信息</div>
            </Col>

            <Col lg={12} md={24}>
              <Form.Item label="供应商" name="supplier" rules={[{ required: true, message: '请选择供应商' }]}>
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
              <Form.Item label="发票类型">增值税专用发票 ｜ 税率：13%</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="procure_method"
                label="采购方式"
                rules={[{ required: true, message: '采购方式不能为空' }]}
                showSearch
                options={[
                  {
                    label: '供应商1',
                    value: '1',
                  },
                  {
                    label: '供应商2',
                    value: '2',
                  },
                  {
                    label: '供应商3',
                    value: '3',
                  },
                ]}
                placeholder="请选择"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="procure_link" label="采购链接" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item
                label="采购含税价"
                name="purchase_price_includes_tax"
                rules={[{ required: true, message: '采购含税价不能为空' }]}>
                <Input addonAfter="元" allowClear />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item
                label="采购不含税价"
                name="purchase_price_exclusive_tax"
                rules={[{ required: true, message: '采购不含税价不能为空' }]}>
                <Input addonAfter="元" allowClear />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="min_order"
                label="起购量"
                rules={[{ required: true, message: '起购量不能为空' }]}
                placeholder="请输入"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="add_order"
                label="加购量"
                rules={[{ required: true, message: '加购量不能为空' }]}
                placeholder="请输入"
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="生产周期" name="production_cycle">
                <Input addonAfter="天" allowClear />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="priority"
                label="优先级"
                showSearch
                options={[
                  {
                    label: '1',
                    value: '1',
                  },
                  {
                    label: '2',
                    value: '2',
                  },
                  {
                    label: '3',
                    value: '3',
                  },
                ]}
                placeholder="请选择"
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="重量" name="quoted_price_weight">
                <Input addonAfter="G" allowClear />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="箱规尺寸（CM）">
                <div className={styles.flex}>
                  <Form.Item name="quoted_price__length" className={styles.flex1} style={{ marginRight: '20px' }}>
                    <Input addonBefore="长" allowClear />
                  </Form.Item>
                  <Form.Item name="quoted_price__width" className={styles.flex1} style={{ marginRight: '20px' }}>
                    <Input addonBefore="宽" allowClear />
                  </Form.Item>
                  <Form.Item name="quoted_price__height" className={styles.flex1}>
                    <Input addonBefore="高" allowClear />
                  </Form.Item>
                </div>
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="备注" name="remark">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>规格属性</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="powder"
                label="粉末"
                options={[
                  {
                    label: '未知',
                    value: '1',
                  },
                  {
                    label: '是',
                    value: '2',
                  },
                  {
                    label: '否',
                    value: '3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="with_battery"
                label="带电池"
                options={[
                  {
                    label: '未知',
                    value: '1',
                  },
                  {
                    label: '是',
                    value: '2',
                  },
                  {
                    label: '否',
                    value: '3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="pasty_fluid"
                label="膏体"
                options={[
                  {
                    label: '未知',
                    value: '1',
                  },
                  {
                    label: '是',
                    value: '2',
                  },
                  {
                    label: '否',
                    value: '3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="replica"
                label="仿牌"
                options={[
                  {
                    label: '未知',
                    value: '1',
                  },
                  {
                    label: '是',
                    value: '2',
                  },
                  {
                    label: '否',
                    value: '3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="magnetic"
                label="带磁性"
                options={[
                  {
                    label: '未知',
                    value: '1',
                  },
                  {
                    label: '是',
                    value: '2',
                  },
                  {
                    label: '否',
                    value: '3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="human_contact_type"
                label="人体接触类"
                options={[
                  {
                    label: '未知',
                    value: '1',
                  },
                  {
                    label: '是',
                    value: '2',
                  },
                  {
                    label: '否',
                    value: '3',
                  },
                ]}
              />
            </Col>
          </Row>
          <Row gutter={20}>
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
      </ProCard>
    </PageContainer>
  );
};

export default CreateProduct;
