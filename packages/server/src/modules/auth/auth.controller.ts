/** @format */

import { Body, Controller, Post } from '@nestjs/common'
import { ApiOperation, ApiTags } from '@nestjs/swagger'
import { User } from '../user/user.entity'
import { AuthService } from './auth.service'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * @desc 登录
   * @param { object } { account, password }
   */
  @ApiOperation({ summary: '用户登录' })
  @Post('login')
  async login(@Body() user: Partial<User>): Promise<any> {
    const token = await this.authService.login(user)
    return {
      accessExpire: new Date(new Date().getTime() + 3600 * 24), // token过期时间
      refreshAfter: new Date(new Date().getTime() + 3600 * 12), // token在这之后刷新
      accessToken: token // token
    }
  }
}
