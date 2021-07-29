import { get, post, patch } from '@/utils/request';

/* =============== 状态字典 =============== */
// 添加状态字典
export const createStatus = (data: SYSTEM_API.CreateStatusParams) => post('/system/status_dict/create', data);

// 编辑状态字典
export const editStatus = (data: SYSTEM_API.EditStatusParams) => post('/system/status_dict/edit', data);

// 删除状态字典
export const deleteStatus = (data: API.DeleteParams) => post('/system/status_dict/delete', data);

// 获取状态字典列表
export const getStatusList = (params: SYSTEM_API.StatusListParams): Promise<SYSTEM_API.StatusItem[]> =>
  get('/system/status_dict/list', params);

/* =============== 业务类型 =============== */
// 新增业务类型
export const createBusiness = (data: SYSTEM_API.CreateBusinessParams) => post('/system/work/create', data);

// 编辑业务类型
export const editBusiness = (data: SYSTEM_API.EditBusinessParams) => post('/system/work/edit', data);

// 获取业务类型列表
export const getBusinessList = (params: SYSTEM_API.BusinessListParams): Promise<SYSTEM_API.BusinessItem[]> =>
  get('/system/work/list', params);

/* =============== 日志 =============== */
// 前端页面路由绑定操作日志
export const registerLog = (data: SYSTEM_API.RegisterLogParams): API.AnyRes => post('/system/log/register', data);

// 编辑绑定操作日志
export const editRegisteredLog = (data: SYSTEM_API.EditLogParams): API.AnyRes =>
  post('/system/log_register/edit', data);

// 前端路由绑定日志列表
export const getRegisteredLogs = (
  params: SYSTEM_API.RegisteredLogListParams,
): Promise<SYSTEM_API.RegisteredLogItem[]> => get('/system/log_register/list', params);

// 获取指定的日志信息
export const getLogs = (data: SYSTEM_API.GetLogParams): Promise<SYSTEM_API.LogDetailItem[]> =>
  get('/system/log/get', data);

/* =============== 定时任务 =============== */
// 定时任务列表
export const getSchedules = (params: API.ListQueryParams): Promise<SYSTEM_API.ScheduleItem[]> =>
  get('/schedule', params);

// 定时任务绑定方法列表
export const getScheduleMethods = (): Promise<any> => get('/schedule/methods');

// 创建定时任务
export const addSchedule = (data: SYSTEM_API.CreateScheduleParams): Promise<number> => post('/schedule', data);

// 编辑定时任务
export const editSchedule = (data: SYSTEM_API.EditScheduleParams): Promise<any> => patch(`/schedule/${data.id}`, data);

// 删除定时任务
