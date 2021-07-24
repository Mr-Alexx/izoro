import type { FC } from 'react';
import { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import { Button, Row, Col, Form, TreeSelect } from 'antd';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { ModalForm, ProFormText } from '@ant-design/pro-form';
import { getProductCategory } from '@/services/product';

import type { TableListItem, TableListPagination } from './data';

const treeData = [
  {
    title: 'Node1',
    value: '0-0',
    children: [
      {
        title: 'Child Node1',
        value: '0-0-1',
      },
      {
        title: 'Child Node2',
        value: '0-0-2',
      },
    ],
  },
  {
    title: 'Node2',
    value: '0-1',
  },
];

const ProductCategory: FC = () => {
  const [editModalVisible, updateEditModalVisible] = useState<boolean>(false);
  const [value, setValue] = useState(undefined);
  const [modalTitle, setModalTitle] = useState<string>('');
  const onChange = (data: string) => {
    console.log(data);
    setValue(value);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      editable: false,
    },
    {
      title: '产品分类',
      dataIndex: 'product_category',
      key: 'product_category',
      width: '200',
    },
    {
      title: 'Action',
      valueType: 'option',
      render: (text, record, _, action) => [
        <a
          key="editable"
          onClick={() => {
            console.log(record);
            setModalTitle('编辑产品分类');
            updateEditModalVisible(true);
          }}>
          编辑
        </a>,
      ],
    },
  ];

  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <ProTable<TableListItem, TableListPagination>
        columns={columns}
        request={getProductCategory}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 5,
        }}
        headerTitle="高级表格"
        toolBarRender={() => [
          <Button
            key="button"
            type="primary"
            onClick={() => {
              setModalTitle('新增产品分类');
              updateEditModalVisible(true);
            }}>
            新增产品分类
          </Button>,
        ]}
      />
      <ModalForm
        title={modalTitle}
        width={500}
        layout="horizontal"
        visible={editModalVisible}
        onVisibleChange={updateEditModalVisible}
        onFinish={async (): Promise<any> => {
          return new Promise(resolve => {
            setTimeout(() => resolve(true), 2000);
          });
        }}>
        <ProFormText
          name="product_category"
          label="产品分类"
          placeholder="请输入产品分类"
          rules={[{ required: true, message: '请输入产品分类' }]}
        />
        <Form.Item label="上一级分类" rules={[{ required: true, message: '请选择上一级分类' }]}>
          <TreeSelect
            showSearch
            style={{ width: '100%' }}
            treeData={treeData}
            value={value}
            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
            placeholder="Please select"
            allowClear
            treeDefaultExpandAll
            onChange={onChange}></TreeSelect>
        </Form.Item>
      </ModalForm>
    </PageContainer>
  );
};

export default ProductCategory;
