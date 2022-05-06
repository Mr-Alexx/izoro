import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  /**
   * @desc 生成jwt
   * @param { Record<string, any> } options
   * @return { string } token
   */
  generateJwt(options: Record<string, any>): string {
    return this.jwtService.sign(options);
  }

  async login(user: LoginDto): Promise<string> {
    const { id, roles } = await this.userService.login(user);
    return this.generateJwt({ id, roles: roles.map(v => v.id) });
  }
}
