import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ColumnsState } from '@ant-design/pro-table';

import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { Button, Select, message, Row, Col, Divider, Input, Form } from 'antd';
import { DrawerForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import type { TableListItem, TableListPagination } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import { getEbayPublishList } from '@/services/product';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';

const { Option, OptGroup } = Select;

const MobileList: FC = () => {
  const [modalVisit, setModalVisit] = useState(false);
  const [currentRow, setCurrentRow] = useState<Partial<TableListItem> | undefined>();
  //   const [rechargeModalVisit, setRechargeModalVisit] = useState(false);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      width: 120,
      valueType: 'index',
    },
    {
      title: '关键词',
      width: 120,
      dataIndex: 'keyword',
      key: 'keyword',
      hideInTable: true,
    },
    {
      title: '主体',
      width: 120,
      dataIndex: 'subject',
      key: 'subject',
      search: false,
    },
    {
      title: '平台',
      width: 120,
      dataIndex: 'platform',
      key: 'platform',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '微信',
            value: '1',
          },
          {
            label: '淘宝',
            value: '2',
          },
          {
            label: '抖音',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '账号名',
      width: 120,
      dataIndex: 'account_name',
      key: 'account_name',
      search: false,
    },
    {
      title: '账号类型',
      width: 120,
      dataIndex: 'account_type',
      key: 'account_type',
      search: false,
    },
    {
      title: '蓝V',
      width: 120,
      dataIndex: 'blue_v',
      key: 'blue_v',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '是',
            value: '1',
          },
          {
            label: '否',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '状态',
      width: 120,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '正常',
            value: '1',
          },
          {
            label: '注销',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '实名认证',
      width: 120,
      dataIndex: 'real_name_authentication',
      key: 'real_name_authentication',
      search: false,
    },
    {
      title: '账号ID',
      width: 120,
      dataIndex: 'account_id',
      key: 'account_id',
      search: false,
    },
    {
      title: '绑定银行卡',
      width: 120,
      dataIndex: 'bind_bank_card',
      key: 'bind_bank_card',
      search: false,
    },
    {
      title: '绑定手机',
      width: 120,
      dataIndex: 'bind_phone',
      key: 'bind_phone',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '13042089114',
            value: '1',
          },
          {
            label: '13070296057',
            value: '2',
          },
        ],
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '绑定Email',
      width: 120,
      dataIndex: 'bind_email',
      key: 'bind_email',
      search: false,
    },
    {
      title: '保证金',
      width: 120,
      dataIndex: 'cash_deposit',
      key: 'cash_deposit',
      search: false,
    },
    {
      title: '账号余额',
      width: 120,
      dataIndex: 'account_balance',
      key: 'account_balance',
      search: false,
    },
    {
      title: '抖币',
      width: 120,
      dataIndex: 'shake_coin',
      key: 'shake_coin',
      search: false,
    },
    {
      title: '账号保管人',
      width: 120,
      dataIndex: 'account_keeper',
      key: 'account_keeper',
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
        mode: 'multiple',
      },
    },
    {
      title: '使用功能',
      width: 120,
      dataIndex: 'use_function',
      key: 'use_function',
      search: false,
    },
    {
      title: '备注',
      width: 120,
      dataIndex: 'remark',
      key: 'remark',
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
        <a
          onClick={() => {
            setCurrentRow(row);
            setModalVisit(true);
          }}
          key="1">
          编辑
        </a>,
        <a key="2">注销</a>,
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
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        headerTitle="视频直播管理"
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="1"
            onClick={() => {
              setModalVisit(true);
            }}>
            添加账号
          </Button>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        columns={columns}
        options={{
          fullScreen: true,
          reload: true,
          setting: true,
          density: true,
        }}
      />

      <DrawerForm
        title="编辑 Live User Manage: 1"
        visible={modalVisit}
        layout="horizontal"
        className={styles.form}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        drawerProps={{
          forceRender: true,
          destroyOnClose: true,
          placement: 'right',
        }}
        onVisibleChange={setModalVisit}>
        <Row gutter={20}>
          <Col lg={24} md={24}>
            <Divider orientation="left">基础信息</Divider>
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="subject" label="主体" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="platform"
              label="平台"
              showSearch
              options={[
                {
                  label: '微信',
                  value: 'yangtao',
                },
                {
                  label: '淘宝',
                  value: 'all',
                },
              ]}
              placeholder="请选择"
              rules={[{ required: true, message: '平台不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="account_name" label="账号名" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="real_name_authentication" label="实名认证" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="account_id" label="账号ID" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="blue_v" label="蓝V" placeholder="请输入" />
          </Col>
          <Col lg={24} md={24}>
            <Divider orientation="left">绑定信息</Divider>
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="bind_bank_card" label="绑定银行卡" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="bind_phone" label="绑定手机" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="bind_email" label="绑定Email" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="cash_deposit" label="保证金" placeholder="请输入" />
          </Col>

          <Col lg={24} md={24}>
            <Divider orientation="left">使用情况</Divider>
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="account_balance" label="账号余额" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="shake_coin" label="抖币" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="account_keeper" label="账号保管人" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="use_function" label="使用功能" placeholder="请输入" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
          </Col>
        </Row>
      </DrawerForm>
      {/* <ModalForm
        title="充值"
        visible={rechargeModalVisit}
        width="85%"
        layout="horizontal"
        className={styles.form}
        onFinish={async () => {
          message.success('提交成功');
          return true;
        }}
        onVisibleChange={setRechargeModalVisit}>
        <ProForm.Item>
          <ProFormCheckbox.Group name="recharge_money" options={['1元', '2元', '5元', '10元', '20元', '30元']} />
        </ProForm.Item>
        <ProForm.Item>
          <Divider orientation="left">充值手机号</Divider>
        </ProForm.Item>
        <ProForm.Item>
          <Input addonAfter={<CloseCircleOutlined />} style={{ width: 200 }} defaultValue="tel" />
        </ProForm.Item>
      </ModalForm> */}
    </PageContainer>
  );
};

export default MobileList;
