// @ts-nocheck
declare const module: any;

import config from '@/config/app.config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import fastifyCsrf from 'fastify-csrf';
import fastifyHelmet from 'fastify-helmet';
import fastifyRateLimit from '@fastify/rate-limit';
import fastifyCompress from 'fastify-compress';
import fastifyCookie from '@fastify/cookie';
import fastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';
import { errorLogger } from './logger/log4.logger';
import fastifySwagger from 'fastify-swagger';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // api文档插件
import { ClassSerializerInterceptor } from '@nestjs/common';
import * as path from 'path';
import { loggerMiddleware } from './middlewares/logger.middleware';
import fastify from 'fastify';
import * as fastifyPlugin from 'fastify-plugin';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  /**
   * fastify从3.0.0版本开始已经不再内建地支持中间件了，
   * 而是采取插件的形式来集成功能，
   * 如果需要继续使用中间件，需要引入fastify-express或middie模块，参考下面链接
   * @see https://www.fastify.cn/docs/latest/Middleware/
   */
  const adapter = new FastifyAdapter({
    // http2: true, // 设为true需要nginx配置
    /**
     * fastify内建支持日志服务，并使用pino作为日志工具
     * 详细配置参数下面链接
     * @see https://www.fastify.cn/docs/latest/Logging/
     */
    // logger: true
  });
  // 静态文件查看
  adapter.register(fastifyStatic, {
    root: path.join(__dirname, '..', 'public'),
  });
  // api访问速率限制
  adapter.register(fastifyRateLimit, {
    // 限制单ip单位时间访问频率
    timeWindow: 1000 * 5, // 单位时间ms
    max: 20, // 单位时间内最多访问次数
    errorResponseBuilder(req, ctx) {
      const error = {
        code: 429,
        success: false,
        msg: `访问受限，请${ctx.after}后再试！`,
        _t: new Date().getTime(),
      };
      errorLogger.error(req.url, error);
      return error;
    },
  });
  // 使用fastifyCsrf必须引入此插件
  adapter.register(fastifyCookie);
  // 防跨站点请求伪造
  adapter.register(fastifyCsrf);
  // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  adapter.register(fastifyHelmet, {
    // https://docs.nestjs.cn/7/security?id=helmet
    // contentSecurityPolicy: {
    //   directives: {
    //     defaultSrc: [`'self'`],
    //     styleSrc: [`'self'`, `'unsafe-inline'`, 'cdn.jsdelivr.net', 'fonts.googleapis.com'],
    //     fontSrc: [`'self'`, 'fonts.gstatic.com'],
    //     imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
    //     scriptSrc: [`'self'`, `https: 'unsafe-inline'`, `cdn.jsdelivr.net`],
    //   },
    // }
    contentSecurityPolicy: false,
  });
  // 压缩请求
  adapter.register(fastifyCompress);
  // 文件上传解析file
  adapter.register(fastifyMultipart, {
    limits: {
      files: 10,
      fileSize: 2 * 1024 * 1000, // 2MB
    },
  });
  // swagger配置，https://github.com/fastify/fastify-swagger
  adapter.register(fastifySwagger, {
    routePrefix: '/doc',
    swagger: {
      info: {
        version: '1.0.0',
        title: 'NestJs BL',
        description: 'BL base on nestjs.',
      },
      externalDocs: {
        url: 'http:localhost:5000',
      },
      host: 'localhost',
      schemes: ['http', 'https'],
      consumes: ['application/json'],
      produces: ['application/json'],
    },
  });

  // middleware先于contentTypeParser执行。。。
  // 此法无效
  // adapter.register(
  //   fastifyPlugin((instance, opts, next) => {
  //     function contentParser(req, body, done) {
  //       const bodyFormat = body.toString();
  //       console.log('body, d: ', bodyFormat);
  //       req.body = bodyFormat;
  //       done(null, bodyFormat);
  //     }

  //     instance.addContentTypeParser('application/json', { parseAs: 'buffer' }, contentParser);
  //     next();
  //   }),
  // );

  // 这里使用插件的形式是因为如果使用middleware，request拿到的body会一直是空，因为middleware比插件先执行
  adapter.register(
    fastifyPlugin((instance, opts, next) => {
      // onRequest、preParsing钩子 body为空，还没处理
      // https://www.fastify.io/docs/latest/Reference/Hooks/
      // preValidation body已经被处理完成并挂载到request中
      instance.addHook('preValidation', (request, reply, done) => {
        loggerMiddleware(request, reply, done);
        // Some code
        // done();
      });
      next();
    }),
  );

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter);

  app.enableCors(); // 允许跨域

  // 请求进来先经中间件
  // 由于对body参数时在中间件之后处理，所以logger中间件无法拿到body、query和params参数
  // 此处做个简单处理，仅对content-type为json的处理
  app.use((req, res, next) => {
    req.on('data', chunk => {
      if (req.headers['content-type'] === 'application/json') {
        // const body = JSON.parse(chunk.toString());
        // console.log('res', body);
        // req['body'] = body;
      }
      next();
    });

    // bodyParser.json()(req, res, next);
    // console.log(bodyParser.json()(req, res, next));
    // next(req, res);
    // if (req.headers['content-type'] === 'application/json') {
    //   let body: string = '';
    //   req.on('data', chunk => {
    //     body += chunk.toString();
    //   });
    //   req.on('end', () => {
    //     req.body = JSON.parse(body);
    //     console.log(req.body);
    //     next(1);
    //   });
    //   req.on('error', e => {
    //     console.error(e);
    //     next(req);
    //   });
    // } else {
    //   next(req);
    // }
  });

  app.use((req, res, next) => {
    console.log('中间件2： ', req);
    next();
  });

  // app.use(bodyParser());
  // app.use(loggerMiddleware);

  app.useGlobalFilters(new HttpExceptionFilter()); // 自定义接口异常详情
  app.useGlobalPipes(new ValidationPipe()); // 数据验证器
  app.useGlobalInterceptors(
    new ResponseInterceptor(), // 自定义接口响应，输出日志
    new ClassSerializerInterceptor(app.get(Reflector)), // 要使entity内的@Exclude生效，需加这个
  );

  const options = new DocumentBuilder()
    // .addSecurity('basic', {
    //   type: 'http',
    //   scheme: 'basic',
    // })
    // .addBearerAuth({
    //   type: 'http',
    //   scheme: 'bearer',
    //   name: 'Authorization',
    //   in: 'header',
    // })
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'jwt')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/doc', app, document);

  await app.listen(config.PORT, config.HOST);
  console.log(`App is listen on http://localhost:${config.PORT}`);
  console.log(`Document listen on http://localhost:5000 or http://localhost:${config.PORT}/doc`);

  // 热重载模块
  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
