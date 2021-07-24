import type { FC } from 'react';
import { useEffect, useState, useRef } from 'react';
import type { ProColumns } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { message, Button, Input } from 'antd';
import type { FormInstance } from 'antd';
import ProForm, { ModalForm } from '@ant-design/pro-form';

// DatePicker 设置为中文
import 'moment/locale/zh-cn';

import { mobileBatchApplyRecharge } from '@/services/operations-center';
import { OPERATION_TEXT } from '@/constants';

export interface DataSourceType {
  id: number;
  mobile?: string;
  allow_recharge_price: number;
  last_recharge?: {
    create_time: string;
    amount: string;
  };
  last_mobile_apply_recharge?: {
    balance: number;
    balance_file: string;
    create_time: string;
  };
  balance?: number;
}

type options = {
  visibile: boolean;
  data: DataSourceType[];
  handleVisibile: any;
};

const MonthBalance: FC<options> = props => {
  const formRef = useRef<FormInstance>();
  const { visibile, data, handleVisibile } = props;
  const [monthlyBalance, setMonthlyBalance] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<DataSourceType[]>([]);
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>(() => dataSource.map(item => item.id));
  useEffect(() => {
    setMonthlyBalance(visibile);
    setDataSource(data);
  }, [visibile, data]);

  // 月度余额
  const columns3: ProColumns<DataSourceType>[] = [
    {
      title: '手机号',
      dataIndex: 'mobile',
      editable: false,
    },
    {
      title: '最近充值金额',
      dataIndex: 'amount',
      editable: false,
      render: (_, record) => {
        return record.last_recharge.amount;
      },
    },
    {
      title: '最近充值时间',
      dataIndex: 'create_time',
      editable: false,
      render: (_, record) => {
        return record.last_recharge.create_time;
      },
    },

    {
      title: '充值金额申请',
      dataIndex: 'allow_recharge_price',
      render: (_, record, index) => {
        return (
          <Input
            onBlur={(e: any) => {
              console.log(index);
              const tableData = dataSource;
              tableData[index].allow_recharge_price = e.target.value;
              setDataSource(tableData);
            }}
            addonAfter="元"
            defaultValue={record.allow_recharge_price}
          />
        );
      },
    },
    {
      title: '月度余额',
      dataIndex: 'balance',
      render: (_, record, index) => {
        return (
          <Input
            addonAfter="元"
            onBlur={(e: any) => {
              console.log(index);
              const tableData = dataSource;
              tableData[index].last_mobile_apply_recharge.balance = e.target.value;
              setDataSource(tableData);
            }}
            defaultValue={record.last_mobile_apply_recharge.balance}
          />
        );
      },
    },
    {
      title: '月度余额凭证',
      dataIndex: 'balance_file',
      editable: false,
      render: (_, record) => <Button>上传</Button>,
    },
  ];
  return (
    <div>
      <ModalForm
        title="月度余额/充值金额申请"
        formRef={formRef}
        visible={monthlyBalance}
        width="85%"
        onFinish={async () => {
          console.log(dataSource);
          const arr = dataSource.map(item => {
            return {
              mobile_id: item.id,
              balance: Number(item.last_mobile_apply_recharge?.balance) || Number(item.balance),
              balance_file: '',
              apply_recharge_price: Number(item.allow_recharge_price),
            };
          });
          mobileBatchApplyRecharge(arr)
            .then(() => {
              message.success(OPERATION_TEXT);
            })
            .catch(err => {
              message.error(err);
            });
          message.success('提交成功');
          return true;
        }}
        onVisibleChange={(visible: boolean) => {
          setMonthlyBalance(visible);
          handleVisibile(visible);
        }}>
        <ProForm.Item name="tableData">
          <ProTable<DataSourceType>
            search={false}
            rowKey="id"
            columns={columns3}
            dataSource={dataSource}
            toolBarRender={false}
            pagination={false}
          />
        </ProForm.Item>
      </ModalForm>
    </div>
  );
};

export default MonthBalance;
