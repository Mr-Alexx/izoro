import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Select } from 'antd';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { debounce } from 'lodash';
import { EyeOutlined } from '@ant-design/icons';

import type { TableListItem, TableListPagination } from './data';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getJointList } from '@/services/product';

const { Option } = Select;

const JointPeoduct: FC = () => {
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '目标产物SKU', // 标题
      width: 150, // 宽度
      dataIndex: 'target_sku', // 对应键
      key: 'target_sku', // 自定义列匹配用
    },
    {
      title: '目标产物SPU',
      width: 150,
      dataIndex: 'target_spu',
      key: 'target_spu',
    },
    {
      title: '主图',
      width: 100,
      dataIndex: 'avatar',
      key: 'avatar',
      search: false,
      valueType: 'avatar',
    },
    {
      title: '目标产物',
      width: 200,
      dataIndex: 'target_product',
      key: 'target_product',
      search: false,
      ellipsis: true,
    },
    {
      title: '数量',
      width: 100,
      dataIndex: 'quantity',
      key: 'quantity',
      search: false,
    },
    {
      title: '加工名称',
      width: 200,
      dataIndex: 'processing_name',
      key: 'processing_name',
      search: false,
    },
    {
      title: '仓库',
      width: 200,
      dataIndex: 'warehouse',
      key: 'warehouse',
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建人',
      width: 120,
      dataIndex: 'creater',
      key: 'creater',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '罗燕梅(kelly)',
            value: '1',
          },
          {
            label: '林超(Fansure)',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'created_at',
      key: 'created_at',
      hideInSearch: true,
    },
    {
      title: '创建时间',
      width: 150,
      dataIndex: 'created_at',
      key: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: value => {
          return {
            startTime: value[0],
            endTime: value[1],
          };
        },
      },
    },
    {
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option1',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to="/finished-store/bundle-joint-product/view-product-joint">查看</Link>,
      ],
    },
  ];
  return (
    <PageContainer>
      <ProTable<TableListItem, TableListPagination>
        sticky
        headerTitle="组合商品"
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Link to="/finished-store/bundle-joint-product/new-processing">
            <Button type="primary">新增加工</Button>
          </Link>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        columns={columns}
        request={getJointList}
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

export default JointPeoduct;
