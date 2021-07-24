import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';

import type { FormInstance } from 'antd';
import { Button, Card, Row, Col, Space, message } from 'antd';
import ProForm, {
  ProFormSelect,
  ProFormText,
  ProFormDatePicker,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-form';

import { Link, history } from 'umi';

import {
  getBindphone,
  createShopUserManage,
  updateShopUserManage,
  getMap,
  shopUserManageView,
} from '@/services/operations-center';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';
import { OPERATION_TEXT } from '@/constants';
import { Item } from 'gg-editor';

type MapTemp = {
  value: number;
  label: string;
};

type BindphoneType = {
  value: string;
  label: string;
};

const CreateAccount: FC = () => {
  const formRef = useRef<FormInstance>();

  const [bindphone, setBindphone] = useState<BindphoneType[]>([]);

  const [accountTypeOptions, setAccountTypeOptions] = useState<MapTemp[]>([]);
  const [shopAccountTypeOptions, setshopAccountTypeOptions] = useState<MapTemp[]>([]);
  const [blueVOptions, setBlueVOptions] = useState<MapTemp[]>([]);
  const [platformOptions, setPlatformOptions] = useState<MapTemp[]>([]);
  const [statusOptions, setStatusOptions] = useState<MapTemp[]>([]);
  const [shopAccountType, setShopAccountType] = useState<number>(0);

  const handleAccountTypeChange = (val: number) => {
    setShopAccountType(val);
  };

  // 筛选条件
  useEffect(() => {
    getMap()
      .then(res => {
        setAccountTypeOptions(res.account_type);
        setBlueVOptions(res.blue_v);
        setPlatformOptions(res.platform);
        setStatusOptions(res.status);
        setshopAccountTypeOptions(res.shop_account_type);
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
        console.log();
        setBindphone(arr);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // 获取账户信息
  const { query = {} } = history.location;

  useEffect(() => {
    console.log(formRef);
    if (query.id) {
      shopUserManageView(Number(query.id))
        .then(res => {
          // console.log(res);
          // setMobileInfo(res);

          formRef.current?.setFieldsValue(res);
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [query.id]);

  // 新增账户
  const confirmAccountCreate = () => {
    const mobile = formRef?.current?.getFieldsValue();
    mobile.id = 0;
    mobile.status = 1;
    // mobile.bind_phone = mobile.bind_phone ? mobile.bind_phone.toString() : '';
    if (mobile.deposit_cash) {
      mobile.deposit_cash = Number(mobile.user_balance);
    }
    if (mobile.user_balance) {
      mobile.user_balance = Number(mobile.user_balance);
    }
    createShopUserManage(mobile)
      .then(() => {
        message.success(OPERATION_TEXT.create_success);
        formRef?.current?.resetFields();
      })
      .catch(err => {
        // console.log(err);
        message.error(err);
      });
  };

  // 编辑账户
  const confirmAccountEdit = () => {
    const mobile = formRef?.current?.getFieldsValue();
    mobile.id = Number(query.id);
    mobile.status = 1;
    // mobile.bind_phone = mobile.bind_phone ? mobile.bind_phone.toString() : '';
    if (mobile.deposit_cash) {
      mobile.deposit_cash = Number(mobile.user_balance);
    }
    if (mobile.user_balance) {
      mobile.user_balance = Number(mobile.user_balance);
    }
    updateShopUserManage(mobile)
      .then(() => {
        message.success(OPERATION_TEXT.edit_success);
        history.goBack();
      })
      .catch(err => {
        // console.log(err);
        message.error(err);
      });
  };
  return (
    <PageContainer>
      <Card style={{ marginTop: 10 }}>
        <ProForm
          title="编辑 Publish Ebay Ad:"
          layout="horizontal"
          className={styles.form}
          submitter={false}
          formRef={formRef}>
          <Row gutter={20}>
            <Col lg={24} md={24}>
              <div className={styles.title}>基础信息</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="main" label="主体" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="account_type"
                label="账号类型"
                showSearch
                options={accountTypeOptions}
                placeholder="请选择"
                rules={[{ required: true, message: '账号类型不能为空' }]}
                fieldProps={{
                  onChange: handleAccountTypeChange,
                }}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="platform"
                label="平台"
                showSearch
                options={platformOptions}
                placeholder="请选择"
                rules={[{ required: true, message: '平台不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="user_name" label="账号名" placeholder="请输入" />
            </Col>
            {shopAccountType === 1 && (
              <Col lg={12} md={24}>
                <ProFormSelect
                  name="shop_account_type"
                  label="店铺账号类型"
                  showSearch
                  options={shopAccountTypeOptions}
                  placeholder="请选择"
                  rules={[{ required: true, message: '店铺账号类型不能为空' }]}
                />
              </Col>
            )}
            <Col lg={12} md={24}>
              <ProFormText
                name="user_id"
                label="账号ID"
                placeholder="请输入"
                rules={[{ required: true, message: '账号ID不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="blue_v"
                label="蓝V"
                showSearch
                options={blueVOptions}
                placeholder="请选择"
                rules={[{ required: true, message: '蓝V不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="authentication" label="实名认证人" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>绑定信息</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="bind_phone"
                label="绑定手机号"
                showSearch
                options={bindphone}
                placeholder="请选择"
                rules={[{ required: true, message: '绑定手机号不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="deposit_cash"
                label="保证金"
                fieldProps={{
                  addonAfter: '元',
                  type: 'number',
                }}
                placeholder="请输入"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="bind_email" label="绑定Email" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}></Col>
            <Col lg={12} md={24}>
              <ProFormTextArea name="bind_bank_cark" label="绑定银行卡" placeholder="请输入" />
            </Col>

            <Col lg={24} md={24}>
              <div className={styles.title}>使用情况</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="user_keeper_by"
                label="账号保管人"
                showSearch
                options={[{ label: '张三', value: 2349 }]}
                placeholder="请选择"
                rules={[{ required: true, message: '账号保管人不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="user_balance"
                label="账号余额"
                fieldProps={{
                  addonAfter: '元',
                  type: 'number',
                }}
                placeholder="请输入"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDigit name="tiktok_coin" label="抖币" placeholder="请输入" />
            </Col>

            <Col lg={12} md={24}>
              <ProFormText name="use_function" label="使用功能" placeholder="请输入" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
            </Col>
            <Col lg={24} md={24} style={{ textAlign: 'center' }}>
              <Space>
                {!formRef?.current?.getFieldValue('id') && (
                  <Button
                    key="create"
                    type="primary"
                    onClick={() => {
                      confirmAccountCreate();
                    }}>
                    保存并新增
                  </Button>
                )}

                {formRef?.current?.getFieldValue('id') && (
                  <Button
                    key="edit"
                    type="primary"
                    onClick={() => {
                      confirmAccountEdit();
                    }}>
                    保存并返回
                  </Button>
                )}
                <Link key="back" to="/operation-center/yangtao/live-user-manage/index">
                  <Button key="back">直接返回</Button>
                </Link>
              </Space>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateAccount;
