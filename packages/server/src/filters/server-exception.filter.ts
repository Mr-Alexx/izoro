/** @format */

// /**
//  * @description 服务端异常过滤器
//  * @filters filters/server-exception.filter.ts
//  * @author 潜
//  */

// import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common'

// @Catch()
// export default class ServerExceptionFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost): void {
//     const ctx = host.switchToHttp()
//     const req = ctx.getRequest()
//     const res = ctx.getResponse()

//     const code = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

//     const logFormat = `<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//     Request original url: ${req.originalUrl}
//     Method: ${req.method}
//     IP: ${req.ip}
//     Status code: ${code}
//     Response: ${exception}
//     \n  <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
//     `

//     const err = {
//       code,
//       msg: exception.message,
//       success: false,
//       _t: new Date().getTime(),
//     }

//     // 返回错误响应
//     const response = ctx.getResponse()
//     response.code(code).send(err)

//     errorLogger.error(url, err)
//   }
// }
