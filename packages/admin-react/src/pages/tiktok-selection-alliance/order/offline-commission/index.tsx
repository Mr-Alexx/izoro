import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';

import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { Button, Select, message, Row, Col, Modal, Input } from 'antd';
import { ModalForm, ProFormTextArea, ProFormSelect } from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import type { TableListItem, TableListPagination, BatchTableItem } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getOrderList } from '@/services/tiktok';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

const { confirm } = Modal;

const { Option, OptGroup } = Select;

const OfflineCommissionApprove: FC = () => {
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const [modalVisit, setModalVisit] = useState<boolean>(false);
  const [checkModalVisit, setCheckModalVisit] = useState<boolean>(false);
  // const inputRef = useRef<Input | null>(null);

  const showConfirm = () => {
    confirm({
      title: '确定废弃当前选中的订单？',
      onOk() {
        console.log('OK');
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

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
      width: 150,
      dataIndex: 'platform_transaction_amount',
      key: 'platform_transaction_amount',
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
      title: '技术服务费',
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
      width: 160,
      dataIndex: 'estimate_total_commission_income',
      key: 'estimate_total_commission_income',
      search: false,
    },
    {
      title: '平台预估佣金收入（元）',
      width: 170,
      dataIndex: 'platform_prepaid_commission_income',
      key: 'platform_prepaid_commission_income',
      search: false,
    },
    {
      title: '平台结算佣金收入（元）',
      width: 170,
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
      width: 170,
      dataIndex: 'estimate_commission_income_offline',
      key: 'estimate_commission_income_offline',
      search: false,
    },
    {
      title: '线下结算佣金收入（元）',
      width: 170,
      dataIndex: 'settlement_commission_income_offline',
      key: 'settlement_commission_income_offline',
      search: false,
    },
    {
      title: '平台结算时间',
      width: 120,
      dataIndex: 'platform_settlement_time',
      key: 'platform_settlement_time',
      search: false,
    },
    {
      title: '结款类型',
      width: 120,
      dataIndex: 'settlement_type',
      key: 'settlement_type',
      search: false,
    },
    {
      title: '平台订单状态',
      width: 120,
      dataIndex: 'platform_order_status',
      key: 'platform_order_status',
      search: false,
    },

    {
      title: '商品名称',
      width: 250,
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: '商品ID',
      width: 120,
      dataIndex: 'product_id',
      key: 'product_id',
    },
    {
      title: '成交金额',
      width: 120,
      dataIndex: 'turnover',
      key: 'turnover',
      search: false,
    },
    {
      title: '商品售价',
      width: 120,
      dataIndex: 'price',
      key: 'price',
      search: false,
    },
    {
      title: '成交差额',
      width: 120,
      dataIndex: 'deal_difference',
      key: 'deal_difference',
      search: false,
    },
    {
      title: '抖音佣金率',
      width: 120,
      dataIndex: 'tiktok_commission_rate',
      key: 'tiktok_commission_rate',
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
      title: '总佣金',
      width: 120,
      dataIndex: 'total_commission',
      key: 'total_commission',
      search: false,
    },
    {
      title: '技术服务费',
      width: 120,
      dataIndex: 'technical_service_fee',
      key: 'technical_service_fee',
      search: false,
    },
    {
      title: '分成比例',
      width: 120,
      dataIndex: 'proportion',
      key: 'proportion',
      search: false,
    },
    {
      title: '预估总佣金收入',
      width: 120,
      dataIndex: 'estimate_total_commission',
      key: 'estimate_total_commission',
      search: false,
    },
    {
      title: '抖音结算佣金收入-达人',
      width: 170,
      dataIndex: 'tiktok_settlement_commission_income',
      key: 'tiktok_settlement_commission_income',
      search: false,
    },
    {
      title: '线下结算佣金收入',
      width: 130,
      dataIndex: 'offline_settlement_commission_income',
      key: 'offline_settlement_commission_income',
      search: false,
    },
    {
      title: '线下结算佣金标签',
      width: 130,
      dataIndex: 'offline_settlement_commission_label',
      key: 'offline_settlement_commission_label',
      search: false,
    },
    {
      title: '线下预估佣金收入',
      width: 130,
      dataIndex: 'estimate_commission_income_offline',
      key: 'estimate_commission_income_offline',
      search: false,
    },
    {
      title: '抖音订单状态',
      width: 120,
      dataIndex: 'tiktok_order_status',
      key: 'tiktok_order_status',
      search: false,
    },
    {
      title: '整单收款状态',
      width: 120,
      dataIndex: 'whole_order_collection_status',
      key: 'whole_order_collection_status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '未收款',
            value: 'a',
          },
          {
            label: '部分收款',
            value: 'b',
          },
          {
            label: '已收款',
            value: 'c',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
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
            value: 'a',
          },
          {
            label: '李四',
            value: 'b',
          },
          {
            label: '王五',
            value: 'c',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '供应商名称',
      width: 120,
      dataIndex: 'supplier_name',
      key: 'supplier_name',
    },
    {
      title: '线下结算确认人',
      width: 120,
      dataIndex: 'offline_settlement_confirmation',
      key: 'offline_settlement_confirmation',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '张三',
            value: 'a',
          },
          {
            label: '李四',
            value: 'b',
          },
          {
            label: '王五',
            value: 'c',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '线下佣金收款状态',
      width: 160,
      dataIndex: 'offline_settlement_confirmation',
      key: 'offline_settlement_confirmation',
      search: false,
      // valueType: 'select',
      // fieldProps: {
      //   options: [
      //     {
      //       label: '未收款',
      //       value: 'a',
      //     },
      //     {
      //       label: '已收款',
      //       value: 'b',
      //     },
      //   ],
      //   showSearch: true,
      //   allowClear: true,
      // },
    },
    {
      title: '线下结算时间',
      width: 120,
      dataIndex: 'offline_settlement_time',
      key: 'offline_settlement_time',
      search: false,
    },
    {
      title: '线下结算时间',
      width: 120,
      dataIndex: 'offline_settlement_time',
      key: 'offline_settlement_time',
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
      title: '抖音预估佣金收入',
      width: 130,
      dataIndex: 'tiktok_estimates_commission_income',
      key: 'tiktok_estimates_commission_income',
      search: false,
    },
    {
      title: '抖音订单支付时间',
      width: 150,
      dataIndex: 'tiktok_order_payment_time',
      key: 'tiktok_order_payment_time',
      search: false,
    },
    {
      title: '抖音订单结算时间',
      width: 150,
      dataIndex: 'tiktok_order_settlement_time',
      key: 'tiktok_order_settlement_time',
      search: false,
    },
    {
      title: '审核状态',
      width: 120,
      dataIndex: 'approval_status',
      key: 'approval_status',
      hideInTable: true,
      valueType: 'select',
      renderFormItem: (_, { defaultRender }) => {
        return (
          <Select key="searchSelect" showSearch placeholder="请选择" allowClear mode="multiple">
            {
              <>
                <Option key="1" value="1">
                  未申请审核
                </Option>
                <Option key="2" value="2">
                  初审
                </Option>
                <Option key="3" value="3">
                  确认
                </Option>
                <Option key="4" value="4">
                  废弃
                </Option>
              </>
            }
          </Select>
        );
      },
    },
    {
      title: '初审时间',
      width: 120,
      dataIndex: 'first_time',
      key: 'first_time',
      search: false,
    },
    {
      title: '线下结算渠道',
      width: 120,
      dataIndex: 'offline_settlement_channel',
      key: 'offline_settlement_channel',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '洋桃对公建行',
            value: 'a',
          },
          {
            label: '王冬冬华夏',
            value: 'b',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '初审人',
      width: 120,
      dataIndex: 'first_person',
      key: 'first_person',
      search: false,
    },
    {
      title: '初审备注',
      width: 120,
      dataIndex: 'preliminary_remarks',
      key: 'preliminary_remarks',
      search: false,
    },
    {
      title: '收款备注',
      width: 120,
      dataIndex: 'credit_note',
      key: 'credit_note',
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
      title: '商品信息',
      width: 120,
      dataIndex: 'product_info',
      key: 'product_info',
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
      width: 160,
      dataIndex: 'estimate_commission_income_offline',
      key: 'estimate_commission_income_offline',
      search: false,
    },
    {
      title: '线下结算佣金收入（元）',
      width: 160,
      dataIndex: 'offline_settlement_commission_income',
      key: 'offline_settlement_commission_income',
      search: false,
    },
    {
      title: '供应商名称',
      width: 120,
      dataIndex: 'supplier_name',
      key: 'supplier_name',
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
              完成收款
            </Button>
            <Button
              key="2"
              onClick={() => {
                // setCheckModalVisit(true);
                showConfirm();
              }}>
              批量废弃
            </Button>
          </>
        </FooterToolbar>
      )}
      <ModalForm
        title="完成收款"
        visible={modalVisit}
        layout="horizontal"
        width={1000}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        labelCol={{ span: 3 }}
        onVisibleChange={setModalVisit}>
        <ProFormSelect
          options={[
            {
              value: 'chapter',
              label: '盖章后生效',
            },
          ]}
          width="md"
          name="offline_stage_channels"
          label="线下阶段渠道"
        />
        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
        <ProTable<BatchTableItem>
          sticky
          rowKey="platform_id"
          search={false}
          headerTitle={`共${selectedRows?.length}条数据`}
          dataSource={selectedRows}
          columns={columns2}
          scroll={{ x: 700 }}
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
          pagination={false}
        />
      </ModalForm>

      {/* <ModalForm
        title={false}
        visible={checkModalVisit}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        layout="horizontal"
        onVisibleChange={setCheckModalVisit}>
        <div>确认废弃当前选中的订单？</div>
      </ModalForm> */}
    </PageContainer>
  );
};

export default OfflineCommissionApprove;
