import { Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  // constructor(private readonly exampleService: ExampleService) {}
  constructor(private schedulerRegistry: SchedulerRegistry) {}

  /**
   * @description 添加定时任务
   * @param {string} name 定时任务名称
   * @param {any} options 定时任务设置
   */
  addJob(name: string, options: any): void {
    const job = new CronJob(`${options} * * * * *`, () => {
      this.logger.warn(`time (${options}) for job ${name} to run!`);
    });
    console.log(job);
    // 首先判断该定时任务是否已经添加
    // const isExistJob = this.schedulerRegistry.getCronJob(name);
    // if (isExistJob) {
    //   return;
    // }
    // 入库
    this.schedulerRegistry.addCronJob(name, job);
    job.start();
    this.logger.log(`添加定时任务 - ${name}`);
  }
  /**
   * @description 删除定时任务
   * @param {string} id 定时任务id
   */
  deleteJob(id: number): void {
    // 从数据库中取
    const job = { id: 1, name: 'test' };
    const isExistJob = this.schedulerRegistry.getCronJob(job.name);
    if (!isExistJob) {
      return;
    }
    // 从数据库中删除
    this.schedulerRegistry.deleteCronJob(job.name);
    this.logger.warn(`删除定时任务 - ${JSON.stringify(job)}`);
  }
  /**
   * @description 编辑定时任务
   * @param {number} id 定时任务id
   * @param {any} options 定时任务设置
   */
  editJob(id: number, options: any): void {
    // 从数据库中取
    const job = { id: 1, name: 'test' };
    const existJob = this.schedulerRegistry.getCronJob(job.name);
    if (!existJob) {
      return;
    }
    // ???
  }

  @Timeout(2000)
  test(): void {
    this.logger.log('timer');
    this.addJob('test', 10);
  }

  // 星号定义
  // * * * * * *
  // 参考 https://docs.nestjs.cn/8/techniques?id=%e5%ae%9a%e6%97%b6%e4%bb%bb%e5%8a%a1
  @Cron('10 * * * * *')
  handleCron(): void {
    this.logger.debug('该方法将在10秒标记处每分钟运行一次');
  }

  // @Cron(CronExpression.EVERY_MINUTE)
  // cronPerMinute(): void {
  //   this.logger.debug('使用快捷配置，每分钟执行一次');
  // }

  // @Interval(10000)
  // handleInterval(): void {
  //   this.logger.debug('interval-1');
  // }

  // @Timeout(5000)
  // handleTimeout(): void {
  //   this.logger.debug('timeout-1');
  // }
}
