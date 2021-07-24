import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';

import ProTable, { TableDropdown } from '@ant-design/pro-table';
import { Button, Select, message, Row, Col, Divider, Input } from 'antd';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import type { TableListItem, TableListPagination } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getSupplierList } from '@/services/tiktok';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { Option } = Select;

const SupplierList: FC = () => {
  // @ts-ignore
  const handleMenuClick = key => {
    console.log(key);
  };
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '供应商ID',
      width: 120,
      dataIndex: 'supplier_id',
      key: 'supplier_id',
    },
    {
      title: '供应商名称',
      width: 250,
      dataIndex: 'supplier_name',
      key: 'supplier_name',
      search: false,
    },
    {
      title: '供应商负责人',
      width: 120,
      dataIndex: 'supplier_leader',
      key: 'supplier_leader',
      search: false,
    },
    {
      title: '供应商联系方式',
      width: 120,
      dataIndex: 'supplier_contact_info',
      key: 'supplier_contact_info',
      search: false,
    },
    {
      title: '结款类型',
      width: 120,
      dataIndex: 'settlement_type',
      key: 'settlement_type',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '线上结算',
            value: '1',
          },
          {
            label: '线下结算',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '结款周期',
      width: 120,
      dataIndex: 'settlement_cycle',
      key: 'settlement_cycle',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '订单完结后立结',
            value: '1',
          },
          {
            label: '周结',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '供应商跟进人',
      width: 120,
      dataIndex: 'supplier_follower',
      key: 'supplier_follower',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '张三',
            value: '1',
          },
          {
            label: '李四',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '创建人',
      width: 120,
      dataIndex: 'creater',
      key: 'creater',
      search: false,
    },
    {
      title: '创建时间',
      width: 120,
      dataIndex: 'created_at',
      key: 'created_at',
      search: false,
    },
    {
      title: '操作',
      width: 150,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to={`/tiktok-selection-alliance/supplier/view?supplierId=${row.supplier_id}`} key="1">
          查看
        </Link>,
        <Link to="" key="2">
          编辑
        </Link>,
        <TableDropdown key="more" onSelect={handleMenuClick} menus={[{ key: 'add', name: '添加商品' }]} />,
      ],
    },
  ];
  return (
    <PageContainer
      header={{
        breadcrumb: {},
      }}>
      <ProTable<TableListItem, TableListPagination>
        sticky
        rowKey="platform_id"
        search={{
          labelWidth: 120,
        }}
        headerTitle="供应商管理"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        request={getSupplierList}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />
    </PageContainer>
  );
};

export default SupplierList;
