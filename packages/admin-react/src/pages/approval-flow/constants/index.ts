// 统一管理所有节点的类型
export enum NodeTypes {
  GRID = '网格',
  START = '开始节点',
  END = '结束节点',
  LINE = '线节点',
  TAKE_OVER = '接管节点',
  APPROVER = '审批节点',
  EXPRESSION = '条件节点（表达式）',
  METHOD = '条件节点（方法调用）',
}
