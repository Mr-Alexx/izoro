import type { FC } from 'react';
import { useState, useEffect, useRef } from 'react';

import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import ProForm, { ProFormText, ProFormSelect, ModalForm, ProFormDateTimePicker } from '@ant-design/pro-form';
import { Button, Card, Row, Col, message, Form, Input, Space, Select, Checkbox, Image, Divider } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { DeleteOutlined } from '@ant-design/icons';

import styles from './index.less';
import { Link, history } from 'umi';

import Upload from '@/components/Upload';
import Editor from '@/components/Editor';
import ChooseImage from '@/components/ChooseImage';

import type { DataSourceType, PropertyType, propsType } from './data';

const { Option } = Select;

const columns1: ProColumns<DataSourceType>[] = [
  {
    title: '名称',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: '值',
    key: 'value',
    dataIndex: 'value',
  },
  {
    title: '最多选中值',
    editable: (text, record, index) => {
      return index !== 0;
    },
    render: () => <div>()</div>,
  },
  {
    title: '选中值',
    dataIndex: 'value',
    key: 'value1',
    editable: (text, record, index) => {
      return index !== 0;
    },
  },
  {
    title: '操作',
    valueType: 'option',
  },
];

const columns2: ProColumns<PropertyType>[] = [
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: 'upc',
    key: 'upc',
    dataIndex: 'upc',
  },
  {
    title: 'ean',
    key: 'ean',
    dataIndex: 'ean',
  },
  {
    title: '关键词',
    dataIndex: 'keyword',
    key: 'keyword',
  },
];

const columns3: ProColumns<PropertyType>[] = [
  {
    title: '主图',
    dataIndex: 'avatar',
    key: 'avatar',
  },
  {
    title: 'SKU',
    dataIndex: 'sku',
    key: 'sku',
  },
  {
    title: '上架库存',
    dataIndex: 'inventory',
    key: 'inventory',
  },
  {
    title: '价格',
    key: 'price',
    dataIndex: 'price',
  },
  {
    title: 'upc',
    key: 'upc',
    dataIndex: 'upc',
  },
  {
    title: 'ean',
    key: 'ean',
    dataIndex: 'ean',
  },
  {
    title: '关键词',
    dataIndex: 'keyword',
    key: 'keyword',
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    valueType: 'option',
    fixed: 'right',
    render: (_, row, index, action) => [
      <Link to="/" key="1">
        编辑
      </Link>,
    ],
  },
];
const defaultData: DataSourceType[] = [];

const ProductList: FC<propsType> = props => {
  console.log(props);
  const { productList, handleDelete } = props;

  return (
    <div className={styles.pictureList}>
      {productList &&
        productList.map((item, index) => {
          return (
            <span key={item.value} className={styles.item}>
              <Image className={styles.picture} width={60} preview={false} src={item.url} />
              <DeleteOutlined
                className={styles.delete}
                onClick={() => {
                  handleDelete(item.value);
                }}
              />
            </span>
          );
        })}
    </div>
  );
};

const CreateProduct: FC = () => {
  const options = [
    {
      value: '1',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      label: <Image width={220} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    },
    {
      value: '2',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      label: <Image width={220} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    },
    {
      value: '3',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      label: <Image width={220} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    },
    {
      value: '4',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      label: <Image width={220} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    },
    {
      value: '5',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      label: <Image width={220} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    },
    {
      value: '6',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      label: <Image width={220} src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    },
  ];
  // const [form] = Form.useForm();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => defaultData.map(item => item.id));
  const [editableKeys2, setEditableRowKeys2] = useState<React.Key[]>(() => defaultData.map(item => item.id));
  const [editableKeys3, setEditableRowKeys3] = useState<React.Key[]>(() => defaultData.map(item => item.id));
  // const [selectPictureModalVisit, setSelectPictureModalVisit] = useState<boolean>(false);

  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };

  // const handleVisit = (val: boolean) => {
  //   console.log(val);
  //   setSelectPictureModalVisit(val);
  // };

  return (
    <PageContainer
      title={`产品新增`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to={`/shelf/ebay/product-list/index`}>
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }>
      <Card title="新增 Product List" style={{ marginTop: '10px' }}>
        <ProForm
          submitter={false}
          className={styles.form}
          layout="horizontal"
          initialValues={{
            published_types: '1',
          }}
          onFinish={async values => {
            console.log(values);
            message.success('提交成功');
          }}>
          <Row gutter={20}>
            <Col lg={12} md={24}>
              <ProFormText name="item_id" label="Item ID" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Button type="primary">获取产品资料</Button>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>产品数据</div>
            </Col>

            <Col lg={12} md={24}>
              <ProFormSelect
                name="site"
                label="站点"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '澳大利亚',
                  },
                  {
                    value: '2',
                    label: '美国',
                  },
                  {
                    value: '3',
                    label: '英国',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="shop_name" label="店铺名称" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="标题(80字符)" name="title">
                <Input.TextArea maxLength={80} />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="子标题(55字符)" name="subtitle">
                <Input.TextArea maxLength={80} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24} className={styles.col}>
              <ProFormText name="ebay_major_category" label="ebay-主要类别" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="ebay_second_category" label="ebay-第二类别" placeholder="请输入" />
            </Col>

            <Col lg={12} md={24}>
              <ProFormSelect
                name="rate_tables_domestic"
                label="Rate Tables Domestic"
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '1-2kg',
                  },
                  {
                    value: '2',
                    label: '2-3kg',
                  },
                  {
                    value: '3',
                    label: '3-4kg',
                  },
                ]}
              />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>物品详情</div>
            </Col>
            <Col lg={16} md={24}>
              <ProForm.Item trigger="onValuesChange" name="dataSource">
                <EditableProTable<DataSourceType>
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns1}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    record: () => ({
                      id: Date.now(),
                    }),
                  }}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    onChange: setEditableRowKeys,
                    actionRender: (row, _, dom) => {
                      return [dom.delete];
                    },
                  }}
                />
              </ProForm.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>模板详情</div>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="刊登模板" name="listings_template">
                <Select style={{ width: 300 }} allowClear>
                  <Option value="1">DDA</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="付款方式模板" name="title">
                <Space>
                  <Select style={{ width: 300 }} allowClear>
                    <Option value="1">宝舟5.22大PP（15.63澳币+）</Option>
                    <Option value="2">宝舟5.22小PP（15.63澳币以下 ）</Option>
                  </Select>
                  <Button type="link">新建</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="退货政策模板" name="return_policy_template">
                <Space>
                  <Select style={{ width: 300 }} allowClear>
                    <Option value="1">30 Days</Option>
                    <Option value="2">德国退货模板</Option>
                    <Option value="3">逸雅退货模板</Option>
                  </Select>
                  <Button type="link">新建</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="物品所在地模板" name="item_location_template">
                <Space>
                  <Select style={{ width: 300 }} allowClear>
                    <Option value="1">墨尔本</Option>
                    <Option value="2">悉尼</Option>
                    <Option value="3">伦敦</Option>
                  </Select>
                  <Button type="link">新建</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="买家要求模板" name="buyer_requires_template">
                <Space>
                  <Select style={{ width: 300 }} allowClear>
                    <Option value="1">墨尔本</Option>
                    <Option value="2">悉尼</Option>
                    <Option value="3">伦敦</Option>
                  </Select>
                  <Button type="link">新建</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="货运方式模板" name="mode_shipment_template">
                <Space>
                  <Select style={{ width: 300 }} allowClear>
                    <Option value="1">Domestic Shipping</Option>
                    <Option value="2">英国-运输方式（1）</Option>
                    <Option value="3">德国运输</Option>
                  </Select>
                  <Button type="link">新建</Button>
                </Space>
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>SKU</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="sku" label="SKU" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Space>
                {/* 选择图片弹窗 */}
                <ChooseImage options={options} />
                <Button type="primary" danger>
                  删除所选图片
                </Button>
              </Space>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="图片列表" name="picture_list">
                <Upload handleChange={getFileList} />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="图片链接" name="picture_link">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="published_types"
                label="刊登类型"
                options={[
                  {
                    value: '1',
                    label: '一口价',
                  },
                  {
                    value: '2',
                    label: '多属性',
                  },
                ]}
              />
            </Col>
            {/* 刊登类型为一口价时显示 */}
            <Col lg={12} md={24}>
              <ProFormText name="quantity" label="数量" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="price" label="价格" placeholder="请输入" />
            </Col>

            <Col lg={12} md={24}>
              <ProFormText name="product_name" label="产品名称" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="spu" label="SPU" placeholder="请输入" />
            </Col>
            {/* 刊登类型为多属性时显示 */}
            <Col lg={12} md={24}>
              <ProFormText name="property" label="属性" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <ProForm.Item trigger="onValuesChange" name="propertydataSource">
                <EditableProTable<DataSourceType>
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns2}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加属性模板',
                    record: () => ({
                      id: Date.now(),
                    }),
                  }}
                  editable={{
                    type: 'multiple',
                    editableKeys: editableKeys2,
                    onChange: setEditableRowKeys2,
                    actionRender: (row, _, dom) => {
                      return [dom.delete];
                    },
                  }}
                />
              </ProForm.Item>
            </Col>
            <Col lg={24} md={24}>
              <ProForm.Item trigger="onValuesChange" name="propertydataSource2">
                <EditableProTable<DataSourceType>
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns3}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加属性模板',
                    record: () => ({
                      id: Date.now(),
                    }),
                  }}
                  editable={{
                    type: 'multiple',
                    editableKeys: editableKeys3,
                    onChange: setEditableRowKeys3,
                    actionRender: (row, _, dom) => {
                      return [dom.delete];
                    },
                  }}
                />
              </ProForm.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>产品详情</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="select_template"
                label="选择模版"
                options={[
                  {
                    value: '1',
                    label: '仿旧系统上架模板',
                  },
                  {
                    value: '2',
                    label: 'tp',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect name="select_version" label="选择版本" options={[]} />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="detail_sku" label="SKU" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Space>
                {/* 选择图片弹窗 */}
                <ChooseImage options={options} />
                <Button type="primary">选择详情</Button>
              </Space>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="产品详情">
                <Editor />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>设置广告/折扣</div>
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="promoted_listings"
                label="Promoted listings"
                options={[
                  {
                    value: '1',
                    label: '不设置',
                  },
                  {
                    value: '2',
                    label: '刊登后添加',
                  },
                ]}
              />
            </Col>
            {/* 刊登后添加 */}
            <Col lg={12} md={24}>
              <ProFormText
                name="advertis_rates"
                tooltip="广告费率为空默认按建议费率上listing,广告时间若不填写则默认按上架时间"
                label="广告费率"
                placeholder="请输入"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDateTimePicker name="ad_shelf_time" label="广告上架时间" />
            </Col>
            <Col lg={24} md={24}>
              <Divider />
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="discount"
                label="折扣"
                options={[
                  {
                    value: '1',
                    label: '不设置',
                  },
                  {
                    value: '2',
                    label: '刊登后添加',
                  },
                ]}
              />
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="discount_name"
                label="折扣名称"
                tooltip=" 需要上架5分钟后的listing才能添加折扣,否则折扣将会失效(ebay有缓存),若不填写则默认上架5分钟后为添加折扣的时间"
                options={[
                  {
                    value: '1',
                    label: '3-5-10',
                  },
                  {
                    value: '2',
                    label: '7-12-20',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDateTimePicker name="discount_start_time" label="折扣开始时间" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDateTimePicker name="discount_end_time" label="折扣结束时间" />
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

export default CreateProduct;
