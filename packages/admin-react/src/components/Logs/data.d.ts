export type LogsDetail = {
  id: number;
  table_name: string; // 表名
  table_explain: string; // 表名释义
  relation_id: number; // 业务表ID
  field: string; // 字段名
  field_explain: string; // 字段释义
  old_value: string; // 原值
  old_value_explain: string; // 原值释义
  new_value: string; // 新值
  new_value_explain: string; // 新值释义
};
export type LogsItem = {
  id: number; // ID
  user_id: number; // 用户ID
  user_name: string; // 用户名
  action_time: string; // 操作时间
  logs: LogsDetail[]; // 操作内容
};

export type LogsProps = {
  /**
   * @description 前端路由
   */
  route: string;
  /**
   * @description 详情id
   */
  id: number | undefined;
  className?: string;
  style?: Record<string, any> | undefined;
};
export type OperationLogsProps = {
  params: SYSTEM_API.GetLogParams;
};

export type AdvancedState = {
  operationKey: string;
  tabActiveKey: string;
};
