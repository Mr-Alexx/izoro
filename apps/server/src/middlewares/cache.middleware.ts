// import { Injectable, NestMiddleware } from '@nestjs/common';
// // import { Request, Response, NextFunction } from 'fastify';

// @Injectable()
// export class CacheMiddleware implements NestMiddleware {
//   use(req: Request, res: Response, next) {
//     console.log('cacheMiddleware...');
//     next();
//   }
// }

export default function CacheMiddleware(req, res, next) {
  console.log('jlfds');
  next();
}
