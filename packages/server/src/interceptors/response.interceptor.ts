/**
 * @create 2021/03/05 23:51
 * @desc 全局成功响应拦截器，添加自定义code和msg
 * @author 潜
 */
import { CallHandler, ExecutionContext, HttpStatus, Injectable, NestInterceptor } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
  data: T
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<Response<T>> {
    return next.handle().pipe(
      map((data, msg) => ({
        data,
        code: HttpStatus.OK,
        success: true,
        _t: new Date().getTime(),
      })),
    )
  }
}
