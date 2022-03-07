/**
 * @description 日志组件，包括审批日志和操作日志
 */
import type { FC } from 'react';
import OperationLogs from './OperationLogs';
import { useState } from 'react';
import type { LogsProps } from './data';
import ApprovalLogs from './ ApprovalLogs';
import ProCard from '@ant-design/pro-card';
import classNames from 'classnames';
import styles from './index.less';

const Logs: FC<LogsProps> = (props: LogsProps) => {
  const { className, style, route, id } = props;
  const [tab, setTab] = useState<string>('approvalLog');

  // const dataId = useMemo(() => {
  //   // @ts-ignore
  //   return id ?? matchRoute.params.id;
  // }, [id]);

  return (
    <ProCard
      size="small"
      id="日志"
      tabs={{
        size: 'small',
        tabPosition: 'top',
        activeKey: tab,
        onChange: key => {
          setTab(key);
        },
        tabBarStyle: {
          marginBottom: 0,
        },
      }}
      style={{
        ...style,
        marginTop: 15,
      }}
      className={`${styles.logs} ${className}`}>
      <ProCard.TabPane key="approvalLog" tab="审批日志">
        <ApprovalLogs
          params={{
            front_route: route,
            data_id: id,
          }}
        />
      </ProCard.TabPane>
      {/* <ProCard.TabPane key="systemLog" tab="操作日志">
        <OperationLogs
          params={{
            front_route: frontRoute,
            main_id: dataId,
          }}
        />
      </ProCard.TabPane> */}
    </ProCard>
  );
};

export default Logs;
