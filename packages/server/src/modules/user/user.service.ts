import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { RoleService } from '../role/role.service';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly roleService: RoleService,
  ) {}

  /**
   * @create 2021/03/08 17:37
   * @desc 创建用户
   * @param { Object } user
   */
  async create(user: Record<string, any>): Promise<number> {
    // 判断用户是否存在
    const { account } = user;
    let { roles } = user;
    const isExist = await this.userRepository.findOne({ where: { account } });
    if (isExist) {
      throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST);
    }

    if (Array.isArray(roles) && roles.length > 0) {
      roles = await this.roleService.findByIds(roles);
    }

    // 不存在则新建账号
    try {
      const newUser = await this.userRepository.create({ ...user, roles });
      await this.userRepository.save(newUser);
      return newUser.id;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * @desc 用户登录
   * @param { Partial<User> } user
   * @return { User }
   */
  async login(user: Partial<User>): Promise<User> {
    const { account, password } = user;
    const existUser = await this.userRepository
      .createQueryBuilder('user')
      .select()
      .leftJoin('user.roles', 'role')
      .addSelect('role.id')
      .where('user.account = :account', { account })
      .getOne();
    if (!existUser) {
      throw new HttpException('帐号不存在！', HttpStatus.BAD_REQUEST);
    }

    const isPass = await User.comparePassword(password, existUser.password);
    if (!isPass) {
      throw new HttpException('密码错误！', HttpStatus.BAD_REQUEST);
    }

    if (existUser.status !== 1) {
      throw new HttpException('账号不可用，请联系管理员！', HttpStatus.FORBIDDEN);
    }
    return existUser;
  }

  /**
   * @desc 查找帐号列表
   * @param { Object } query
   * 复杂查询：https://www.jianshu.com/p/0fcf45030dd4
   */
  async findAll(query: Record<string, any>): Promise<any> {
    const { status, account } = query;
    let { page, limit } = query;
    page = page || 1;
    limit = limit || 20;

    try {
      const userQuery = this.userRepository
        .createQueryBuilder('user')
        .select([
          'user.id',
          'user.avatar',
          'user.account',
          'user.nickname',
          'user.status',
          'user.created_at',
          'user.email',
          'user.phone_number',
        ])
        .innerJoin('user.roles', 'role')
        .addSelect(['role.id', 'role.name'])
        .orderBy('user.id', 'ASC')
        .skip((page - 1) * limit)
        .take(limit);
      status && userQuery.where('user.status = :status', { status });
      account && userQuery.andWhere('user.account LIKE :account', { account: `%${account}%` });
      const [list, total] = await userQuery.getManyAndCount();
      return { list, total };
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * @desc 查找单个用户
   */
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async updateById(id: number, user: Partial<User>): Promise<User> {
    try {
      const oldUser = await this.findById(id);
      const roles = await this.roleService.findByIds(user.roles);
      const updatedUser = await this.userRepository.merge(oldUser, {
        ...user,
        roles,
      });
      return await this.userRepository.save(updatedUser);
    } catch (err) {
      console.error(err);
    }
  }

  async deleteById(id: number): Promise<any> {
    try {
      await this.userRepository.delete(id);
      return '删除成功';
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
