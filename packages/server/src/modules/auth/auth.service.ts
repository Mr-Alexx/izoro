import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';

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

  async login(user: Partial<User>): Promise<string> {
    const { id, roles } = await this.userService.login(user);
    return this.generateJwt({ id, roles: roles.map(v => v.id) });
  }
}
