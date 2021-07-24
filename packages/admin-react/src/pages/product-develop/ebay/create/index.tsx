import type { FC } from 'react';
import { useState, useRef, useEffect } from 'react';
import { GridContent } from '@ant-design/pro-layout';
import type { ActionType } from '@ant-design/pro-table';
import { Card, Form, Input, Button, Row, Col, Image, TreeSelect, Space } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import ProForm, { ProFormText, ProFormSelect, ProFormRadio, ProFormDigit, ProFormTextArea } from '@ant-design/pro-form';
import { debounce } from 'lodash';
import styles from './index.less';
import { Link } from 'umi';
import Tags from '../components/tags';
import SkuCreator from '@/components/SkuCreator';
import AppPageContainer from '@/components/AppPageContainer';

const { Search } = Input;

interface customType {
  name: string;
  value: string;
}

let tempSKus: any = [];
const CreateProduct: FC = () => {
  const actionRef = useRef<ActionType>();
  const [showBrand, setShowBrand] = useState<boolean>(false);
  // 自定义细节
  const [customDetails, setCustomDetails] = useState<customType[]>();
  const onSearch = value => console.log(value);

  const handleBrandChange = (e: any) => {
    console.log(e.target.value);
    setShowBrand(e.target.value === 1);
  };

  const [form] = Form.useForm();

  const handleChange = () => {
    form.setFieldsValue({ sights: [] });
  };

  // 商品规格属性数据
  // const [specificationData, setSpecificationData] = useState<specificationType[]>();
  // const [specificationInputValue, setSpecificationInputValue] = useState<string>('');
  // const [inputValue, setInputValue] = useState<string>('');
  // const saveInputRef = useRef<Input | null>(null);
  // const [dataSource, setDataSource] = useState<TableListItem[]>([]);

  return (
    <ProForm
      layout="horizontal"
      labelCol={{
        md: { span: 24 },
        lg: { span: 6 },
      }}
      initialValues={{
        brandRadio: 2,
        liquid: 1,
        powder: 1,
        battery: 1,
        pasty_fluid: 1,
        replica: 1,
        magnetic: 1,
        human_contact: 1,
      }}
      submitter={false}
      onChange={value => {
        console.log(value);
      }}>
      <AppPageContainer
        title="eBay 商品开发"
        className="has-anchor-tabs"
        footer={[
          <Link key="back" to={`/product-develop/ebay/index`}>
            <Button>返回</Button>
          </Link>,
          <Button key="3">存草稿</Button>,
          <Button key="2" type="primary">
            保存
          </Button>,
        ]}
        back
        extra={[<span key="1">test1</span>, <span key="2">test2</span>]}
        anchor={{
          list: ['基础信息', '图文信息', '商品规格', '物流信息'],
        }}>
        <GridContent>
          <Card bodyStyle={{ background: '#F8F9FA', paddingBottom: 0 }} bordered={false}>
            <Row>
              <Col lg={24} md={24}>
                <Form.Item
                  labelCol={{
                    md: { span: 24 },
                    lg: { span: 3 },
                  }}
                  name="item_id"
                  label="平台 ItemID">
                  <Search
                    placeholder="input search text"
                    allowClear
                    enterButton="拉取信息"
                    size="middle"
                    onSearch={onSearch}
                    style={{ minWidth: '300px' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Card style={{ marginBottom: 24 }} bordered={false}>
            <div id="基础信息" className={styles.title}>
              基础信息
            </div>

            <Row gutter={16}>
              <Col lg={12} md={24}>
                <ProFormSelect
                  name="country"
                  label="国家"
                  showSearch
                  options={[
                    {
                      label: '请选择',
                      value: '',
                    },
                    {
                      label: '澳大利亚',
                      value: '1',
                    },
                    {
                      label: '德国',
                      value: '2',
                    },
                    {
                      label: '英国',
                      value: '3',
                    },
                  ]}
                  placeholder="请选择"
                />
              </Col>
              <Col lg={12} md={24}>
                <Form.Item name="erp_product_category" label="ERP商品分类">
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
              <Col lg={24} md={24}>
                <Form.Item
                  name="product_name"
                  label="商品名称"
                  labelCol={{
                    md: { span: 24 },
                    lg: { span: 3 },
                  }}>
                  <Search allowClear enterButton="翻译中文" size="middle" onSearch={onSearch} />
                </Form.Item>
              </Col>
              <Col lg={24} md={24}>
                <ProFormText
                  labelCol={{
                    md: { span: 24 },
                    lg: { span: 3 },
                  }}
                  name="product_chinese_name"
                  label="商品中文名"
                  placeholder="请输入商品中文名"
                />
              </Col>
              <Col lg={12} md={24}>
                <Form.Item name="product_name" label="商品图">
                  <div className={styles.productImgBox}>
                    <Image
                      width={80}
                      src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                    />
                    {/* <div className={styles.box}></div> */}
                    <span style={{ width: 10 }}></span>
                    <Input.TextArea />
                  </div>
                </Form.Item>
              </Col>
              <Col lg={12} md={24}>
                <Form.Item name="keywords" label="关键词" rules={[{ required: true, message: '关键词不能为空!' }]}>
                  <div className={styles.box}>
                    <Tags />
                  </div>
                </Form.Item>
              </Col>
              <Col lg={12} md={24}>
                <ProFormText name="seller" label="卖家" />
              </Col>
              <Col lg={12} md={24}>
                <ProFormDigit
                  label="首页同款最低价"
                  name="lowest_price-number"
                  min={0}
                  rules={[{ required: true, message: '首页同款最低价不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormDigit
                  label="对手销量"
                  name="rival_sales-number"
                  min={0}
                  rules={[{ required: true, message: '对手销量不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormDigit
                  label="对手销售额"
                  name="rival_sales_money-number"
                  min={0}
                  rules={[{ required: true, message: '对手销售额不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormText name="platform_category1" label="平台分类ID一" />
              </Col>
              <Col lg={12} md={24}>
                <ProFormText name="platform_category2" label="平台分类ID二" />
              </Col>
              <Col lg={12} md={24}>
                <ProFormText name="tank_gauge_number" label="箱规数量" />
              </Col>
              <Col lg={12} md={24}>
                <ProFormText name="upc" label="物品详情(UPC)" />
              </Col>
              <Col lg={12} md={24}>
                <ProFormSelect
                  name="product_developer"
                  label="产品开发人"
                  showSearch
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
                  placeholder="请选择"
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormSelect
                  name="clue_giver"
                  label="线索提供人"
                  showSearch
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
                  placeholder="请选择"
                />
              </Col>
              <Col lg={24} md={24}>
                <ProFormTextArea
                  labelCol={{
                    md: { span: 24 },
                    lg: { span: 3 },
                  }}
                  name="remark"
                  label="备注"
                />
              </Col>
              <Col lg={12} md={24}>
                <Form.Item label="自定义名称">
                  <Form.List name="sights">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(field => (
                          <Space key={field.key} align="baseline">
                            <Form.Item
                              noStyle
                              shouldUpdate={(prevValues, curValues) =>
                                prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                              }>
                              {() => (
                                <Form.Item
                                  {...field}
                                  name={[field.name, 'sight']}
                                  fieldKey={[field.fieldKey, 'sight']}
                                  rules={[{ required: true, message: 'Missing sight' }]}>
                                  <Input placeholder="请输入名称" />
                                </Form.Item>
                              )}
                            </Form.Item>
                            <Form.Item
                              {...field}
                              name={[field.name, 'price']}
                              fieldKey={[field.fieldKey, 'price']}
                              rules={[{ required: true, message: 'Missing price' }]}>
                              <Input placeholder="请输入值" />
                            </Form.Item>

                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                          </Space>
                        ))}

                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                            添加自定义细节
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Form.Item>
              </Col>

              <Col lg={24} md={24}>
                <ProFormRadio.Group
                  labelCol={{
                    md: { span: 24 },
                    lg: { span: 3 },
                  }}
                  name="brandRadio"
                  label="是否有品牌"
                  options={[
                    {
                      label: '是',
                      value: 1,
                    },
                    {
                      label: '否',
                      value: 2,
                    },
                  ]}
                  rules={[{ required: true, message: '是否有品牌不能为空!' }]}
                  fieldProps={{
                    onChange: handleBrandChange,
                  }}
                />
              </Col>
              {showBrand && (
                <Col lg={24} md={24}>
                  <Form.Item
                    name="brand"
                    labelCol={{
                      md: { span: 24 },
                      lg: { span: 3 },
                    }}
                    colon={false}
                    label="&nbsp;">
                    <Row gutter={20} style={{ paddingTop: '20px', background: '#F8F9FA' }}>
                      <Col lg={12} md={24}>
                        <ProFormText
                          name="brand_name"
                          label="品牌名称"
                          rules={[{ required: true, message: '品牌名称不能为空!' }]}
                        />
                      </Col>
                      <Col lg={12} md={24}>
                        <ProFormText name="model" label="型号" rules={[{ required: true, message: '型号不能为空!' }]} />
                      </Col>
                    </Row>
                  </Form.Item>
                </Col>
              )}
            </Row>
          </Card>
          <Card style={{ marginBottom: 24 }} bordered={false}>
            <div id="商品规格" className={styles.title}>
              商品规格
            </div>
            <SkuCreator
              onChange={skus => {
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                tempSKus = skus;
              }}
              skus={[]}
            />
          </Card>
          <Card style={{ marginBottom: 24 }} bordered={false}>
            <div id="物流信息" className={styles.title}>
              物流信息
            </div>

            <Row gutter={16}>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="liquid"
                  label="液体"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '液体不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="powder"
                  label="粉末"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '粉末不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="battery"
                  label="带电池"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '带电池不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="pasty_fluid"
                  label="膏体"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '膏体不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="replica"
                  label="仿牌"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '仿牌不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="magnetic"
                  label="带磁性"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '带磁性不能为空!' }]}
                />
              </Col>
              <Col lg={12} md={24}>
                <ProFormRadio.Group
                  name="human_contact"
                  label="人体接触类"
                  options={[
                    {
                      label: '未知',
                      value: 1,
                    },
                    {
                      label: '是',
                      value: 2,
                    },
                    {
                      label: '否',
                      value: 3,
                    },
                  ]}
                  rules={[{ required: true, message: '人体接触类不能为空!' }]}
                />
              </Col>
            </Row>
          </Card>
        </GridContent>
      </AppPageContainer>
    </ProForm>
  );
};

export default CreateProduct;
