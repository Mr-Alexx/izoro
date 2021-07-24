import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';

import ProTable, { EditableProTable } from '@ant-design/pro-table';
import { Button, Select, message, Row, Col, Divider, Input, Form, Modal } from 'antd';
import ProForm, { ModalForm, DrawerForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';

import { debounce } from 'lodash';

import type { TableListItem, TableListPagination, MapTemp, BindphoneType } from './data';
import { Link, history } from 'umi';
import TableToolBar from '@/components/TableToolBar';

import {
  getMap,
  getShopUserManage,
  closeShopUserManage,
  mobileBatchUpdateUser,
  getBindphone,
} from '@/services/operations-center';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';

const MobileList: FC = () => {
  const [modalVisit, setModalVisit] = useState(false);
  // 当前操作行
  const [currentRow, setCurrentRow] = useState<TableListItem | undefined>();
  const [keeperModalVisit, setKeeperModalVisit] = useState(false);

  const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);

  const [confirmLoading, setConfirmLoading] = useState(false);
  const [cancelVisible, setCancelVisible] = useState(false);
  const [startVisible, setStartVisible] = useState(false);

  const [bindphone, setBindphone] = useState<BindphoneType[]>([]);

  const [accountTypeOptions, setAccountTypeOptions] = useState<MapTemp[]>([]);
  const [blueVOptions, setBlueVOptions] = useState<MapTemp[]>([]);
  const [platformOptions, setPlatformOptions] = useState<MapTemp[]>([]);
  const [statusOptions, setStatusOptions] = useState<MapTemp[]>([]);

  // 是否是批量操作
  const [isMultiple, setIsMultiple] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();

  // 对象数组去重
  const arrDistinctByProp = (arr: BindphoneType[], prop: string) => {
    return arr.filter((item, index, self) => {
      console.log(item);
      console.log(index);
      console.log(self);

      return self.findIndex(el => el[prop] == item[prop]) === index;
    });
  };

  const handleCancelOk = () => {
    const arr = [];
    setConfirmLoading(true);
    if (!isMultiple) {
      arr.push(currentRow?.id);
    } else {
      for (let i = 0; i < selectedRows.length; i++) {
        arr.push(selectedRows[i].id);
      }
    }
    closeShopUserManage(arr.join(','))
      .then(res => {
        console.log(res);
        message.success('注销成功');
        setCancelVisible(false);
        // 刷新列表
        actionRef.current?.reload();
      })
      .catch(err => {
        message.error(err);
      });
    setConfirmLoading(false);
  };

  // 启用
  const handleStartOk = () => {
    const arr = [];
    setConfirmLoading(true);
    if (!isMultiple) {
      arr.push(currentRow?.id);
    } else {
      for (let i = 0; i < selectedRows.length; i++) {
        arr.push(selectedRows[i].id);
      }
    }
    closeShopUserManage(arr.join(','))
      .then(res => {
        console.log(res);
        message.success('启用成功');
        setStartVisible(false);
        // 刷新列表
        actionRef.current?.reload();
      })
      .catch(err => {
        message.error(err);
      });
    setConfirmLoading(false);
  };
  // 筛选条件
  useEffect(() => {
    getMap()
      .then(res => {
        setAccountTypeOptions(res.account_type);
        setBlueVOptions(res.blue_v);
        setPlatformOptions(res.platform);
        setStatusOptions(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 获取手机号列表
  useEffect(() => {
    getBindphone()
      .then(res => {
        console.log(res);

        const arr = res.map(item => {
          return {
            ...item,
            value: item.label,
          };
        });
        setBindphone(arr);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '#',
      width: 80,
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
      width: 250,
      dataIndex: 'main',
      key: 'main',
      search: false,
    },
    {
      title: '账号类型',
      width: 120,
      dataIndex: 'account_type',
      key: 'account_type',
      search: false,
      valueEnum: {
        1: { text: '店铺' },
        2: { text: '公众平台订阅号' },
        3: { text: '公众平台服务号' },
      },
    },
    {
      title: '平台',
      width: 120,
      dataIndex: 'platform',
      key: 'platform',
      valueType: 'select',
      fieldProps: {
        options: platformOptions,
        showSearch: true,
        allowClear: true,
        // mode: 'multiple',
      },
    },
    {
      title: '账号名',
      width: 120,
      dataIndex: 'user_name',
      key: 'user_name',
      search: false,
    },
    {
      title: '蓝V',
      width: 120,
      dataIndex: 'blue_v',
      key: 'blue_v',
      valueType: 'select',
      fieldProps: {
        options: blueVOptions,
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '店铺账号类型',
      width: 120,
      dataIndex: 'shop_account_type',
      key: 'shop_account_type',
      search: false,
    },
    {
      title: '实名认证人',
      width: 120,
      dataIndex: 'authentication',
      key: 'authentication',
      search: false,
    },
    {
      title: '账号ID',
      width: 120,
      dataIndex: 'user_id',
      key: 'user_id',
      search: false,
    },
    {
      title: '绑定手机号',
      width: 120,
      dataIndex: 'bind_phone',
      key: 'bind_phone',
      valueType: 'select',
      fieldProps: {
        options: bindphone,
        showSearch: true,
        allowClear: true,
        mode: 'multiple',
      },
    },
    {
      title: '绑定Email',
      width: 200,
      dataIndex: 'bind_email',
      key: 'bind_email',
      search: false,
    },
    {
      title: '绑定银行卡',
      width: 250,
      dataIndex: 'bind_bank_cark',
      key: 'bind_bank_cark',
      search: false,
      ellipsis: true,
    },
    {
      title: '保证金（元）',
      width: 120,
      dataIndex: 'deposit_cash',
      key: 'deposit_cash',
      search: false,
    },
    {
      title: '账号余额（元）',
      width: 120,
      dataIndex: 'user_balance',
      key: 'user_balance',
      search: false,
    },
    {
      title: '抖币',
      width: 120,
      dataIndex: 'tiktok_coin',
      key: 'tiktok_coin',
      search: false,
    },
    {
      title: '账号保管人',
      width: 120,
      dataIndex: 'user_keeper_by',
      key: 'user_keeper_by',
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
        mode: 'multiple',
      },
    },
    {
      title: '账号状态',
      width: 120,
      dataIndex: 'status',
      key: 'status',
      valueType: 'select',
      fieldProps: {
        options: statusOptions,
        showSearch: true,
        allowClear: true,
      },
    },
    {
      title: '使用功能',
      width: 200,
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
      width: 200,
      align: 'center',
      dataIndex: 'option',
      key: 'option',
      valueType: 'option',
      fixed: 'right',
      render: (_, row, index, action) => [
        <Link key="edit" to={`/operation-center/yangtao/live-user-manage/edit?id=${row.id}`}>
          编辑
        </Link>,
        row.status === 1 && (
          <a
            key="2"
            onClick={() => {
              setCurrentRow(row);
              setIsMultiple(false);
              setCancelVisible(true);
            }}>
            注销
          </a>
        ),
        row.status === 2 && (
          <a
            key="3"
            onClick={() => {
              setCurrentRow(row);
              setIsMultiple(false);
              setStartVisible(true);
            }}>
            启用
          </a>
        ),
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
        actionRef={actionRef}
        headerTitle="视频直播管理"
        request={getShopUserManage}
        scroll={{ x: 1300 }}
        toolBarRender={() => [
          <Link key="create" to="/operation-center/yangtao/live-user-manage/create">
            <Button type="primary" key="1">
              新增账号
            </Button>
          </Link>,
          <TableToolBar columns={columns.map(v => ({ title: v.title as string, dataIndex: v.dataIndex as string }))} />,
        ]}
        rowSelection={{
          onChange: (_, selectedRow) => {
            setSelectedRows(selectedRow);
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
            <Button
              key="keeper"
              onClick={() => {
                setKeeperModalVisit(true);
              }}>
              批量修改保管人
            </Button>
            <Button
              key="cancels"
              onClick={() => {
                setIsMultiple(true);
                setCancelVisible(true);
              }}>
              批量注销
            </Button>
            <Button
              key="start"
              onClick={() => {
                setIsMultiple(true);
                setStartVisible(true);
              }}>
              批量启用
            </Button>
          </>
        </FooterToolbar>
      )}
      <DrawerForm
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
      <ModalForm
        title="保管人"
        visible={keeperModalVisit}
        layout="horizontal"
        width={400}
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
                setKeeperModalVisit(false);
              })
              .catch(err => {
                message.error(err);
              });
          } else {
            message.warning('请选择保管人');
          }
        }}
        onVisibleChange={setKeeperModalVisit}>
        <ProFormSelect
          name="keeper"
          label="保管人"
          showSearch
          options={[
            {
              label: '张三',
              value: 'yangtao',
            },
            {
              label: '李四',
              value: 'all',
            },
          ]}
          placeholder="请选择"
        />
      </ModalForm>
      {/* 注销账户 */}
      <Modal
        title={false}
        visible={cancelVisible}
        onOk={handleCancelOk}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setCancelVisible(false);
        }}>
        <p className={styles.cancelModal}>确定注销当前选中账号？</p>
      </Modal>
      {/* 启用账户 */}
      <Modal
        title={false}
        visible={startVisible}
        onOk={handleStartOk}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setStartVisible(false);
        }}>
        <p className={styles.cancelModal}>确定启用当前选中账号？</p>
      </Modal>
    </PageContainer>
  );
};

export default MobileList;
