/** @format */

import jwtConfig from '@/config/jwt.config'
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

@Injectable()
export class JwtStragegy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret
    })
  }

  async validate(payload: Record<string, any>): Promise<{ id: string; roles: number[] }> {
    return { id: payload.id, roles: payload.roles }
  }
}
