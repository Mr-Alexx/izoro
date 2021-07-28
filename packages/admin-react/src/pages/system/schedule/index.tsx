import type { FC } from 'react';
import AppPageContainer from '@/components/AppPageContainer';
import AppTable from '@/components/AppTable';
import type { ProColumns } from '@ant-design/pro-table';
import { getSchedules } from '@/services/system';

const Schedule: FC = () => {
  const columns: ProColumns<SYSTEM_API.ScheduleItem>[] = [
    {
      title: '序号',
      width: 50,
      key: 'index',
      dataIndex: 'index',
      valueType: 'index',
    },
    {
      title: '任务名称',
      width: 160,
      key: 'name',
      align: 'center',
      dataIndex: 'name',
      valueType: 'text',
    },
    {
      title: '调用方法',
      width: 140,
      key: 'method',
      align: 'center',
      dataIndex: 'method',
      valueType: 'text',
      search: false,
    },
    {
      title: '最大运行时间',
      key: 'max_run_time',
      align: 'center',
      dataIndex: 'max_run_time',
      valueType: 'text',
      search: false,
    },
    {
      title: '运行Timer',
      key: 'run_timer',
      width: 120,
      align: 'center',
      dataIndex: 'run_timer',
      valueType: 'text',
      search: false,
    },
    {
      title: '运行状态',
      key: 'run_status',
      align: 'center',
      width: 80,
      dataIndex: 'run_status',
      valueType: 'select',
      fieldProps: {
        options: [
          { label: '未运行', value: 0 },
          { label: '运行中', value: 1 },
        ],
      },
    },
    {
      title: '任务状态',
      key: 'status',
      align: 'center',
      width: 80,
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        0: {
          text: '禁用',
          status: 'Error',
        },
        1: {
          text: '启用',
          status: 'Processing',
        },
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 180,
      key: 'created_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      width: 180,
      key: 'updated_at',
      valueType: 'dateTime',
      align: 'center',
      search: false,
    },
  ];

  return (
    <AppPageContainer>
      <AppTable<SYSTEM_API.ScheduleItem> columns={columns} request={getSchedules} scroll={{ x: 1200 }} />
    </AppPageContainer>
  );
};

export default Schedule;
