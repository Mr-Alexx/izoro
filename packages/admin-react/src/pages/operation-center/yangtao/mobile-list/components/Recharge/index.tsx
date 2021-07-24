import type { FC } from 'react';
import { useEffect, useState } from 'react';

import { message, Divider, Input, Row, Col } from 'antd';
import ProForm, { ModalForm, ProFormRadio, ProFormGroup } from '@ant-design/pro-form';
import { CloseCircleOutlined } from '@ant-design/icons';
import { mobileRecharge } from '@/services/operations-center';
// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import styles from './index.less';

type TableListItem = {
  id: number;
  mobile: string;
  // status: number;
  // department_id: number;
  // department_name: string;
  // username: string;
  // user_id: number;
  // user_compound_name: string;
  // card_type: number;
  // open_time: string;
  // monthly_rent_time: string;
  // monthly_rent: number;
  // operator: string;
  // set_meal: string;
  // use_type: number;
  // remark: string;
  // create_time: string;
  // update_time: string;
  // last_mobile_apply_recharge: {
  //   balance: number;
  //   balance_file: string;
  //   create_time: string;
  // };

  // allow_recharge_price: number;
  // mobile_Bind: {
  //   bind_name: string;
  //   bind_value: string;
  //   remark: string;
  // };
  // last_recharge: {
  //   create_time: string;
  //   amount: string;
  // };
  // recharge_status: number;
  // totalRechargeAmount: number;
  // totalRechargeCount: number;
};

type options = {
  visibile: boolean;
  handleVisibile: any;
  multipleRow: TableListItem[];
  handleRecharge: any;
};

const Recharge: FC<options> = props => {
  const [rechargeModalVisit, setRechargeModalVisit] = useState<boolean>(false);
  const [rechargeValues, setRechargeValues] = useState<TableListItem[]>([]);
  const { visibile, handleVisibile, multipleRow, handleRecharge } = props;
  useEffect(() => {
    setRechargeModalVisit(visibile);
  }, [visibile]);
  useEffect(() => {
    setRechargeValues(multipleRow);
  }, [multipleRow]);
  return (
    <div>
      <ModalForm
        title="充值"
        visible={rechargeModalVisit}
        width="85%"
        layout="horizontal"
        className={styles.form}
        onFinish={async values => {
          console.log(values);
          const ids = [];
          for (let i = 0; i < rechargeValues.length; i++) {
            ids.push(rechargeValues[i].id);
          }
          if (!values.recharge_money) {
            message.warning('请选择充值金额');
            return;
          }
          mobileRecharge({
            ids: ids.join(','),
            amount: values.recharge_money,
          })
            .then(res => {
              console.log(res);
              message.success('提交成功');
              return true;
            })
            .catch(err => {
              console.error(err);
              message.error(err);
            });
        }}
        onVisibleChange={(visible: boolean) => {
          setRechargeModalVisit(visible);
          handleVisibile(visible);
        }}>
        <ProFormGroup>
          <ProFormRadio.Group
            name="recharge_money"
            options={[
              {
                label: '1元',
                value: 1,
              },
              {
                label: '2元',
                value: 2,
              },
              {
                label: '3元',
                value: 3,
              },
            ]}
          />
        </ProFormGroup>
        <ProForm.Item>
          <Divider orientation="left">充值手机号</Divider>
        </ProForm.Item>
        <Row gutter={20}>
          {rechargeValues.map(item => {
            return (
              <Col lg={8} md={12} key={item.id}>
                <ProForm.Item>
                  <Input
                    addonAfter={
                      <CloseCircleOutlined
                        style={{ cursor: 'pointer' }}
                        onClick={() => {
                          console.log('arr');
                          const arr = multipleRow;
                          for (let i = 0; i < arr.length; i++) {
                            if (arr[i].id === item.id) {
                              arr.splice(i, 1);
                            }
                            setRechargeValues([...arr]);
                          }
                          handleRecharge();
                        }}
                      />
                    }
                    style={{ width: 200 }}
                    disabled
                    defaultValue={item.mobile}
                  />
                </ProForm.Item>
              </Col>
            );
          })}
        </Row>
      </ModalForm>
    </div>
  );
};

export default Recharge;
