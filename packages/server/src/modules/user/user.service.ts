/** @format */

import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Like, Repository } from 'typeorm'
import { User } from './user.entity'

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
  async create(user: { [propsName: string]: any }): Promise<number> {
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
  async login(user: Partial<User>) {
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
   * 复杂查询：https://www.jianshu.com/p/0fcf45030dd4
   */
  async findAll(query: Record<string, any>): Promise<any> {
    const { status, account } = query
    let { page, limit } = query
    page = page || 1
    limit = limit || 20
    const where = {}
    status && (where['status'] = status)
    account && (where['account'] = Like(account))

    const [list, total] = await this.userRepository.findAndCount({
      where,
      order: {
        id: 'ASC'
      },
      skip: (page - 1) * limit,
      take: limit,
      cache: false
    })
    return { list, total }
  }

  /**
   * @desc 查找单个用户
   */
  async findById(id: number): Promise<User> {
    return this.userRepository.findOne(id)
  }

  async updateById(id: number, user: Partial<User>): Promise<User> {
    try {
      const oldUser = await this.findById(id)
      const updatedUser = await this.userRepository.merge(oldUser, user)
      return this.userRepository.save(updatedUser)
    } catch (err) {
      console.error(err)
    }
  }
}
