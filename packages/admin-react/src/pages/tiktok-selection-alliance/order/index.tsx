import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';

import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { Button, Select, message, Row, Col, Divider, Input } from 'antd';
import { ModalForm, ProFormTextArea } from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import type { TableListItem, TableListPagination, BatchTableItem } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getOrderList } from '@/services/tiktok';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { Option, OptGroup } = Select;

const MobileList: FC = () => {
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const [modalVisit, setModalVisit] = useState<boolean>(false);
  const [checkModalVisit, setCheckModalVisit] = useState<boolean>(false);
  const inputRef = useRef<Input | null>(null);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '平台订单ID',
      width: 120,
      dataIndex: 'platform_id',
      key: 'platform_id',
    },
    {
      title: '平台支付时间',
      width: 120,
      dataIndex: 'platform_payment_time',
      key: 'platform_payment_time',
      search: false,
    },
    {
      title: '商品ID',
      width: 120,
      dataIndex: 'product_id',
      key: 'product_id',
      hideInTable: true,
    },
    {
      title: '达人ID',
      width: 120,
      dataIndex: 'talent_id',
      key: 'talent_id',
    },
    {
      title: '商品信息',
      width: 120,
      dataIndex: 'product_info',
      key: 'product_info',
      search: false,
    },
    {
      title: '平台成交金额（元）',
      width: 120,
      dataIndex: 'turnover',
      key: 'turnover',
      search: false,
    },
    {
      title: '商品售价（元）',
      width: 120,
      dataIndex: 'price',
      key: 'price',
      search: false,
    },
    {
      title: '成交差额（元）',
      width: 120,
      dataIndex: 'transaction_balance',
      key: 'transaction_balance',
      search: false,
    },
    {
      title: '平台佣金率',
      width: 120,
      dataIndex: 'platform_commission_rate',
      key: 'platform_commission_rate',
      search: false,
    },
    {
      title: '技术服务费（元）',
      width: 120,
      dataIndex: 'technical_service_fee',
      key: 'technical_service_fee',
      search: false,
    },
    {
      title: '总佣金（元）',
      width: 120,
      dataIndex: 'total_commission',
      key: 'total_commission',
      search: false,
    },
    {
      title: '预估总佣金收入（元）',
      width: 120,
      dataIndex: 'estimate_total_commission_income',
      key: 'estimate_total_commission_income',
      search: false,
    },
    {
      title: '平台预估佣金收入（元）',
      width: 120,
      dataIndex: 'platform_estimate_commission_income',
      key: 'platform_estimate_commission_income',
      search: false,
    },
    {
      title: '平台结算佣金收入（元）',
      width: 120,
      dataIndex: 'platform_settlement_commission_income',
      key: 'platform_settlement_commission_income',
      search: false,
    },
    {
      title: '线下佣金率',
      width: 120,
      dataIndex: 'offline_commission_rate',
      key: 'offline_commission_rate',
      search: false,
    },
    {
      title: '线下预估佣金收入（元）',
      width: 120,
      dataIndex: 'offline_estimate_commission_income ',
      key: 'offline_estimate_commission_income',
      search: false,
    },
    {
      title: '线下结算佣金收入（元）',
      width: 120,
      dataIndex: 'offline_settlement_commission_income ',
      key: 'offline_settlement_commission_income',
      search: false,
    },
    {
      title: '平台结算时间',
      width: 120,
      dataIndex: 'platform_settlement_time ',
      key: 'platform_settlement_time',
      search: false,
    },
    {
      title: '平台结算时间',
      width: 120,
      dataIndex: 'platform_settlement_time ',
      key: 'platform_settlement_time',
      hideInTable: true,
      valueType: 'dateRange',
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
      title: '结款周期',
      width: 120,
      dataIndex: 'settlement_cycle',
      key: 'settlement_cycle',
      hideInTable: true,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '月结',
            value: '1',
          },
          {
            label: '半月结',
            value: '2',
          },
          {
            label: '周结',
            value: '3',
          },
        ],

        allowClear: true,
      },
    },
    {
      title: '结算类型',
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
          {
            label: '线上线下结算',
            value: '3',
          },
        ],
        allowClear: true,
      },
    },
    {
      title: '平台订单状态',
      width: 120,
      dataIndex: 'platform_order_status',
      key: 'platform_order_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '订单支付',
            value: '1',
          },
          {
            label: '订单结算',
            value: '2',
          },
          {
            label: '订单退款或退货',
            value: '3',
          },
        ],
        allowClear: true,
      },
    },
    {
      title: '平台支付时间',
      width: 120,
      dataIndex: 'platform_payment_time',
      key: 'platform_payment_time',
      hideInTable: true,
      valueType: 'dateRange',
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
      title: '整单收款状态',
      width: 120,
      dataIndex: 'whole_order_collection_status',
      key: 'whole_order_collection_status',
      fieldProps: {
        options: [
          {
            label: '已收款',
            value: '1',
          },
          {
            label: '未收款',
            value: '2',
          },
          {
            label: '部分收款',
            value: '3',
          },
        ],
        allowClear: true,
      },
    },
    {
      title: '线下结算时间',
      width: 120,
      dataIndex: 'offline_settlement_time',
      key: 'offline_settlement_time',
      search: false,
    },
    {
      title: '线下结算渠道',
      width: 120,
      dataIndex: 'offline_settlement_channel',
      key: 'offline_settlement_channel',
      search: false,
    },
    {
      title: '线下结算确认人',
      width: 120,
      dataIndex: 'offline_settlement_confirmation ',
      key: 'offline_settlement_confirmation',
      search: false,
    },
    {
      title: '产品名称',
      width: 120,
      dataIndex: 'product_name',
      key: 'product_name',
      hideInTable: true,
    },
    {
      title: '供应商名称',
      width: 120,
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },

    {
      title: '达人昵称',
      width: 120,
      dataIndex: 'talent_nickname',
      key: 'talent_nickname',
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
          {
            label: '王五',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '分成比例',
      width: 120,
      dataIndex: 'proportion',
      key: 'proportion',
      search: false,
    },
    {
      title: '操作',
      width: 100,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link to="/tiktok-selection-alliance/order/view" key="1">
          查看
        </Link>,
      ],
    },
  ];
  const columns2: ProColumns<BatchTableItem>[] = [
    {
      title: '平台订单ID',
      width: 120,
      dataIndex: 'platform_id',
      key: 'platform_id',
    },
    {
      title: '商品ID',
      width: 120,
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: '商品售价',
      width: 120,
      dataIndex: 'price',
      key: 'price',
      search: false,
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
        headerTitle="抖音精选联盟"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        rowSelection={{
          onChange: (_, selectedRows) => {
            setSelectedRows(selectedRows);
          },
        }}
        request={getOrderList}
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
            <Button
              key="1"
              onClick={() => {
                setModalVisit(true);
                console.log(selectedRows);
              }}>
              批量改价
            </Button>
            <Button
              key="2"
              onClick={() => {
                setCheckModalVisit(true);
              }}>
              线下结算初审
            </Button>
          </>
        </FooterToolbar>
      )}
      <ModalForm
        title="批量修改售价"
        visible={modalVisit}
        onFinish={async () => {
          console.log(inputRef.current?.state.value);
          message.success('提交成功');
          return true;
        }}
        onVisibleChange={setModalVisit}>
        <ProTable<BatchTableItem>
          sticky
          rowKey="platform_id"
          search={false}
          headerTitle={`共${selectedRows?.length}条数据`}
          dataSource={selectedRows}
          toolBarRender={() => [<span>批量修改价格为</span>, <Input ref={inputRef} addonAfter="元" />]}
          columns={columns2}
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
          pagination={false}
        />
      </ModalForm>

      <ModalForm
        title="线下结算初审"
        visible={checkModalVisit}
        onFinish={async () => {
          console.log(inputRef.current?.state.value);
          message.success('提交成功');
          return true;
        }}
        layout="horizontal"
        onVisibleChange={setCheckModalVisit}>
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
        <ProTable<BatchTableItem>
          sticky
          rowKey="platform_id"
          search={false}
          headerTitle={`共${selectedRows?.length}条数据`}
          dataSource={selectedRows}
          columns={columns2}
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
          pagination={false}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default MobileList;
