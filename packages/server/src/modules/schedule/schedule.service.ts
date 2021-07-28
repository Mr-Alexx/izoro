import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusType } from '@/interfaces/status.interface';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly ScheduleRepository: Repository<Schedule>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  /**
   * @description 查询所有定时任务
   */
  async findAll(query: Record<string, any>) {
    let { page, limit } = query;
    page = page || 1;
    limit = limit || 20;

    try {
      const [list, total] = await this.ScheduleRepository.findAndCount({
        order: {
          id: 'ASC',
        },
        skip: (page - 1) * limit,
        take: limit,
      });
      return { data: list, total };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  /**
   * @description 创建定时任务
   */
  async create(schedule: Partial<Schedule>): Promise<number> {
    const { name } = schedule;
    const existSchedule = await this.ScheduleRepository.find({ where: { name } });

    if (existSchedule) {
      throw new HttpException('该定时任务已存在！', HttpStatus.BAD_REQUEST);
    }

    const newSchedule = await this.ScheduleRepository.create(schedule);
    await this.ScheduleRepository.save(newSchedule);
    this.addJob(newSchedule);
    // 添加定时任务
    return Promise.resolve(newSchedule.id);
  }
  /**
   * @description 添加定时任务
   * @param {string} name 定时任务名称
   * @param {any} options 定时任务设置
   */
  addJob(schedule: Schedule): void {
    const { id, name, status } = schedule;
    const job = new CronJob(`10 * * * * *`, () => {
      console.warn(`time (10) for job ${name} to run!`);
    });
    if (status === StatusType.active) {
      job.start();
    }
    this.schedulerRegistry.addCronJob(name, job);
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
    console.warn(`删除定时任务 - ${JSON.stringify(job)}`);
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

  // @Timeout(2000)
  // test(): void {
  //   console.log('timer');
  //   this.addJob('test', 10);
  // }

  // 星号定义
  // * * * * * *
  // 参考 https://docs.nestjs.cn/8/techniques?id=%e5%ae%9a%e6%97%b6%e4%bb%bb%e5%8a%a1
  // @Cron('10 * * * * *')
  // handleCron(): void {
  //   this.logger.debug('该方法将在10秒标记处每分钟运行一次');
  // }

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
