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
  async create (user: User): Promise<User> {
    // 判断用户是否存在
    const { account } = user
    const isExist = await this.userRepository.findOne({ where: { account } })
    if (isExist) {
      throw new HttpException('账号已存在', HttpStatus.BAD_REQUEST)
    }

    // 不存在则新建账号
    const newUser = await this.userRepository.create(user)
    await this.userRepository.save(newUser)
    return newUser
  }

  /**
   * @desc 查找帐号列表
   * @param { Object } query
   */
  aysnc getUsers (query: Object): Promise<User[], Number> {
    const list = await this.userRepository.findAndCount
  }
}
