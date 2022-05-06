import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Cron, Interval, Timeout, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';
import { Schedule } from './schedule.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { StatusType } from '@/interfaces/status.interface';
import { ScheduleMethods } from '@/interfaces/schedule.interface';
import { ScheduleCreateDto, ScheduleEditDto, ScheduleQueryDto } from './schedule.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  /**
   * @description 查询所有定时任务
   */
  async findAll(query: ScheduleQueryDto): Promise<any> {
    let { page, limit } = query;
    page = page || 1;
    limit = limit || 20;

    try {
      const [list, total] = await this.scheduleRepository.findAndCount({
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
  async create(schedule: ScheduleCreateDto): Promise<number> {
    const { name } = schedule;
    const existSchedule = await this.scheduleRepository.findOne({ where: { name } });
    if (existSchedule) {
      throw new HttpException('该定时任务已存在！', HttpStatus.BAD_REQUEST);
    }

    const newSchedule = await this.scheduleRepository.create(schedule);
    await this.scheduleRepository.save(newSchedule);
    this.addJob(newSchedule);
    // 添加定时任务
    return Promise.resolve(newSchedule.id);
  }
  /**
   * @description 创建cron任务
   * @param {Schedule} schedule 定时任务设置
   * cron定义参考
   * @url https://docs.nestjs.cn/8/techniques?id=%e5%ae%9a%e6%97%b6%e4%bb%bb%e5%8a%a1
   */
  addJob(schedule: ScheduleEditDto): void {
    const { id, name, status, cron_time, method } = schedule;
    const job = new CronJob(cron_time, () => {
      if (method in this) {
        this[method]?.(id, name);
      }
    });
    if (status === StatusType.active) {
      job.start();
    }
    this.schedulerRegistry.addCronJob(name, job);
  }

  /**
   * @description 删除定时任务
   */
  async delete(id: number): Promise<any> {
    try {
      // await this.scheduleRepository.createQueryBuilder().delete().where({ id }).execute();
      const queryBuilder = this.scheduleRepository.createQueryBuilder();
      const job = await queryBuilder.where({ id }).getOne();
      if (!job) {
        throw new HttpException('该定时任务不存在！', HttpStatus.NOT_FOUND);
      }
      await queryBuilder.where({ id }).delete().execute();
      const isExistJob = this.schedulerRegistry.getCronJob(job.name);
      if (isExistJob) {
        this.schedulerRegistry.deleteCronJob(job.name);
      }
      return '删除成功';
    } catch (err) {
      return err.message;
    }
  }
  /**
   * @description 删除cron任务
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
      const schedules = await this.scheduleRepository
        .createQueryBuilder()
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

  /**
   * @description 更新数据库信息
   */
  async update(data: Partial<Schedule>, resetCron?: boolean): Promise<any> {
    try {
      const oldSchedule = await this.scheduleRepository.findOne(data?.id);
      const newSchedule = await this.scheduleRepository.merge(oldSchedule, {
        ...data,
        count: oldSchedule.count + Number(data.count || 0),
      });
      await this.scheduleRepository.save(newSchedule);
      // 如果需要重置定时任务，则重置
      if (resetCron && this.schedulerRegistry.getCronJob(data.name)) {
        // 由于没有重置api，需要先删除原有的定时任务，再重新添加
        this.schedulerRegistry.deleteCronJob(data.name);
        this.addJob(data as Schedule);
      }
      return '更新成功';
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async [ScheduleMethods.获取Github列表](id: number, name: string): Promise<void> {
    // 修改任务运行状态为运行中
    try {
      console.log(`=========== 任务 ${name} 运行中 ===========`);
      await this.update({ run_status: 1, last_started_time: new Date() });
      await new Promise(resolve => {
        setTimeout(() => resolve(true), 10000);
      });
      await this.update({ run_status: 0, last_end_time: new Date(), count: 1 });
      console.log(`=========== 任务 ${name} 运行完毕 ===========`);
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
