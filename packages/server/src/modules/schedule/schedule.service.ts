import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusType } from '@/interfaces/status.interface';
import { ScheduleMethods } from '@/interfaces/schedule.interface';

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
  async findAll(query: Record<string, any>): Promise<any> {
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
    const existSchedule = await this.ScheduleRepository.findOne({ where: { name } });
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
   * @param {Schedule} schedule 定时任务设置
   * cron定义参考
   * @url https://docs.nestjs.cn/8/techniques?id=%e5%ae%9a%e6%97%b6%e4%bb%bb%e5%8a%a1
   */
  addJob(schedule: Schedule): void {
    const { name, status, cron_time, method } = schedule;
    console.log(name, status, cron_time, method);
    const job = new CronJob(cron_time, () => {
      console.log('执行方法: ', method);
      if (method in this) {
        this[method]?.();
      }
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

  /**
   * @description 初始化执行所有可执行的定时任务
   * 注意：项目初始化时会自动执行，依赖于 app.module.ts 引入的 ScheduleModule.forRoot()
   */
  @Timeout(50)
  async initSchedules(): Promise<void> {
    try {
      const schedules = await this.ScheduleRepository.createQueryBuilder()
        .where('status = :status', { status: '1' })
        .getMany();
      if (schedules.length > 0) {
        const jobs = this.schedulerRegistry.getCronJobs();
        schedules.forEach(schedule => {
          // 判断定时任务是否已经在执行过程中，是的话不操作
          if (!jobs[schedule.name]) {
            this.addJob(schedule);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  }

  [ScheduleMethods.获取Github列表](): void {
    console.log('这是一个测试方法');
  }
}
