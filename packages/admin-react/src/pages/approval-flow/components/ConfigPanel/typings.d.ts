export type ExpressionItem = {
  id?: string | number;
  field: string; // 字段名称
  comparer: string; // 比较符号, ex: '>',
  value: number | string; // 用于比较的值
  next_node: string | number | null; // 下一节点ID
};

type CallTypeResItem = {
  // 返回值
  id: number | string;
  res: number; // 返回值为1
  next_node: string | number; // 下一节点ID
};
export type CallType = {
  id: number | string;
  // 方法调用，针对方法调用类型
  rpc: string; // 业务RPC, ex: 'purchaseRpc'
  method: string; // 方法名, ex: 'confirmPurchase'
  rpcAndMethod?: string[];
  result: CallTypeResItem[];
  business_status?: number | string;
};

export type ConditionType = {
  type: number; // 条件类型：1 表达式， 2 方法调用
  expression?: ExpressionItem[];
  call?: CallType;
};

export type ActionItem = {
  rpc: string; // 业务RPC, ex: 'purchaseRpc'
  method: string; // 方法名
  button_name: string; // 按钮名称, ex: '确认'
  button_id: string | number; // 按钮ID（生成唯一标识即可）
  next_node: string | number; // 下一节点ID
};

export type NodeForm = {
  id: string | number; // 节点ID(不请求后端，那可以前端先生成)
  type: number; // 节点类型（1 条件节点， 2 执行节点， 3 结束节点）
  approver_type: number; // 审批人类型：1  指定人员， 2 角色， 3 上级审核
  approver_ids: number[]; // 审批人ID集合，根据类型，可能是用户ID，角色ID，或者0（上级审核）
  business_status: number; // 审核状态（每个节点需要绑定一个对应的审核状态，以便业务识别）
  condition?: ConditionType;
  action?: ActionItem[];
};

export type CommonNodeType = {
  id: string | number;
  form?: NodeForm;
};

// 按钮action表格项
export type ButtonActionItem = {
  button_id: string | number;
  button_name: string;
  rpc: string;
  method: string;
  next_node: string | number;
  rpcAndMethod?: string[];
};
