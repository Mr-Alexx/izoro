import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { User } from "../user/user.entity";
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService
  ) {}

  /**
   * @desc 登录
   * @param { object } { account, password }
   */
  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async login (@Body() body: Partial<User>): Promise<string> {
    return this.authService.login(body)
  }
}
