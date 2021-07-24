import type { FC } from 'react';
import React from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer, RouteContext } from '@ant-design/pro-layout';

import { Button, Select, Row, Col, Card, Form, Space, DatePicker } from 'antd';
import ProForm, { ModalForm, ProFormText, ProFormDateRangePicker, ProFormSelect } from '@ant-design/pro-form';

import type { ProColumns, ActionType } from '@ant-design/pro-table';

import ProTable from '@ant-design/pro-table';

import type { RechargeMoneyTableItem, BindPhoneTableItem, MobileRechargeListItem } from './data';
import { Link, history } from 'umi';
import styles from './index.less';

import { mobileView, mobileApplyRechargeList, mobileRechargeList } from '@/services/operations-center';

// DatePicker 设置为中文
import 'moment/locale/zh-cn';
import Recharge from '../components/Recharge';
import MonthBalance from '../components/MonthBalance';

const { RangePicker } = DatePicker;

const columns1: ProColumns<MobileRechargeListItem>[] = [
  {
    title: '充值时间',
    width: 120,
    dataIndex: 'create_time',
    key: 'create_time',
  },
  {
    title: '充值金额（元）',
    width: 120,
    dataIndex: 'amount',
    key: 'amount',
  },
  {
    title: '充值状态',
    width: 120,
    dataIndex: 'status',
    key: 'status',
    valueType: 'select',
    fieldProps: {
      options: [
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
          value: 4,
        },
      ],
    },
  },
  {
    title: '关联月度余额（元）',
    width: 120,
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: '关联月度余额凭证',
    width: 120,
    dataIndex: 'balance_file',
    key: 'balance_file',
  },
  {
    title: '关联充值金额申请（元）',
    width: 120,
    dataIndex: 'apply_recharge',
    key: 'apply_recharge',
  },
  {
    title: '操作充值人',
    width: 120,
    dataIndex: 'creator_name',
    key: 'creator_name',
  },
];

const columns2: ProColumns<RechargeMoneyTableItem>[] = [
  {
    title: '月度余额（元）',
    dataIndex: 'balance',
    key: 'balance',
  },
  {
    title: '月度余额凭证',
    dataIndex: 'balance_file',
    key: 'balance_file',
  },
  {
    title: '记录人',
    dataIndex: 'creator_name',
    key: 'creator_name',
  },
  {
    title: '记录时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
];

const columns3: ProColumns<RechargeMoneyTableItem>[] = [
  {
    title: '充值金额申请（元）',
    dataIndex: 'apply_recharge_price',
    key: 'apply_recharge_price',
  },
  {
    title: '申请人',
    dataIndex: 'creator_name',
    key: 'creator_name',
  },
  {
    title: '申请时间',
    dataIndex: 'create_time',
    key: 'create_time',
  },
];

const columns4: ProColumns<BindPhoneTableItem>[] = [
  {
    title: '账号类型',
    dataIndex: '',
    key: '',
  },
  {
    title: '账号关联平台',
    dataIndex: 'bind_value',
    key: 'bind_value',
  },
  {
    title: '账号名称',
    dataIndex: 'bind_name',
    key: 'bind_name',
  },
  {
    title: '绑定时间',
    dataIndex: '',
    key: '',
  },
  {
    title: '使用功能',
    dataIndex: 'remark',
    key: 'remark',
  },
];

const MobileView: FC = () => {
  const rechargeActionRef = useRef<ActionType>();
  const applyRechargeActionRef = useRef<ActionType>();
  const rechargeListActionRef = useRef<ActionType>();
  // 充值弹框
  const [rechargeModalVisit, setRechargeModalVisit] = useState(false);
  const handleVisibile = (value: boolean) => {
    setRechargeModalVisit(value);
  };
  const handleRecharge = () => {
    // console.log('value============父组件');
  };

  // 月度余额
  const [monthlyBalance, setMonthlyBalance] = useState(false);
  const [monthlyBalanceData, setMonthlyBalanceData] = useState<RechargeMoneyTableItem[]>([]);
  const handleBalanceVisibile = (values: boolean) => {
    setMonthlyBalance(values);
  };
  // 申请充值金额
  const [applyRecharge, setApplyRecharge] = useState(false);
  const [applyRechargeData, setApplyRechargeData] = useState<RechargeMoneyTableItem[]>([]);
  const handleApplyRechargeVisibile = (values: boolean) => {
    setApplyRecharge(values);
  };

  const { query = {} } = history.location;
  // 基础信息
  const [mobileInfo, setMobileInfo] = useState<OPERATION_API.MobileInfoReq>();
  // 月度余额记录日期区间
  const [rechargeRange, setRechargeRange] = useState<{
    begin: string;
    end: string;
  }>({ begin: '', end: '' });
  // 月度充值申请记录日期区间
  const [applyRechargeRange, setApplyRechargeRange] = useState<{
    begin: string;
    end: string;
  }>({ begin: '', end: '' });

  // 手机号充值列表
  const [rechargeListRange, setRechargeListRange] =
    useState<{
      begin: string;
      end: string;
    }>();
  const [rechargeStatus, setRechargeStatus] = useState<number | undefined>(undefined);
  const [totalRechargeAmount, setTotalRechargeAmount] = useState<number>(0);
  const [totalRechargeCount, setTotalRechargeCount] = useState<number>(0);
  useEffect(() => {
    if (query.id) {
      mobileView(Number(query.id))
        .then(res => {
          console.log(res);
          setMobileInfo(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query.id]);
  return (
    <PageContainer
      title={`手机号：${mobileInfo?.mobile}`}
      extra={
        <RouteContext.Consumer>
          {/* @ts-ignore */}
          {({ location }) => {
            return [
              <Link key="1" to={`/shelf/ebay/schedule/index`}>
                <Button key="back">返回</Button>
              </Link>,
            ];
          }}
        </RouteContext.Consumer>
      }>
      <Card
        title="基础信息"
        extra={
          <Link key="2" to={`/operation-center/yangtao/mobile-list/edit?id=${query.id}`}>
            <Button key="base">编辑基础信息</Button>
          </Link>
        }>
        <Form className={styles.form}>
          <Row gutter={20}>
            <Col lg={6} md={24}>
              <Form.Item label="手机号">{mobileInfo?.mobile}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="持卡人">{mobileInfo?.username}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="运营商">{mobileInfo?.operator}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="卡类型">{mobileInfo?.card_type}</Form.Item>
            </Col>

            <Col lg={6} md={24}>
              <Form.Item label="开卡日期">{mobileInfo?.open_time}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="交租日期">{mobileInfo?.monthly_rent_time}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="月租">{mobileInfo?.monthly_rent}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="使用类型">{mobileInfo?.use_type_arr?.join('、')}</Form.Item>
            </Col>

            <Col lg={6} md={24}>
              <Form.Item label="保管人">{mobileInfo?.user_id}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="保管人部门">{mobileInfo?.department_id}</Form.Item>
            </Col>
            <Col lg={6} md={24}>
              <Form.Item label="使用状态">{mobileInfo?.status}</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="套餐">{mobileInfo?.set_meal}</Form.Item>
            </Col>
            <Col lg={12} md={24}>
              <Form.Item label="备注">{mobileInfo?.remark}</Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
      <Card
        title="手机号充值信息"
        extra={
          <Button
            key="phone"
            onClick={() => {
              setRechargeModalVisit(true);
            }}>
            手机号充值
          </Button>
        }
        style={{ marginTop: 20 }}>
        <ProTable<MobileRechargeListItem>
          search={false}
          headerTitle={
            <Space>
              <span>累计充值金额：{totalRechargeAmount}元 </span>
              <span>累计充值次数：{totalRechargeCount}次</span>
            </Space>
          }
          scroll={{ x: 1300 }}
          columns={columns1}
          actionRef={rechargeListActionRef}
          request={async () => {
            const res = await mobileRechargeList({
              mobile_id: Number(query.id),
              status: rechargeStatus,
              recharge_time: rechargeListRange,
            });
            console.log(res);
            setTotalRechargeAmount(res.total_recharge_amount);
            setTotalRechargeCount(res.total_recharge_count);
            return {
              data: res.data,
              success: true,
            };
          }}
          toolBarRender={() => [
            <Space>
              充值状态
              <Select
                options={[
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
                ]}
                placeholder="请选择"
                style={{ width: 120 }}
                allowClear
                onChange={value => {
                  console.log(value);
                  setRechargeStatus(Number(value));
                  rechargeListActionRef.current?.reload();
                }}></Select>
            </Space>,
            <Space>
              日期区间
              <RangePicker
                onChange={(value, dateString) => {
                  // console.log('Selected Time: ', value);
                  console.log('Formatted Selected Time: ', dateString);
                  setRechargeListRange({
                    begin: dateString[0],
                    end: dateString[1],
                  });
                  rechargeListActionRef.current?.reload();
                }}
              />
            </Space>,
          ]}
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
        />
      </Card>
      <Row gutter={20} style={{ marginTop: 20 }}>
        <Col lg={12} md={24}>
          <Card
            title="月度余额记录"
            extra={
              <Button
                key="phone"
                onClick={() => {
                  setMonthlyBalance(true);
                }}>
                月度余额记录
              </Button>
            }>
            <ProTable<RechargeMoneyTableItem>
              actionRef={rechargeActionRef}
              search={false}
              columns={columns2}
              request={async () => {
                const res = await mobileApplyRechargeList({
                  mobile_id: Number(query.id),
                  apply_time: rechargeRange,
                  type: 1,
                });
                console.log(res);
                setMonthlyBalanceData(res);
                return {
                  data: res,
                  success: true,
                };
              }}
              toolBarRender={() => [
                <Space>
                  记录时间
                  <RangePicker
                    onChange={(value, dateString) => {
                      // console.log('Selected Time: ', value);
                      console.log('Formatted Selected Time: ', dateString);
                      setRechargeRange({
                        begin: dateString[0],
                        end: dateString[1],
                      });
                      rechargeActionRef.current?.reload();
                    }}
                  />
                </Space>,
              ]}
              options={{
                fullScreen: false,
                reload: false,
                setting: false,
                density: false,
              }}
            />
          </Card>
        </Col>
        <Col lg={12} md={24}>
          <Card
            title="充值金额申请记录"
            extra={
              <Button
                key="phone"
                onClick={() => {
                  setMonthlyBalance(true);
                }}>
                充值金额申请
              </Button>
            }>
            <Row>
              <Col flex="1 1 150px">
                <Space></Space>
              </Col>
              <Col flex="0 1 350px"></Col>
            </Row>
            <ProTable<RechargeMoneyTableItem>
              actionRef={applyRechargeActionRef}
              headerTitle={`汇总待充值金额：20元`}
              pagination={false}
              request={async () => {
                const res = await mobileApplyRechargeList({
                  mobile_id: Number(query.id),
                  apply_time: applyRechargeRange,
                  type: 2,
                });
                console.log(res);
                setApplyRechargeData(res);
                setApplyRecharge(true);
                return {
                  data: res,
                  success: true,
                };
              }}
              columns={columns3}
              search={false}
              toolBarRender={() => [
                <Space>
                  日期区间
                  <RangePicker
                    onChange={(value, dateString) => {
                      // console.log('Selected Time: ', value);
                      console.log('Formatted Selected Time: ', dateString);
                      setApplyRechargeRange({
                        begin: dateString[0],
                        end: dateString[1],
                      });
                      applyRechargeActionRef.current?.reload();
                    }}
                  />
                </Space>,
              ]}
              options={{
                fullScreen: false,
                reload: false,
                setting: false,
                density: false,
              }}
            />
          </Card>
        </Col>
      </Row>
      <Card title="手机号绑定信息" style={{ marginTop: 20 }}>
        <ProTable<BindPhoneTableItem>
          search={false}
          columns={columns4}
          dataSource={mobileInfo?.bind_info}
          options={{
            fullScreen: false,
            reload: false,
            setting: false,
            density: false,
          }}
        />
      </Card>
      {/* 充值 */}
      <Recharge
        key="Recharge"
        visibile={rechargeModalVisit}
        handleVisibile={handleVisibile}
        handleRecharge={handleRecharge}
        multipleRow={[
          {
            id: Number(query.id),
            mobile: mobileInfo?.mobile || '',
          },
        ]}
      />
      {/* 月度余额 */}
      <MonthBalance
        visibile={monthlyBalance}
        data={monthlyBalanceData.map(item => {
          return {
            id: Number(query.id),
            balance: item.balance,
            allow_recharge_price: item.apply_recharge_price,
          };
        })}
        handleVisibile={handleBalanceVisibile}
      />
      {/* 充值金额申请 */}
      <MonthBalance
        visibile={applyRecharge}
        data={applyRechargeData.map(item => {
          return {
            id: Number(query.id),
            balance: item.balance,
            allow_recharge_price: item.apply_recharge_price,
          };
        })}
        handleVisibile={handleApplyRechargeVisibile}
      />
    </PageContainer>
  );
};

export default MobileView;
