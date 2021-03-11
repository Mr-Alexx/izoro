import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/user.entity";
import { UserService } from "../user/user.service";

@Injectable()
export class AuthService {
  constructor (
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * @desc 生成jwt
   * @param { Partial<User> } user
   * @return { string } token
   */
  generateJwt (user: Partial<User> ): string {
    return this.jwtService.sign(user)
  }

  async login (user: Partial<User>) {
    const { id, role } = await this.userService.login(user)
    return this.generateJwt({ id, role })
  }
}
