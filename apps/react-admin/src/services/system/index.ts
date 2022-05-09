import { get, post, patch, del } from '@/utils/request';

/* =============== 文件上传 =============== */
export const uploadFile = (data: any): Promise<{ url: string; id: number }> =>
  post('/file/upload', data, {
    // @ts-expect-error
    headers: {
      // 如果填multipart/form-data会报 Multipart: Boundary not found
      // 设置为false时，会默认multipart/form-data; Boundary....
      // 'Content-Type': 'multipart/form-data',
      contentType: false,
    },
  });

/* =============== 定时任务 =============== */
// 定时任务列表
export const getSchedules = (params: Api.ListQueryParams): Promise<SystemApi.ScheduleItem[]> =>
  get('/schedule', params);

// 定时任务绑定方法列表
export const getScheduleMethods = (): Promise<any> => get('/schedule/methods');

// 创建定时任务
export const addSchedule = (data: SystemApi.CreateScheduleParams): Promise<number> => post('/schedule', data);

// 编辑定时任务
export const editSchedule = (data: SystemApi.EditScheduleParams): Promise<any> => patch(`/schedule/${data.id}`, data);

// 删除定时任务
export const delSchedule = (id: number): Promise<any> => del(`/schedule/${id}`);
