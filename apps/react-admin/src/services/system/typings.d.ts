/**
 * @description  system模块接口 参数/结果 类型
 */
declare namespace SYSTEM_API {
  /* =============== 定时任务 =============== */
  type CreateScheduleParams = {
    rpc?: string;
    method: string;
    description?: string;
    max_run_time?: number;
    name: string;
    status: number;
  };
  type EditScheduleParams = API.EditParams & CreateScheduleParams;
  type ScheduleItem = EditScheduleParams &
    API.TableItem & {
      cron_time: string;
      run_status?: string | number;
      count: number;
      last_started_time?: string;
      last_end_time?: string;
    };
}
