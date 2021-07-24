/* eslint-disable no-plusplus */
import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import ProTable from '@ant-design/pro-table';
import { Button, Image, message, Row, Col, Modal } from 'antd';
import ProForm, {
  DrawerForm,
  ModalForm,
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import type { TableListPagination } from './data';
import type { TableListItem, EditTableItem, DataSourceType, MapTemp } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import {
  getMobileMap,
  getMobileList,
  mobileBatchStop,
  mobileBatchUpdateUser,
  getUserMap,
} from '@/services/operations-center';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';
import Recharge from './components/Recharge';
import MonthBalance from './components/MonthBalance';

const MobileList: FC = () => {
  const actionRef = useRef<ActionType>();
  const [headerTitle, setHeaderTitle] = useState<string>('汇总待充值金额:0');
  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const [modalVisit, setModalVisit] = useState(false);
  const [rechargeModalVisit, setRechargeModalVisit] = useState(false);
  const [monthlyBalance, setMonthlyBalance] = useState(false);
  const [dataSource, setDataSource] = useState<DataSourceType[]>(() => []);

  const [currentRow, setCurrentRow] = useState<Partial<TableListItem> | undefined>();

  const [multipleRow, setMultipleRow] = useState<TableListItem[]>([]);

  const defaultData: EditTableItem[] = [];
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => defaultData.map(item => item.id));
  // 筛选条件-运营商
  const [operatorOptions, setOperatorOptions] = useState<MapTemp[]>([]);
  // 筛选条件-使用类型
  const [useTypeOptions, setUseTypeOptions] = useState<MapTemp[]>([]);
  // 批量停用
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [stopUseVisible, setStopUseVisible] = useState(false);
  // 批量修改保管人
  const [keeperVisible, setKeeperVisible] = useState(false);
  // 批量修改保管人部门
  const [departmentVisible, setDepartmentVisible] = useState(false);
  // 保管人下拉框数据
  const [userOptions, setUserOptions] = useState<MapTemp[]>([]);
  // 批量停用
  const handleOk = () => {
    setConfirmLoading(true);
    const arr = [];
    for (let i = 0; i < selectedRows.length; i++) {
      arr.push(selectedRows[i].id);
    }
    mobileBatchStop({
      ids: arr.join(','),
      status: 2,
    })
      .then(res => {
        console.log(res);
        message.success('提交成功');
        setStopUseVisible(false);
        actionRef.current?.reload();
      })
      .catch(err => {
        console.error(err);
        message.error(err);
      });
  };

  const handleCancel = () => {
    setStopUseVisible(false);
  };
  const handleVisibile = (value: boolean) => {
    setRechargeModalVisit(value);
  };
  const handleRecharge = () => {
    console.log('value============父组件');
    // console.log(value);
    // setMultipleRow(value);
  };

  const handleBalanceVisibile = (values: boolean) => {
    setMonthlyBalance(values);
  };

  useEffect(() => {
    getMobileMap()
      .then(res => {
        console.log(res);
        setOperatorOptions(res.operator);
      })
      .catch(err => {
        console.log(err);
      });

    getUserMap()
      .then(res => {
        console.log(res);
        setUserOptions(res);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '月度余额凭证',
      width: 120,
      dataIndex: 'balance_file',
      search: false,
      render: (_, record) => {
        // const file = record.last_mobile_apply_recharge;
        // if (!file) {
        //   return '-';
        // }
        return <Image width={50} src={record.last_mobile_apply_recharge.balance_file} />;
      },
    },
    {
      title: '手机号',
      width: 120,
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: '保管人',
      width: 120,
      dataIndex: 'user_id',
      key: 'user_id',
      valueType: 'select',
      fieldProps: {
        options: userOptions,
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '保管人部门',
      width: 120,
      dataIndex: 'department_name',
      key: 'department_name',
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '总经办',
            value: '1',
          },
          {
            label: '综合部',
            value: '2',
          },
          {
            label: '招商组',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '月度余额',
      width: 120,
      dataIndex: 'balance',
      key: 'balance',
      search: false,
      render: (_, record) => {
        // const lastMobile = record.last_mobile_apply_recharge;
        // if (!lastMobile) {
        //   return '-';
        // }
        return record.last_mobile_apply_recharge.balance;
      },
    },
    {
      title: '充值金额申请',
      width: 120,
      dataIndex: 'allow_recharge_price',
      key: 'allow_recharge_price',
      search: false,
    },
    {
      title: '汇总待充值金额',
      width: 120,
      dataIndex: '',
      key: '',
      search: false,
    },
    {
      title: '充值金额申请时间',
      width: 140,
      dataIndex: 'create_time',
      key: 'create_time',
      search: false,
      render: (_, record) => {
        return record.last_mobile_apply_recharge.create_time;
      },
    },
    {
      title: '最近充值时间',
      width: 120,
      dataIndex: 'create_time',
      // key: 'last_recharge',
      search: false,
      render: (_, record) => {
        return record.last_recharge.create_time;
      },
    },
    {
      title: '最近充值金额',
      width: 120,
      dataIndex: 'amount',
      key: 'amount',
      search: false,
      render: (_, record) => {
        return record.last_recharge.amount;
      },
    },
    {
      title: '最近充值状态',
      width: 120,
      dataIndex: 'recharge_status',
      key: 'recharge_status',
      search: false,
      valueType: 'select',
      fieldProps: {
        options: [
          {
            label: '-',
            value: -1,
          },
          {
            label: '充值中',
            value: 0,
          },
          {
            label: '成功',
            value: 1,
          },
          {
            label: '失败',
            value: 2,
          },
          {
            label: '受理失败',
            value: 3,
          },
          {
            label: '撤销',
            value: 9,
          },
        ],
      },
    },
    {
      title: '卡类型',
      width: 120,
      dataIndex: 'card_type',
      key: 'card_type',
      search: false,
      valueEnum: {
        0: { text: '-' },
        1: { text: '公司' },
        2: { text: '个人' },
      },
    },
    {
      title: '交租日期',
      width: 120,
      dataIndex: 'monthly_rent_time',
      key: 'monthly_rent_time',
      search: false,
    },
    {
      title: '月租',
      width: 120,
      dataIndex: 'monthly_rent',
      key: 'monthly_rent',
      search: false,
    },
    {
      title: '运营商',
      width: 120,
      dataIndex: 'operator',
      key: 'operator',
      valueType: 'select',
      fieldProps: {
        options: operatorOptions,
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '使用类型',
      width: 120,
      dataIndex: 'use_type',
      key: 'use_type',
      search: false,
      valueEnum: {
        0: { text: '-' },
        1: { text: '客服' },
        2: { text: '店铺' },
        3: { text: '水军' },
        4: { text: '直播账号' },
        5: { text: '闲置' },
      },
    },
    {
      title: '套餐',
      width: 120,
      dataIndex: 'set_meal',
      key: 'set_meal',
      search: false,
    },
    {
      title: '创建人',
      width: 120,
      dataIndex: 'creator_name',
      key: 'creator_name',
      search: false,
    },
    {
      title: '更新时间',
      width: 120,
      dataIndex: 'update_time',
      key: 'update_time',
      search: false,
    },
    {
      title: '使用状态',
      width: 120,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      valueEnum: {
        1: { text: '正常' },
        2: { text: '停用' },
        10: { text: '删除' },
      },
      fieldProps: {
        options: [
          {
            label: '正常',
            value: '1',
          },
          {
            label: '停用',
            value: '2',
          },
          {
            label: '删除',
            value: '3',
          },
        ],
        showSearch: true,
        allowClear: true,
      },
    },

    {
      title: '操作',
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link key="view" to={`/operation-center/yangtao/mobile-list/view?id=${row.id}`}>
          查看
        </Link>,
        // <a
        //   key="edit"
        //   onClick={() => {
        //     // setCurrentRow(row);
        //     // console.log(currentRow);
        //     // setModalVisit(true);
        //   }}>
        //   编辑
        // </a>,
        <Link key="edit" to={`/operation-center/yangtao/mobile-list/edit?id=${row.id}`}>
          编辑
        </Link>,
        <a
          key="recharge"
          onClick={() => {
            setMultipleRow([row]);
            setRechargeModalVisit(true);
          }}>
          充值
        </a>,
      ],
    },
  ];

  useEffect(() => {
    setDataSource(selectedRows);
  }, [selectedRows]);

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
        actionRef={actionRef}
        headerTitle={headerTitle}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Link to="/operation-center/yangtao/mobile-list/create">
            <Button type="primary">新增手机号</Button>
          </Link>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        rowSelection={{
          onChange: (_, selectedRow) => {
            setSelectedRows(selectedRow);
          },
        }}
        request={getMobileList}
        // request={async (
        //   // 第一个参数 params 查询表单和 params 参数的结合
        //   // 第一个参数中一定会有 pageSize 和  current ，这两个参数是 antd 的规范
        //   params,
        // ) => {
        //   const data = await getMobileList(params);
        //   console.log(data);

        //   return {
        //     data: data.data,
        //     success: true,
        //     total: data.total,
        //   };
        // }}
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
              key="keeper"
              onClick={() => {
                setKeeperVisible(true);
              }}>
              批量修改保管人
            </Button>
            <Button
              key="department"
              onClick={() => {
                setDepartmentVisible(true);
              }}>
              批量修改保管人部门
            </Button>
            <Button
              key="balance"
              onClick={() => {
                setMonthlyBalance(true);
              }}>
              月度余额/充值金额申请
            </Button>
            <Button
              key="recharge1"
              onClick={() => {
                setMultipleRow(selectedRows);
                setRechargeModalVisit(true);
              }}>
              批量充值
            </Button>

            <Button
              key="stop"
              onClick={() => {
                setStopUseVisible(true);
              }}>
              批量停用
            </Button>
          </>
        </FooterToolbar>
      )}
      {/* <DrawerForm
        title="编辑 Publish Ebay Ad:"
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
        initialValues={{
          tel: currentRow?.tel,
          custodian_department: currentRow?.custodian_department,
          custodian: currentRow?.custodian,
          cardholder: currentRow?.cardholder,
          card_type: currentRow?.card_type,
          opened_time: currentRow?.opened_time,
          operator: currentRow?.operator,
          monthly_rent: currentRow?.monthly_rent,
          pay_date_rent: currentRow?.pay_date_rent,
          use_type: currentRow?.use_type,
          user_mode: currentRow?.user_mode,
          remark: currentRow?.remark,
        }}
        onVisibleChange={setModalVisit}>
        <Row gutter={20}>
          <Col lg={24} md={24}>
            <div className={styles.title}>手机号信息</div>
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="tel"
              label="手机号"
              placeholder="请输入"
              rules={[{ required: true, message: '手机号不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="cardholder"
              label="持卡人"
              placeholder="请输入"
              rules={[{ required: true, message: '持卡人不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="operator"
              label="运营商"
              showSearch
              options={[
                {
                  label: '电信',
                  value: '1',
                },
                {
                  label: '联通',
                  value: '2',
                },
              ]}
              placeholder="请选择"
              rules={[{ required: true, message: '运营商不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="card_type"
              label="卡类型"
              showSearch
              options={[
                {
                  label: '公司',
                  value: '1',
                },
                {
                  label: '个人',
                  value: '2',
                },
              ]}
              placeholder="请选择"
              rules={[{ required: true, message: '卡类型不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormDatePicker name="opened_time" label="开卡时间" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormDatePicker name="pay_date_rent" label="交租日期" />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText
              name="monthly_rent"
              label="月租"
              placeholder="请输入"
              rules={[{ required: true, message: '月租不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormText name="meal" label="套餐" placeholder="请输入" />
          </Col>
          <Col lg={24} md={24}>
            <div className={styles.title}>保管人信息</div>
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="custodian_department"
              label="保管人部门"
              showSearch
              options={[
                {
                  label: '洋桃',
                  value: 'yangtao',
                },
                {
                  label: '总经办',
                  value: 'all',
                },
              ]}
              placeholder="请选择"
              rules={[{ required: true, message: '保管人部门不能为空' }]}
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="custodian"
              label="保管人"
              showSearch
              options={[
                {
                  label: '张三',
                  value: '1',
                },
                {
                  label: '李四',
                  value: '2',
                },
              ]}
              placeholder="请选择"
              rules={[{ required: true, message: '保管人不能为空' }]}
            />
          </Col>

          <Col lg={12} md={24}>
            <ProFormDatePicker name="opened_time" label="开卡时间" />
          </Col>
          <Col lg={24} md={24}>
            <div className={styles.title}>使用情况</div>
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="use_type"
              label="使用类型"
              showSearch
              options={[
                {
                  label: '客服',
                  value: '1',
                },
                {
                  label: '店铺',
                  value: '2',
                },
              ]}
              placeholder="请选择"
              mode="multiple"
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormSelect
              name="user_mode"
              label="使用状态"
              showSearch
              options={[
                {
                  label: '正常',
                  value: '1',
                },
                {
                  label: '停用',
                  value: '2',
                },
              ]}
              placeholder="请选择"
              mode="multiple"
            />
          </Col>
          <Col lg={12} md={24}>
            <ProFormTextArea name="remark" label="备注" placeholder="请输入" />
          </Col>
        </Row>
      </DrawerForm> */}
      {/* 充值 */}
      <Recharge
        key="Recharge"
        visibile={rechargeModalVisit}
        handleVisibile={handleVisibile}
        handleRecharge={handleRecharge}
        multipleRow={multipleRow}
      />
      {/* 月度余额、充值金额申请 */}
      <MonthBalance visibile={monthlyBalance} data={dataSource} handleVisibile={handleBalanceVisibile} />
      {/* 批量停用 */}
      <Modal
        title={false}
        visible={stopUseVisible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}>
        <p className={styles.stopUseModal}>确定停用当前选中的手机号？</p>
      </Modal>
      {/* 批量修改保管人 */}
      <ModalForm
        title="保管人"
        visible={keeperVisible}
        layout="horizontal"
        onFinish={async values => {
          if (values.keeper) {
            const arr = [];
            for (let i = 0; i < selectedRows.length; i++) {
              arr.push(selectedRows[i].id);
            }
            mobileBatchUpdateUser({
              ids: arr.join(','),
              user_id: values.keeper,
            })
              .then(() => {
                message.success('提交成功');
                setKeeperVisible(false);
                // 刷新列表
                actionRef.current?.reload();
              })
              .catch(err => {
                message.error(err);
              });
          } else {
            message.warning('请选择保管人');
          }
        }}
        onVisibleChange={setKeeperVisible}>
        <ProFormSelect name="keeper" label="保管人" showSearch options={userOptions} placeholder="请选择" />
      </ModalForm>
      {/* 批量修改保管人部门 */}
      <ModalForm
        title="保管人部门"
        visible={departmentVisible}
        layout="horizontal"
        onFinish={async values => {
          if (values.department_id) {
            const arr = [];
            for (let i = 0; i < selectedRows.length; i++) {
              arr.push(selectedRows[i].id);
            }
            mobileBatchUpdateUser({
              ids: arr.join(','),
              user_id: values.department_id,
            })
              .then(res => {
                message.success('提交成功');
                setDepartmentVisible(false);
              })
              .catch(err => {
                message.error(err);
              });
          } else {
            message.warning('请选择保管人部门');
          }
        }}
        onVisibleChange={setDepartmentVisible}>
        <ProFormSelect
          name="department_id"
          label="保管人部门"
          showSearch
          options={[
            {
              label: '部门1',
              value: 1,
            },
            {
              label: '部门2',
              value: 2,
            },
          ]}
          placeholder="请选择"
        />
      </ModalForm>
    </PageContainer>
  );
};

export default MobileList;
