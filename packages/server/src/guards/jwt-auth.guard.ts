/**
 * 关于jwt续期和失效问题：https://segmentfault.com/q/1010000010043871
 *
 * @format
 * @desc jwt守卫装饰器 1. controller内定义路由时可用 2. 必须配合../strategies/jwt.strategy.ts使用 3. jwt.strategy.ts必须在auth.module内当providers注入 4. 接口使用时，需要在auth内选择Bearer Token类型传入token值 难点：
 */

import { ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext): Request {
    const ctx = context.switchToHttp()
    const request = ctx.getRequest()
    return request
  }

  handleRequest(err: unknown, user: unknown, info: unknown): any {
    if (err || !user) {
      throw new UnauthorizedException('token失效，请重新登录！')
    }
    console.log(user)
    return user
  }
}
