/**
 * @description  system模块接口 参数/结果 类型
 */
declare namespace SYSTEM_API {
  /* =============== 业务类型 =============== */
  // 添加业务类型参数
  type CreateBusinessParams = {
    name: string; // 名称
    code: string; // 业务类型唯一标识
    desc?: string; // 描述
  };
  // 编辑业务类型参数
  type EditBusinessParams = CreateBusinessParams & API.EditParams;
  // 业务类型查询参数
  type BusinessListParams = API.ListQueryParams & {
    order?: string; // 排序(asc,desc)
    id?: number; // id
    name?: string; // 名称
    code?: string; // 业务类型唯一标识
    desc?: string; // 描述
  };
  // 业务类型列表项
  type BusinessItem = EditBusinessParams & API.Item;

  /* =============== 状态字典 =============== */
  // 创建字典参数
  type CreateStatusParams = {
    table_name: string; // 表名
    field: string; // 字段名称
    value: number; // 值
    meaning: string; // 含义
  };
  // 编辑字典参数
  type EditStatusParams = CreateStatusParams & {
    id: number;
  };
  // 字典列表查询参数
  type StatusListParams = API.ListQueryParams & {
    id?: number; // id
    table_name?: string; // 表名
    field?: string; // 字段名称
    value?: number; // 值
    meaning?: string; // 含义
  };
  // 字典列表项
  type StatusItem = EditStatusParams & API.Item;

  /* =============== 日志 =============== */
  // 日志注册参数
  type RegisterLogParams = {
    work_id: number; // 业务类型ID
    table_name: string; // 表名
    front_route: string; // 前端路由地址
    main_table: number; // 是否主表：0 否，1 是
    type: number; // 类型：1 业务， 2 审批
  };
  // 日志注册编辑参数
  type EditLogParams = RegisterLogParams & {
    id: number;
  };
  // 日志注册列表查询参数
  type RegisteredLogListParams = API.ListQueryParams & {
    order?: string; // 排序(asc,desc)
    id?: number; // ID
    work_id?: number; // 业务类型ID
    table_name?: string; // 表名
    front_route?: string; // 前端路由地址
    main_table?: number; // 是否主表：0 否，1 是，默认-1
    type?: number; // 类型：1 业务， 2 审批
  };
  // 日志注册响应列表项类型
  type RegisteredLogItem = EditLogParams &
    API.Item & {
      work_name: string; // 业务类型
    };

  // 获取日志详情参数
  type GetLogParams = {
    front_route: string; // 前端路由
    main_id: number; // 主数据ID
    tables?: (stirng | number)[]; // 基于上面主ID的多表日志中选择某些表
  };
  // 日志详情响应

  type LogDetailItem = {
    id: number; // ID
    table_name: string; // 表名
    table_explain: string; // 表名释义
    relation_id: number; // 业务表ID
    field: string; // 字段名
    field_explain: string; // 字段释义
    old_value: string; // 原值
    old_value_explain: string; // 原值释义
    new_value: string; // 新值
    new_value_explain: string; // 新值释义
    user_id: number; // 用户ID
    user_name: string; // 用户名
    action_time: string; // 操作时间
  };

  /* =============== 审批流 =============== */
  type ApprovalItem = {
    name: string; // 名称
    code: string; // 唯一编码，编辑时带上 (不允许修改)
    id: number; // ID,编辑时带上
    work_id: number; // 业务ID （不允许修改）
    model: string; // 模型（不允许修改）
    front_route: string; // 前端路由
    status: number; // 状态：0 禁用，1 启用
    backend?: ApprovalNodeItem[]; // 后端接收的数据类型
    fontend?: Record<string, any>; // 前端原始数据类型
  };
  type ApprovalNodeItem = {
    id: string | number; // 节点ID(不请求后端，那可以前端先生成)
    type: number; // 节点类型（1 条件节点， 2 执行节点， 3 结束节点）
    approver_type?: number; // 审批人类型：1  指定人员， 2 角色， 3 上级审核
    approver_ids?: number[]; // 审批人ID集合，根据类型，可能是用户ID，角色ID，或者0（上级审核）
    business_status?: number; // 审核状态（每个节点需要绑定一个对应的审核状态，以便业务识别）
    condition?: {
      type: number; // 条件类型：1 表达式， 2 方法调用
      expression?: {
        field: string; // 字段名称
        comparer: string; // 比较符号
        value: number | string; // 用于比较的值
        next_node: number | string; // 下一节点ID
      }[];
      call?: {
        // 方法调用，针对方法调用类型
        rpc: string; // 业务RPC
        method: string; // 方法名
        result: {
          res: any; // 返回值为1
          next_node: string | number; // 下一节点ID
        }[];
      };
    };
    action: {
      rpc: string; // 业务RPC
      method: string; // 方法名
      button_name: string; // 按钮名称
      button_id: string | number; // 按钮ID（生成唯一标识即可）
      next_node: string | number; // 下一节点ID
    }[];
  };
}
