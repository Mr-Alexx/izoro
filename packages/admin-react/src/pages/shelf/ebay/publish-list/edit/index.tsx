import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { PageContainer } from '@ant-design/pro-layout';
import { Card, Form, Row, Col, Divider, message, Input, Button, Checkbox, Space } from 'antd';
import ProForm, {
  ProFormText,
  ProFormSelect,
  ProFormRadio,
  ProFormDigit,
  ProFormDateTimePicker,
} from '@ant-design/pro-form';

import { EditableProTable } from '@ant-design/pro-table';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import styles from './index.less';
import { history } from 'umi';
import type { GoodsDetailType, TransportMode, GoodsDetailType2 } from './data';
import Upload from '@/components/Upload';
import Editor from '@/components/Editor';

import ChooseImage from '@/components/ChooseImage';
import 'moment/locale/zh-cn';

const PublishListView: FC = () => {
  const columns1: ProColumns<GoodsDetailType>[] = [
    {
      title: '名称',
      render: _ => <span>名称</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 80,
    },
    {
      title: '名称',
      key: 'name',
      dataIndex: 'name',
    },
    {
      title: '值',
      render: _ => <span>值</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 80,
    },
    {
      title: '值1',
      dataIndex: 'value1',
      key: 'value1',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '未解决',
            value: '1',
          },
          {
            label: '已解决',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '值2',
      dataIndex: 'value2',
      key: 'value2',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ];
  const columns2: ProColumns<TransportMode>[] = [
    {
      title: '国内运输方式',
      render: _ => <span>国内运输方式</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 120,
    },
    {
      title: '国内运输方式',
      dataIndex: 'domestic_transport_mode',
      key: 'domestic_transport_mode',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '未解决',
            value: '1',
          },
          {
            label: '已解决',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '运费',
      render: _ => <span>运费</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 80,
    },
    {
      title: '运费',
      dataIndex: 'freight',
      key: 'freight',
    },
    {
      title: '每件加收',
      render: _ => <span>每件加收</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 80,
    },
    {
      title: '每件加收',
      dataIndex: 'charge_per_piece',
      key: 'charge_per_piece',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ];
  const columns3: ProColumns<TransportMode>[] = [
    {
      title: '国际运输方式',
      render: _ => <span>国际运输方式</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 120,
    },
    {
      title: '国际运输方式',
      dataIndex: 'domestic_transport_mode',
      key: 'domestic_transport_mode',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '未解决',
            value: '1',
          },
          {
            label: '已解决',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '运费',
      render: _ => <span>运费</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 80,
    },
    {
      title: '运费',
      dataIndex: 'freight',
      key: 'freight',
    },
    {
      title: '每件加收',
      render: _ => <span>每件加收</span>,
      editable: (text, record, index) => {
        return false;
      },
      width: 80,
    },
    {
      title: '每件加收',
      dataIndex: 'charge_per_piece',
      key: 'charge_per_piece',
    },
    {
      title: '操作',
      valueType: 'option',
    },
  ];
  const columns4: ProColumns<GoodsDetailType2>[] = [
    {
      title: '活动名称',
      dataIndex: 'avatar',
      valueType: 'image',
    },
    {
      title: 'SKU',
      dataIndex: 'sku',
    },
    {
      title: 'Set of',
      dataIndex: 'set_of',
    },
    {
      title: 'upc',
      dataIndex: 'upc',
    },
    {
      title: 'ean',
      dataIndex: 'ean',
    },
    {
      title: '销售数量',
      dataIndex: 'sales_num',
    },
    {
      title: '关键词',
      dataIndex: 'keyword',
    },
  ];
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);

  const [title, setTitle] = useState<string>('');
  // const [id, setId] = useState<string | undefined>('');

  const quickSendGoods = (e: { target: { checked: any } }) => {
    console.log(`checked = ${e.target.checked}`);
  };

  const getFileList = (val: any[]) => {
    console.log('==============子组件的值');
    console.log(val);
  };

  return (
    <PageContainer header={{ breadcrumb: {} }}>
      <Card title={title} style={{ marginTop: 10 }}>
        <div className={styles.tips}>如果当前上架状态是上架会实时推送eBay，否则只保存数据</div>
        <div className={styles.currentSite}>当前站点为：澳大利亚</div>
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
              <ProFormSelect
                name="shop_name"
                label="店铺"
                showSearch
                rules={[{ required: true, message: '店铺不能为空' }]}
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '店铺1',
                  },
                  {
                    value: '2',
                    label: '店铺2',
                  },
                  {
                    value: '3',
                    label: '店铺3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="currency"
                label="币种"
                showSearch
                rules={[{ required: true, message: '店铺不能为空' }]}
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '币种1',
                  },
                  {
                    value: '2',
                    label: '币种2',
                  },
                  {
                    value: '3',
                    label: '币种3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="标题" name="title">
                <Input.TextArea showCount maxLength={80} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="子标题" name="second_title">
                <Input.TextArea showCount maxLength={55} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Row gutter={8}>
                <Col span={12}>
                  <ProFormText name="main_category" label="主要类别" placeholder="请输入" />
                </Col>
                <Col span={12}>
                  <span>分类说明文字</span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={24}>
              <Row gutter={8}>
                <Col span={12}>
                  <ProFormText name="second_category" label="ebay-主要类别" placeholder="请输入" />
                </Col>
                <Col span={12}>
                  <span>分类说明文字</span>
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="shop_main_category"
                label="商店-主类别"
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '商店1',
                  },
                  {
                    value: '2',
                    label: '商店2',
                  },
                  {
                    value: '3',
                    label: '商店3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="shop_second_category"
                label="商店-第二类别"
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '商店1',
                  },
                  {
                    value: '2',
                    label: '商店2',
                  },
                  {
                    value: '3',
                    label: '商店3',
                  },
                ]}
              />
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">listing</Divider>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="hit_counter"
                label="Hit Counter"
                showSearch
                options={[
                  {
                    value: '1',
                    label: 'BasicStyle商店1',
                  },
                  {
                    value: '2',
                    label: 'CustomCode',
                  },
                  {
                    value: '3',
                    label: 'GreenLED',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="item_condition"
                label="物品状态"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '物品状态1',
                  },
                  {
                    value: '2',
                    label: '物品状态2',
                  },
                  {
                    value: '3',
                    label: '物品状态3',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="condition_stub" label="条件说明" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="time_duration"
                label="持续时间"
                showSearch
                options={[
                  {
                    value: '1',
                    label: 'Days_1',
                  },
                  {
                    value: '2',
                    label: 'Days_1',
                  },
                  {
                    value: '3',
                    label: 'Days_1',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="publish_way"
                label="刊登方式"
                showSearch
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
            {/* 刊登方式为一口价时显示，多属性时不显示 */}
            <Col lg={24} md={24}>
              <Row gutter={8}>
                <Col span={6}>
                  <ProFormText name="stock_shelves" label="上架库存" placeholder="请输入" />
                </Col>
                <Col span={6}>
                  <ProFormText name="price" label="价格" placeholder="请输入" />
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="allowable_best"
                label="允许最优惠"
                options={[
                  {
                    label: '是',
                    value: '1',
                  },
                  {
                    label: '否',
                    value: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <Row gutter={8}>
                <Col span={12}>
                  <ProFormText name="auto_accept" label="Auto accept..." placeholder="请输入" />
                </Col>
                <Col span={12}>
                  <ProFormText name="auto_declin" label="Auto declin..." placeholder="请输入" />
                </Col>
              </Row>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="rate_tables_domestic"
                label="Rate Tables Domestic"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '500g-100k',
                  },
                  {
                    value: '2',
                    label: '1kg-5kg',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <Button type="primary">添加物品详情</Button>
            </Col>
            <Col lg={24} md={24}>
              <ProForm.Item trigger="onValuesChange" name="goodsDetail">
                <EditableProTable<GoodsDetailType>
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns1}
                  showHeader={false}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加物品详情',
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
              <Divider orientation="left">付款方式</Divider>
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="account"
                label="账号"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '1',
                    label: '账号1',
                  },
                  {
                    value: '2',
                    label: '账号2',
                  },
                ]}
              />
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">物品所在地</Divider>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="country"
                label="国家"
                showSearch
                options={[
                  {
                    value: '1',
                    label: '南极洲',
                  },
                  {
                    value: '2',
                    label: '澳大利亚',
                  },
                  {
                    value: '3',
                    label: '贝宁',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="goods_ocation" label="物品所在地" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="postcode" label="邮编" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">退货政策</Divider>
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="domestic_support_return"
                label="国内支持退货"
                options={[
                  {
                    label: '是',
                    value: '1',
                  },
                  {
                    label: '否',
                    value: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="domestic_return_days"
                label="国内退货天数"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '2',
                    label: 'Day1',
                  },
                  {
                    value: '3',
                    label: 'Day2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="domestic_return_freight_bearer"
                label="国内退货运费承担方"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '2',
                    label: 'Seller',
                  },
                  {
                    value: '3',
                    label: 'Buyer',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="domestic_return_method"
                label="国内退货方式"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '2',
                    label: 'Money Back',
                  },
                  {
                    value: '3',
                    label: 'glyphicon glyphicon-ok check-mark',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormRadio.Group
                name="international_support_return"
                label="国际支持退货"
                options={[
                  {
                    label: '是',
                    value: '1',
                  },
                  {
                    label: '否',
                    value: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="international_return_days"
                label="国际退货天数"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '2',
                    label: 'Day1',
                  },
                  {
                    value: '3',
                    label: 'Day2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="international_return_freight_bearer"
                label="国际退货运费承担方"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '2',
                    label: 'Seller',
                  },
                  {
                    value: '3',
                    label: 'Buyer',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="international_return_method"
                label="国际退货方式"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                  {
                    value: '2',
                    label: 'Money Back',
                  },
                  {
                    value: '3',
                    label: 'glyphicon glyphicon-ok check-mark',
                  },
                ]}
              />
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">货运方式</Divider>
            </Col>
            <Col lg={24} md={24}>
              <ProForm.Item trigger="onValuesChange" name="domestic_transport_mode">
                <EditableProTable<TransportMode>
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns2}
                  showHeader={false}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加国内运输方式',
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
              <ProForm.Item trigger="onValuesChange" name="international_transport_mode">
                <EditableProTable<TransportMode>
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns3}
                  showHeader={false}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加国际运输方式',
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
            <Col lg={12} md={24}>
              <ProFormSelect
                name="handle_time"
                label="处理时间"
                showSearch
                options={[
                  {
                    value: '0',
                    label: '0',
                  },
                  {
                    value: '1',
                    label: '1',
                  },
                  {
                    value: '2',
                    label: '2',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <Form.Item>
                <Checkbox onChange={quickSendGoods}>Checkbox</Checkbox>
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">产品详情</Divider>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="sku" label="SKU" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <Space>
                {/* 选择图片弹窗 */}
                <ChooseImage options={[]} />
                <Button type="primary" danger>
                  删除所选图片
                </Button>
              </Space>
            </Col>
            <Col lg={24} md={24}>
              <Form.Item name="img_list" label="Img List">
                <Upload handleChange={getFileList} />
              </Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item name="img_links" label="图片链接">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <ProFormText name="set_of" label="Set of" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <EditableProTable<TransportMode>
                rowKey="id"
                toolBarRender={false}
                columns={columns4}
                // recordCreatorProps={{
                //   newRecordType: 'dataSource',
                //   creatorButtonText: '添加国际运输方式',
                //   record: () => ({
                //     id: Date.now(),
                //   }),
                // }}
                editable={{
                  type: 'multiple',
                  editableKeys,
                  onChange: setEditableRowKeys,
                  actionRender: (row, _, dom) => {
                    return [dom.delete];
                  },
                }}
              />
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">上架模版</Divider>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="selese_template"
                label="选择模版"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
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
              <ProFormSelect
                name="selese_version"
                label="选择版本"
                showSearch
                options={[
                  {
                    value: '',
                    label: '请选择',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="sku2" label="SKU" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              {/* 选择图片弹窗 */}
              <ChooseImage options={[]} />
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="产品详情">
                <Editor />
              </Form.Item>
            </Col>
            <Col lg={24} md={24}>
              <Divider orientation="left">设置广告折扣</Divider>
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="promoted_listings"
                label="Promoted listings"
                showSearch
                options={[
                  {
                    value: '1',
                    label: '不设置',
                  },
                  {
                    value: '1',
                    label: '刊登后添加',
                  },
                ]}
              />
            </Col>
            <Col lg={8} md={24}>
              <ProFormDigit
                label="广告费率"
                name="advertising_rates"
                width="sm"
                min={0}
                tooltip="广告费率为空默认按建议费率上listing,广告时间若不填写则默认按上架时间"
              />
            </Col>
            <Col lg={4} md={24}>
              建议费率: 9.2
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
                showSearch
                options={[
                  {
                    value: '1',
                    label: '不设置',
                  },
                  {
                    value: '1',
                    label: '刊登后添加',
                  },
                ]}
              />
            </Col>
            <Col lg={24} md={24}>
              <ProFormSelect
                name="discount_name"
                label="折扣名称"
                showSearch
                options={[
                  {
                    value: '1',
                    label: 'test',
                  },
                  {
                    value: '1',
                    label: '3-5-10',
                  },
                ]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDateTimePicker name="start_time" label="折扣开始时间" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDateTimePicker name="end_time" label="折扣结束时间" />
            </Col>
            <Col lg={24} md={24} style={{ textAlign: 'center' }}>
              <Button type="primary" key="push">
                推送数据到eBay
              </Button>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default PublishListView;
