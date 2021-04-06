/**
 * @desc 本地身份验证策略
 * https://docs.nestjs.cn/7/security?id=%e8%ae%a4%e8%af%81%ef%bc%88authentication%ef%bc%89
 */
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy } from 'passport-local'
// import { AuthService } from "./auth.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  // constructor (
  //   private readonly authService: AuthService
  // ) {
  //   super()
  // }
}
