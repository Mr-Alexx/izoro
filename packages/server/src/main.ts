/** @format */

import { NestFactory, Reflector } from '@nestjs/core'
import { AppModule } from './app.module'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger' // api文档插件
import { ResponseInterceptor } from './interceptors/response.interceptor'
import { HttpExceptionFilter } from './filters/http-exception.filter'
import { ValidationPipe } from './pipes/validation.pipe'
import fastifyCsrf from 'fastify-csrf'
import fastifyHelmet from 'fastify-helmet'
import fastifyRateLimit from 'fastify-rate-limit'
import fastifyCompress from 'fastify-compress'
import fastifyCookie from 'fastify-cookie'
import fastifyMultipart from 'fastify-multipart'
import { errorLogger } from './logger/log4.logger'
import fastifySwagger from 'fastify-swagger'
import { ClassSerializerInterceptor } from '@nestjs/common'

async function bootstrap() {
  const adapter = new FastifyAdapter({
    // http2: true, // 设为true需要nginx配置
  })
  adapter.register(fastifyRateLimit, {
    // 限制单ip单位时间访问频率
    timeWindow: 1000 * 60, // 单位时间ms
    max: 500, // 单位时间内最多访问次数
    errorResponseBuilder(req, ctx) {
      const error = {
        code: 429,
        success: false,
        msg: `访问受限，请${ctx.after}后再试！`,
        _t: new Date().getTime(),
      }
      errorLogger.error(req.url, error)
      return error
    },
  })
  adapter.register(fastifyCookie) // 使用fastifyCsrf必须引入此插件
  adapter.register(fastifyCsrf) // 防跨站点请求伪造
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
  }) // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  adapter.register(fastifyCompress) // 压缩请求
  adapter.register(fastifyMultipart, {
    limits: {
      files: 10,
      fileSize: 2 * 1024 * 1000, // 2MB
    },
  }) // 文件上传解析file
  adapter.register(fastifySwagger)

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter)
  // const app = await NestFactory.create(AppModule);

  app.enableCors() // 允许跨域

  app.useGlobalFilters(new HttpExceptionFilter()) // 自定义接口异常详情
  app.useGlobalPipes(new ValidationPipe()) // 数据验证器
  app.useGlobalInterceptors(
    new ResponseInterceptor(), // 自定义接口响应，输出日志
    new ClassSerializerInterceptor(app.get(Reflector)), // 要使entity内的@Exclude生效，需加这个
  )

  const options = new DocumentBuilder()
    .setTitle('nestjs bl')
    .setDescription('nestjs实现的restful接口')
    .setVersion('1.0.0')
    // .setBasePath('http://localhost:5000')
    .build()
  const document = SwaggerModule.createDocument(app, options)
  SwaggerModule.setup('/doc', app, document)

  await app.listen(3000)
  console.log(`App is listen on http://localhost:${3000}`)
}
bootstrap()
