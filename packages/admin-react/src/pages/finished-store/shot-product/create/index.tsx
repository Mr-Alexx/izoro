import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Card, Row, Col, Form, Select, Input, message } from 'antd';
import ProForm, { ProFormText, ProFormSelect } from '@ant-design/pro-form';
import type { DataSourceType } from './data';

import styles from './index.less';

import { history, Link } from 'umi';

const defaultData: DataSourceType[] = [];
// new Array(2).fill(1).map((_, index) => {
//   return {
//     id: (Date.now() + index).toString(),
//     avatar: '',
//     product_name: '',
//     products_warehouse_weight: '',
//     product_purchase_status: '',
//     sku: '',
//     quantity: 1,
//   };
// });

const ShotProductCreate: FC = () => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => defaultData.map(item => item.id));
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '主图',
      key: 'avatar',
      dataIndex: 'avatar',
      width: 120,
      editable: false,
    },
    {
      title: '产品名',
      key: 'product_name',
      dataIndex: 'product_name',
      editable: false,
    },
    {
      title: '产品入库重量',
      key: 'products_warehouse_weight',
      dataIndex: 'products_warehouse_weight',
      editable: false,
    },
    {
      title: 'sku',
      key: 'sku',
      dataIndex: 'sku',
    },
    {
      title: '数量',
      key: 'quantity',
      dataIndex: 'quantity',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];

  return (
    <PageContainer
      title={`图片需求单`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return (
              <Link to={`/finished-store/shot-product/index`}>
                <Button>返回</Button>
              </Link>
            );
          }}
        </RouteContext.Consumer>
      }>
      <Card className={styles.mt10} title="新增 捆绑信息">
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
              <ProFormSelect
                name="apply_department"
                label="申请部门"
                showSearch
                options={[
                  {
                    label: 'amazon',
                    value: '1',
                  },
                  {
                    label: 'ebay',
                    value: '2',
                  },
                ]}
                placeholder=""
                rules={[{ required: true, message: '申请部门不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="shooting_demand_no" label="拍摄需求号" placeholder="请输入" />
            </Col>

            <Col lg={12} md={24}>
              <ProFormText name="product_name" label="产品名称" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24} style={{ textAlign: 'right' }}>
              <ProFormSelect
                name="demand_sheet_type"
                label="需求单类型"
                showSearch
                options={[
                  {
                    label: '新品',
                    value: '1',
                  },
                  {
                    label: '替换',
                    value: '2',
                  },
                ]}
                placeholder=""
                rules={[{ required: true, message: '需求单类型不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="is_need_filmed"
                label="是否需要拍摄"
                showSearch
                options={[
                  {
                    label: '不拍摄',
                    value: '1',
                  },
                  {
                    label: '拍摄',
                    value: '2',
                  },
                ]}
                placeholder=""
                rules={[{ required: true, message: '是否需要拍摄不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="remark" label="备注" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="eBay_design_pick_up_person"
                label="Ebay设计接单人"
                showSearch
                options={[
                  {
                    label: '请选择',
                    value: ' ',
                  },
                  {
                    label: '小红',
                    value: '1',
                  },
                  {
                    label: '小绿',
                    value: '2',
                  },
                ]}
                placeholder=""
              />
            </Col>
            <Col lg={24} md={24}>
              <Form.Item label="绑定sku-item">
                <EditableProTable<DataSourceType>
                  headerTitle="可编辑表格"
                  columns={columns}
                  rowKey="id"
                  value={dataSource}
                  onChange={setDataSource}
                  recordCreatorProps={{
                    newRecordType: 'dataSource',
                    creatorButtonText: '添加绑定产品',
                    record: () => ({
                      id: Date.now(),
                    }),
                  }}
                  toolBarRender={() => {
                    return [
                      <Button
                        type="primary"
                        key="save"
                        onClick={() => {
                          // dataSource 就是当前数据，可以调用 api 将其保存
                          console.log(dataSource);
                        }}>
                        保存数据
                      </Button>,
                    ];
                  }}
                  editable={{
                    type: 'multiple',
                    editableKeys,
                    actionRender: (row, config, defaultDoms) => {
                      return [defaultDoms.delete];
                    },
                    onValuesChange: (record, recordList) => {
                      setDataSource(recordList);
                    },
                    onChange: setEditableRowKeys,
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default ShotProductCreate;
