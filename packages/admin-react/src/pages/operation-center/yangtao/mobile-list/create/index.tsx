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

import type { MapTemp } from './data';
import { Link, history } from 'umi';

import { getMobileMap, mobileCreate, mobileEdit, mobileView } from '@/services/operations-center';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';
import { OPERATION_TEXT } from '@/constants';

const CreateAccount: FC = () => {
  // 筛选条件-运营商
  const [operatorOptions, setOperatorOptions] = useState<MapTemp[]>([]);
  // 筛选条件-卡类型
  const [cardTypeOptions, setCardTypeOptions] = useState<MapTemp[]>([]);
  // 筛选条件-使用类型
  const [useTypeOptions, setUseTypeOptions] = useState<MapTemp[]>([]);

  const [useStatusOptions, setUseStatusOptions] = useState<MapTemp[]>([]);
  const formRef = useRef<FormInstance>();

  // 编辑时获取手机号信息
  const { query = {} } = history.location;
  // const [mobileInfo, setMobileInfo] = useState<OPERATION_API.MobileInfoReq>();

  useEffect(() => {
    console.log(formRef);
    if (query.id) {
      mobileView(Number(query.id))
        .then(res => {
          // console.log(res);
          // setMobileInfo(res);

          formRef.current?.setFieldsValue({
            ...res,
            open_time: res.open_time ? res.open_time : null,
            monthly_rent_time: res.monthly_rent_time ? res.monthly_rent_time : null,
            use_type_arr: res.use_type_arr ? res.use_type_arr : [],
            operator: Number(res.operator),
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }, [query.id]);

  useEffect(() => {
    getMobileMap()
      .then(res => {
        // console.log(res);
        setOperatorOptions(res.operator);
        setCardTypeOptions(res.card_type);
        setUseTypeOptions(res.use_type);
        setUseStatusOptions(res.status);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  // 新增账号
  const confirmMobileCreate = () => {
    const mobile = formRef?.current?.getFieldsValue();
    mobile.operator = mobile.operator.toString();
    mobileCreate(mobile)
      .then(() => {
        message.success(OPERATION_TEXT.create_success);
        formRef?.current?.resetFields();
      })
      .catch(err => {
        message.error(err);
      });
  };
  // 编辑账号
  const confirmMobileEdit = () => {
    const mobile = formRef?.current?.getFieldsValue();
    mobile.id = Number(query.id);
    mobile.operator = mobile.operator.toString();
    mobileEdit(mobile)
      .then(() => {
        message.success(OPERATION_TEXT.edit_success);
        history.goBack();
      })
      .catch(err => {
        message.error(err);
      });
  };

  return (
    <PageContainer>
      <Card style={{ marginTop: 10 }}>
        <ProForm submitter={false} formRef={formRef} className={styles.form} layout="horizontal">
          <Row gutter={20}>
            <Col lg={24} md={24}>
              <div className={styles.title}>手机号信息</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="mobile"
                label="手机号"
                placeholder="请输入"
                rules={[{ required: true, message: '手机号不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormText
                name="username"
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
                options={operatorOptions}
                placeholder="请选择"
                rules={[{ required: true, message: '运营商不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="card_type"
                label="卡类型"
                showSearch
                options={cardTypeOptions}
                placeholder="请选择"
                rules={[{ required: true, message: '卡类型不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDatePicker name="open_time" label="开卡时间" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDatePicker name="monthly_rent_time" label="交租日期" />
            </Col>
            <Col lg={12} md={24}>
              <ProFormDigit
                label="月租"
                name="monthly_rent"
                min={1}
                placeholder="请输入"
                rules={[{ required: true, message: '月租不能为空' }]}
              />
              {/* <ProFormText
                name="monthly_rent"
                label="月租"
                placeholder="请输入"
                rules={[{ required: true, message: '月租不能为空' }]}
              /> */}
            </Col>
            <Col lg={12} md={24}>
              <ProFormText name="set_meal" label="套餐" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>保管人信息</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="department_id"
                label="保管人部门"
                showSearch
                options={[
                  {
                    label: '洋桃',
                    value: 1,
                  },
                  {
                    label: '总经办',
                    value: 2,
                  },
                ]}
                placeholder="请选择"
                rules={[{ required: true, message: '保管人部门不能为空' }]}
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="user_id"
                label="保管人"
                showSearch
                options={[
                  {
                    label: '张三',
                    value: 1,
                  },
                  {
                    label: '李四',
                    value: 2,
                  },
                ]}
                placeholder="请选择"
                rules={[{ required: true, message: '保管人不能为空' }]}
              />
            </Col>
            <Col lg={24} md={24}>
              <div className={styles.title}>使用情况</div>
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="use_type_arr"
                label="使用类型"
                showSearch
                options={useTypeOptions}
                placeholder="请选择"
                mode="multiple"
                allowClear
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormSelect
                name="status"
                label="使用状态"
                showSearch
                options={useStatusOptions}
                placeholder="请选择"
              />
            </Col>
            <Col lg={12} md={24}>
              <ProFormTextArea name="remark" label="备注" placeholder="请输入" />
            </Col>
            <Col lg={24} md={24} style={{ textAlign: 'center' }}>
              <Space>
                {!formRef?.current?.getFieldValue('id') && (
                  <Button
                    key="add"
                    type="primary"
                    onClick={() => {
                      confirmMobileCreate();
                    }}>
                    保存并新增
                  </Button>
                )}

                {formRef?.current?.getFieldValue('id') && (
                  <Button
                    key="keep"
                    onClick={() => {
                      confirmMobileEdit();
                    }}
                    type="primary">
                    保存并返回
                  </Button>
                )}
                <Button
                  key="back"
                  onClick={() => {
                    history.goBack();
                  }}>
                  直接返回
                </Button>
              </Space>
            </Col>
          </Row>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default CreateAccount;
