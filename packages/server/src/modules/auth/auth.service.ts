import { HttpExceptionFilter } from "@/filters/http-exception.filter";
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../user/user.entity";

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async generateJwt (payload ): Promise<any> {}

  async login (body: Partial<User>) {
    const { account, password } = body
    const user = await this.userRepository.findOne({
      where: {
        account
      }
    })
    if (!user) {
      throw new HttpException('帐号不存在！', HttpStatus.NOT_FOUND)
    }

    const isPass = await User.comparePassword(password, user.password)
    if (!isPass) {
      throw new HttpException('密码错误！', HttpStatus.FORBIDDEN)
    }
    
    return 'jwt-token'
  }
}
