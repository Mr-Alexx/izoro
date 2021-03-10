import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'; // api文档插件
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';
import fastifyCsrf from 'fastify-csrf';
import fastifyHelmet from 'fastify-helmet';
import fastifyRateLimit from 'fastify-rate-limit';
import fastifyCompress from 'fastify-compress';
import fastifyCookie from 'fastify-cookie';
import { errorLogger } from './logger/log4.logger';

async function bootstrap() {
  const adapter = new FastifyAdapter()
  adapter.register(fastifyRateLimit, { // 限制单ip单位时间访问频率
    timeWindow: 1000 * 60, // 单位时间ms
    max: 500, // 单位时间内最多访问次数
    errorResponseBuilder (req, ctx) {
      const error = {
        code: 429,
        success: false,
        msg: `访问受限，请${ctx.after}后再试！`,
        _t: new Date().getTime()
      }
      errorLogger.error(req.url, error)
      return error
    }
  })
  adapter.register(fastifyCookie) // 使用fastifyCsrf必须引入此插件
  adapter.register(fastifyCsrf) // 防跨站点请求伪造
  adapter.register(fastifyHelmet) // 通过适当地设置 HTTP 头，Helmet 可以帮助保护您的应用免受一些众所周知的 Web 漏洞的影响
  adapter.register(fastifyCompress) // 压缩请求

  const app = await NestFactory.create<NestFastifyApplication>(AppModule, adapter)
  // const app = await NestFactory.create(AppModule);

  app.enableCors() // 允许跨域

  app.useGlobalFilters(new HttpExceptionFilter()) // 自定义接口异常详情
  app.useGlobalPipes(new ValidationPipe()) // 数据验证器
  app.useGlobalInterceptors(new ResponseInterceptor()) // 自定义接口响应，输出日志

  // DocumentBuilder是一个辅助类，有助于结构的基本文件SwaggerModule。它包含几种方法，可用于设置诸如标题，描述，版本等属性。
  const options = new DocumentBuilder()
    .setTitle('nestjs swagger测试文档')
    .setDescription('nestjs实现的restful接口')
    .setVersion('1.0.0')
    // .addTag('文章模块') // 每个tag标签都可以对应着几个@ApiUseTags('用户,安全') 然后被ApiUseTags注释，字符串一致的都会变成同一个标签下的
    // .setBasePath('http://localhost:5000')
    .build();
  // 为了创建完整的文档（具有定义的HTTP路由），我们使用类的createDocument()方法SwaggerModule。此方法带有两个参数，分别是应用程序实例和基本Swagger选项。
  const document = SwaggerModule.createDocument(app, options);
   // 最后一步是setup()。它依次接受（1）装入Swagger的路径，（2）应用程序实例, （3）描述Nest应用程序的文档。
  SwaggerModule.setup('/api-doc', app, document);

  await app.listen(3000);
  console.log(`App is listen on http://localhost:${3000}`)
}
bootstrap();
