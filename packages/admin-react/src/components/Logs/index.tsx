/**
 * @description 日志组件，包括审批日志和操作日志
 */
import { Card } from 'antd';
import type { FC } from 'react';
import OperationLogs from './OperationLogs';
import { useState } from 'react';
import type { LogsProps } from './data';

const Logs: FC<LogsProps> = (props: LogsProps) => {
  const { className, style } = props;
  const tabList = [
    { key: 'tab1', tab: '审批日志' },
    { key: 'tab2', tab: '操作日志' },
  ];
  const [tabStatus, seTabStatus] = useState<string>('tab1');

  const contentList = {
    tab1: <div>test</div>,
    tab2: (
      <OperationLogs
        params={{
          front_route: '/aa', // 前端路由
          main_id: 1, // 详情页面的id
        }}
      />
    ),
  };

  const onOperationTabChange = (key: string) => {
    seTabStatus(key);
  };

  return (
    <Card style={style} className={className} bordered={false} tabList={tabList} onTabChange={onOperationTabChange}>
      {contentList[tabStatus]}
    </Card>
  );
};

export default Logs;
