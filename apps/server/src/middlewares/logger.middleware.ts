/**
 * 日志处理中间件
 * 请求的路由、IP、参数等信息
 * @author 潜
 */
import { Logger } from '@/utils/log4js.logger';
import { FastifyRequest, FastifyReply } from 'fastify';

export function loggerMiddleware(req: FastifyRequest, res: FastifyReply, next: () => void) {
  console.log('next', next);
  next();
  const code = res.statusCode;
  // 组装日志信息：方法、请求路径、ip、状态
  const info = ` >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  Host: ${req.hostname}
  Request original url: ${req.url}
  Request id: ${req.id}
  Method: ${req.method}
  IP: ${req.ip}
  Status code: ${code}
  Params: ${JSON.stringify(req.params)}
  Query: ${JSON.stringify(req.query)}
  Body: ${JSON.stringify(req.body)} \n  >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  `;
  // 根据状态对日志进行分类
  if (code >= 500) {
    Logger.error(info);
  } else if (code >= 400) {
    Logger.warn(info);
  } else {
    Logger.access(info);
    Logger.log(info);
  }
}
