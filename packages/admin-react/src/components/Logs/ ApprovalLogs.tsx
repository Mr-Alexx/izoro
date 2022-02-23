/**
 * @description 审批日志组件
 */
import ProTable from '@ant-design/pro-table';
import type { FC } from 'react';
import { getApprovalLogs } from '@/services/system/index';
import type { OperationLogsProps } from './data';
import type { ProColumns } from '@ant-design/pro-table';
import { useState } from 'react';
import { useEffect } from 'react';
// 测试数据

const ApprovalLogs: FC<OperationLogsProps> = (props: OperationLogsProps) => {
  const { params } = props;
  const [data, setData] = useState<SYSTEM_API.ApprovalLog[]>();

  useEffect(() => {
    if (!params?.data_id || !params?.front_route) {
      return;
    }
    // @ts-ignore
    getApprovalLogs(params).then(res => {
      setData(res);
    });
  }, []);

  const columns: ProColumns<SYSTEM_API.ApprovalLog>[] = [
    {
      title: '序号',
      width: 40,
      dataIndex: 'index',
      align: 'center',
      key: 'index',
      valueType: 'index',
    },
    {
      title: '审批状态',
      width: 100,
      dataIndex: 'status_text',
      key: 'status_text',
      align: 'center',
    },
    {
      title: '审批人',
      width: 100,
      dataIndex: 'user_name',
      key: 'user_name',
      align: 'center',
    },
    {
      title: '审批操作',
      width: 100,
      dataIndex: 'button_name',
      key: 'button_name',
      align: 'center',
      renderText: (text, row) => <span>{row.button_name || '待审批'}</span>,
    },
    {
      title: '审批时间',
      width: 120,
      dataIndex: 'create_time',
      key: 'create_time',
      align: 'center',
      valueType: 'dateTime',
    },
  ];

  return (
    <ProTable<SYSTEM_API.ApprovalLog>
      className="nopadding-table"
      scroll={{
        x: 800,
      }}
      size="small"
      sticky
      rowKey="action_time"
      search={false}
      columns={columns}
      dataSource={data}
      options={false}
      pagination={{
        showSizeChanger: false,
        pageSize: 50,
      }}
    />
  );
};

export default ApprovalLogs;
