import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * @create 2021/03/08 17:37
   * @desc 创建用户
   * @param { Object } user
   */
  async create (user: { [propsName: string]: any }): Promise<Number> {
    // 判断用户是否存在
    const { account } = user
    const isExist = await this.userRepository.findOne({ where: { account } })
    if (isExist) {
      throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST)
    }

    // 不存在则新建账号
    try {
      const newUser = await this.userRepository.create(user)
      await this.userRepository.save(newUser)
      return newUser.id
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST)
    }
  }

  /**
   * @desc 用户登录
   * @param { Partial<User> } user
   * @return { User }
   */
  async login (user: Partial<User>) {
    const { account, password } = user
    const existUser = await this.userRepository.findOne({
      where: {
        account
      }
    })
    if (!existUser) {
      throw new HttpException('帐号不存在！', HttpStatus.BAD_REQUEST)
    }

    const isPass = await User.comparePassword(password, existUser.password)
    if (!isPass) {
      throw new HttpException('密码错误！', HttpStatus.BAD_REQUEST)
    }

    if (existUser.status !== 1) {
      throw new HttpException('账号不可用，请联系管理员！', HttpStatus.FORBIDDEN)
    }
    return existUser
  }

  /**
   * @desc 查找帐号列表
   * @param { Object } query
   */
  // aysnc getUsers (query: Object): Promise<User[], Number> {
  //   const list = await this.userRepository.findAndCount
  // }

  /**
   * @desc 查找单个用户
   */
  async findById (id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

  async updateById (id: number, user: Partial<User>) {
    console.log(user)
    try {
      const oldUser = await this.findById(id)
      console.log(oldUser)
      const updatedUser = await this.userRepository.merge(oldUser, user)
      return this.userRepository.save(updatedUser)
    } catch (err) {
      console.error(err)
    }
  }
}
