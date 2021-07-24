import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Button, Select, Radio } from 'antd';
import { ModalForm, ProFormSelect } from '@ant-design/pro-form';
import { debounce } from 'lodash';

import type { TableListItem, TableListPagination } from './data';
import { Link } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getShotProduct } from '@/services/product';

const { Option } = Select;

const ShotProduct: FC = () => {
  const [activekey, setActiveKey] = useState<React.Key>('1');
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      width: 60,
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '申请部门',
      width: 120,
      dataIndex: 'apply_department',
      key: 'apply_department',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: 'ebay',
            value: '1',
          },
          {
            label: 'amazon',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '拍摄需求号',
      width: 140,
      dataIndex: 'shooting_demand_no',
      key: 'shooting_demand_no',
    },
    {
      title: '产品名称',
      width: 150,
      dataIndex: 'product_name',
      key: 'product_name',
      ellipsis: true,
    },
    {
      title: 'SKU',
      width: 80,
      dataIndex: 'sku',
      key: 'sku',
    },
    {
      title: 'SPU',
      width: 80,
      dataIndex: 'spu',
      key: 'spu',
      hideInTable: true,
    },
    {
      title: '需求单类型',
      width: 120,
      dataIndex: 'demand_sheet_type',
      key: 'demand_sheet_type',
    },
    {
      title: '是否需要拍摄',
      width: 120,
      dataIndex: 'is_need_filmed',
      key: 'is_need_filmed',
    },
    {
      title: '销售跟进人',
      width: 120,
      dataIndex: 'sales_follow_up',
      key: 'sales_follow_up',
    },
    {
      title: '单据状态',
      width: 120,
      dataIndex: 'documents_state',
      key: 'documents_state',
    },
    {
      title: '创建人',
      width: 120,
      dataIndex: 'creater',
      key: 'creater',
    },
    {
      title: '验收人',
      width: 120,
      dataIndex: 'acceptor',
      key: 'acceptor',
    },
    {
      title: '拍摄人',
      width: 120,
      dataIndex: 'shoot_in',
      key: 'shoot_in',
    },
    {
      title: '设计人',
      width: 120,
      dataIndex: 'designer',
      key: 'designer',
    },
    {
      title: '设计接单确认时间',
      width: 180,
      dataIndex: 'design_order_confirm_time',
      key: 'design_order_confirm_time',
      search: false,
    },
    {
      title: '转运时间',
      width: 180,
      dataIndex: 'transit_time',
      key: 'transit_time',
      search: false,
    },

    {
      title: '设计接单超时',
      width: 120,
      dataIndex: 'design_receipt_timeout',
      key: 'design_receipt_timeout',
      search: false,
    },
    {
      title: '设计完成超时',
      width: 120,
      dataIndex: 'design_complet_timeout',
      key: 'design_complet_timeout',
      search: false,
    },

    {
      title: '预计完成时间',
      width: 180,
      dataIndex: 'estimated_completion_time',
      key: 'estimated_completion_time',
      search: false,
    },
    {
      title: 'Ebay设计接单人',
      width: 120,
      dataIndex: 'eBay_design_pick_up_person',
      key: 'eBay_design_pick_up_person',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '请选择',
            value: '',
          },
          {
            label: '小红',
            value: '1',
          },
          {
            label: '小绿',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '预计接单时间',
      width: 180,
      dataIndex: 'estimat_receiv_order_time',
      key: 'estimat_receiv_order_time',
      search: false,
    },
    {
      title: '拍摄完成时间',
      width: 180,
      dataIndex: 'shooting_completion_time',
      key: 'shooting_completion_time',
      search: false,
    },
    {
      title: '拍摄完成时间',
      width: 180,
      dataIndex: 'shooting_completion_time',
      key: 'shooting_completion_time',
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
      title: '设计完成时间',
      width: 180,
      dataIndex: 'design_completion_time',
      key: 'design_completion_time',
      search: false,
    },
    {
      title: '设计完成时间',
      width: 180,
      dataIndex: 'design_completion_time',
      key: 'design_completion_time',
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
      title: '验收完成时间',
      width: 180,
      dataIndex: 'acceptance_completion_time',
      key: 'acceptance_completion_time',
      search: false,
    },
    {
      title: '验收完成时间',
      width: 180,
      dataIndex: 'acceptance_completion_time',
      key: 'acceptance_completion_time',
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
      title: '创建时间',
      width: 180,
      dataIndex: 'created_at',
      key: 'created_at',
      search: false,
    },
    {
      title: '创建时间',
      width: 180,
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
      title: '返修时间',
      width: 120,
      dataIndex: 'repair_time',
      key: 'repair_time',
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
      title: '备注',
      width: 120,
      dataIndex: 'remark',
      key: 'remark',
      search: false,
    },
    {
      title: '拍摄图片路径',
      width: 120,
      dataIndex: 'photo_path',
      key: 'photo_path',
      search: false,
    },
    {
      title: '海运时间',
      width: 180,
      dataIndex: 'shipping_time',
      key: 'shipping_time',
      search: false,
    },
    {
      title: '操作',
      width: 120,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to="/" key="1">
          查看
        </Link>,
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
        headerTitle=""
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        request={getShotProduct}
        scroll={{ x: 1300 }}
        toolbar={{
          menu: {
            type: 'tab',
            activeKey: activekey,
            items: [
              {
                key: '0',
                label: <span>全部</span>,
              },
              {
                key: '1',
                label: <span>待确认</span>,
              },
              {
                key: '2',
                label: <span>需求确认</span>,
              },
              {
                key: '3',
                label: <span>拍摄评审</span>,
              },
            ],
            onChange: key => {
              setActiveKey(key as string);
            },
          },
        }}
        toolBarRender={() => [
          <Link to="/finished-store/shot-product/create">
            <Button type="primary">新增图片需求</Button>
          </Link>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              已选择{' '}
              <a
                style={{
                  fontWeight: 600,
                }}>
                {selectedRows.length}
              </a>{' '}
              项 &nbsp;&nbsp;
            </div>
          }>
          <>
            <Button value="1">批量下载</Button>
            <Button value="2">批量拍摄下载</Button>
            <Button value="3">批量设计下载</Button>
            <Button value="4">eBay设计配置</Button>
            <Button value="5">批量作废</Button>
          </>
        </FooterToolbar>
      )}
    </PageContainer>
  );
};

export default ShotProduct;
