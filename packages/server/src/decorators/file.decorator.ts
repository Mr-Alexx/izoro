/**
 * @description 文件装饰器
 * @module modules/file/decorator
 * @useage controller: func (@UploadFile() file) {}
 * @author 潜
 */

import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const UploadFile = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest() as FastifyRequest;
  return req['incomingFile'];
});
