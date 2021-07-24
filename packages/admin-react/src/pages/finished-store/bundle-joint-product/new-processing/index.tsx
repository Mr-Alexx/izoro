import type { FC } from 'react';
import { useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns } from '@ant-design/pro-table';
import { EditableProTable } from '@ant-design/pro-table';
import { Button, Card, Row, Col, Form, Select, Input } from 'antd';
import type { DataSourceType } from './data';

import { history } from 'umi';

const { Option } = Select;

const defaultData: DataSourceType[] = new Array(1).fill(1).map((_, index) => {
  return {
    id: (Date.now() + index).toString(),
    avatar: '',
    product_name: '',
    products_warehouse_weight: '',
    product_purchase_status: '',
    sku: '',
    quantity: 1,
  };
});

const NewProcessing: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => defaultData.map(item => item.id));
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => defaultData);

  const columns: ProColumns<DataSourceType>[] = [
    {
      title: '主图',
      key: 'avatar',
      dataIndex: 'avatar',
      width: '30%',
      editable: false,
    },
    {
      title: '产品名',
      key: 'product_name',
      dataIndex: 'product_name',
      editable: false,
    },
    {
      title: 'spu',
      key: 'spu',
      dataIndex: 'spu',
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
      title: '加工名称(原料方式)',
      key: 'processing_name',
      dataIndex: 'processing_name',
      valueType: 'select',
    },
    {
      title: '仓库',
      key: 'warehouse',
      dataIndex: 'warehouse',
      valueType: 'select',
    },
  ];
  return (
    <PageContainer>
      <div>
        <Button
          onClick={() => {
            history.goBack();
          }}>
          返回
        </Button>
      </div>
      <Card style={{ marginTop: '10px' }} title="新增 产品自加工">
        <Form name="basic" initialValues={{}} onFinish={onFinish} onFinishFailed={onFinishFailed}>
          <Row gutter={20}>
            <Col lg={24} md={24}>
              <Form.Item label="绑定sku-item">
                <EditableProTable<DataSourceType>
                  headerTitle="新增 产品自加工"
                  columns={columns}
                  rowKey="id"
                  value={dataSource}
                  onChange={setDataSource}
                  recordCreatorProps={false}
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
        </Form>
      </Card>
    </PageContainer>
  );
};

export default NewProcessing;
