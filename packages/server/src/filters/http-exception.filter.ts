import { errorLogger } from "@/logger/log4.logger";
import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from "@nestjs/common";

/**
 * @desc 自定义HTTP错误处理
 * 1. 返回自定义错误
 * 2. 输出日志
 * @example https://docs.nestjs.cn/7/exceptionfilters?id=%e5%bc%82%e5%b8%b8%e8%bf%87%e6%bb%a4%e5%99%a8-1
 */
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const url = ctx.getRequest().originalUrl // 请求路由地址
    
    // 获取错误码，默认服务器错误码（500）
    const code = exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR

    const err = {
      code,
      msg: exception.message,
      success: false,
      _t: new Date().getTime()
    }

    // 返回错误响应
    const resonse = ctx.getResponse()
    resonse
      .status(code)
      .json(err)

    errorLogger.error(url, err)
  }
}
