/**
 * @description 操作日志组件
 */
import ProTable from '@ant-design/pro-table';
import type { FC } from 'react';
import { getLogs } from '@/services/system/index';
import type { LogsItem, OperationLogsProps } from './data';
import type { ProColumns } from '@ant-design/pro-table';
// 测试数据
import { Tag, Tooltip } from 'antd';
import { useEffect } from 'react';

const OperationLogs: FC<OperationLogsProps> = (props: OperationLogsProps) => {
  const { params } = props;
  const columns: ProColumns<LogsItem>[] = [
    {
      title: '序号',
      width: 60,
      dataIndex: 'index',
      align: 'center',
      key: 'index',
      valueType: 'index',
    },
    {
      title: '操作人',
      width: 100,
      dataIndex: 'user_name',
      key: 'user_name',
      align: 'center',
    },
    {
      title: '操作时间',
      width: 120,
      dataIndex: 'action_time',
      key: 'action_time',
      align: 'center',
      valueType: 'dateTime',
    },
    {
      title: '操作内容',
      key: 'action_content',
      align: 'left',
      render: (_, row) => {
        return (
          <ul>
            {row.logs?.map(item => (
              <li key={item.id} style={{ display: 'flex', alignItems: 'center', lineHeight: '24px' }}>
                {/* 表名 */}
                <span>{item.table_name}：</span>
                {/* 字段名 */}
                <span style={{ marginRight: 5 }}>{item.field_explain}</span>
                {/* 旧值 */}
                <Tooltip title={item.old_value || '空'}>
                  <Tag
                    style={{
                      maxWidth: 400,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      lineHeight: '16px',
                    }}
                    color="default">
                    {item.old_value || '空'}
                  </Tag>
                </Tooltip>
                -&gt;&nbsp;
                {/* 新值 */}
                <Tooltip title={item.new_value || '空'}>
                  <Tag
                    style={{
                      maxWidth: 400,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      lineHeight: '16px',
                    }}
                    color="processing">
                    {item.new_value || '空'}
                  </Tag>
                </Tooltip>
              </li>
            ))}
          </ul>
        );
      },
    },
  ];

  return (
    <ProTable
      // headerTitle={
      //   <Space>
      //     <span>操作日志</span>
      //     <span style={{ fontSize: 14, fontWeight: 'normal' }}>(共{4}条记录)</span>
      //   </Space>
      // }
      className="nopadding-table"
      scroll={{
        x: 1300,
      }}
      sticky
      rowKey="action_time"
      search={false}
      columns={columns}
      // @ts-ignore
      request={async () => {
        try {
          const data = await getLogs(params);
          return {
            total: data.length,
            data,
            success: true,
          };
        } catch (err) {
          console.error(err);
          return {
            success: false,
          };
        }
      }}
      options={false}
      pagination={{
        showSizeChanger: false,
        pageSize: 50,
      }}
    />
  );
};

export default OperationLogs;
