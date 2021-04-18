## Nest project
1. 全局安装lerna `npm i lerna -g`
2. 安装依赖 `npm run install`
3. 运行项目 `npm run dev`

## Nest 中文文档
[https://docs.nestjs.cn/7](https://docs.nestjs.cn/7)

## 参考
1. [nodepress](https://github.com/surmon-china/nodepress)  
2. [wipi](https://github.com/fantasticit/wipi)

nest-cli 创建控制器快捷方法
`nest g controller 控制器名称`

## 依赖说明
+ `@typegoose/typegoose`  解决单独定义interface和model时修改model又要修改interface的情形，包装了一些装饰器解决这些痛点

https://blog.csdn.net/weixin_43595755/article/details/113786870
https://github.com/definitelytyped/definitelytyped/issues/49950

dbpath=/usr/local/mongodb/db #数据文件保存地址
logpath=/usr/local/mongodb/logs/mongodb.log  #日志保存地址
port=27017  #端口
fork=true #是否后台启动
auth=true #是否开启权限，访问需要用户名和密码
bind_ip=0.0.0.0  #任意ip都能访问
logappend=true

## mongo安装与启动
参考：[https://www.pianshen.com/article/648772922/](https://www.pianshen.com/article/648772922/)
mongodb密码和传统数据如mysql等有些区别： mongodb的用户名和密码是基于特定数据库的，而不是基于整个系统的。所有数据库db都需要设置密码。

1. 查看所有数据库
`show dbs`

2. 进入admin数据库
`use admin`

3. 创建管理员账号
`db.createUser({ user: "admin", pwd: "qq!@#$1234", roles: [{ role: "userAdminAnyDatabase", db: "admin" }] })`
mongodb中的用户是基于身份role的，该管理员账户的 role是 userAdminAnyDatabase。admin用户用于管理账号，不能进行关闭数据库等操作

4. 创建root
`db.createUser({user: "root",pwd: "qq$#@!4321", roles: [ { role: "root", db: "admin" } ]})`
创建完admin管理员，创建一个超级管理员root。角色：root。root角色用于关闭数据库。
`db.shutdownServer()`

5. 创建用户自己的数据库的管理角色
`use qian`
`db.createUser({user: "qian",pwd: "qian!@123",roles: [ { role: "readWrite", db: "qian" } ]})`
role: "dbOwner"代表数据库所有者角色，拥有最高该数据库最高权限。比如新建索引等当账号管理员和超级管理员，可以为自己的数据库创建用户了。（坑）这时候一定，一定要切换到所在数据库上去创建用户，不然创建的用户还是属于admin。

如果是读写角色的话，权限设置为role: "readWrite"

6. 查看用户
`show users`

7. 删除用户
删除用户必须由账号管理员来删，所以，切换到admin角色
`use admin`
`db.auth("admin","password")`

删除单个用户
`db.system.users.remove({user:"XXXXXX"})`

删除所有用户
`db.system.users.remove({})`

8. 连接mongo
可以使用：`mongodb://youruser:yourpassword2@localhost/yourdatabase` 来连接到你的mongo
mongodb://root:qq$#@!4321@localhost/qian
db.auth("user", "pwd")


## nest操作mongo，定义model并生成swagger接口文档
[https://segmentfault.com/a/1190000021868839?utm_source=tag-newest](https://segmentfault.com/a/1190000021868839?utm_source=tag-newest)

nest分析
[https://zhuanlan.zhihu.com/p/161928960](https://zhuanlan.zhihu.com/p/161928960)

[nest swagger](https://liubf.com/2020/01/11/nestjs%e5%85%a5%e9%97%a8swagger%ef%bc%8c%e5%bf%ab%e9%80%9f%e6%90%ad%e5%bb%barestfulapi%e6%96%87%e6%a1%a3/)

### provider说明
[provider含义、使用](https://www.jianshu.com/p/bbed4b83370a)


## Mysql
1. 时间类型比较：`timestamp`和`datetime`
timestamp: 4字节，与时区有关，不同时区显示时间不一样
datetime: 8字节，与时区无关

## 响应拦截、全局错误处理
[https://blog.csdn.net/kuangshp128/article/details/97240664](https://blog.csdn.net/kuangshp128/article/details/97240664)

## docker部署sentry
参考[Sentry部署](https://www.bookstack.cn/read/node-in-debugging/6.5Sentry.md)  

1. 安装docker，宝塔内有一键安装

2. 启动redis容器，命名为 `sentry-redis`  
```shell
docker run -d --name sentry-redis redis
```  

3. 启动一个postgres容器，命名为 `sentry-postgress`，配置初始用户和密码（USER和PASSWORD字段）   
```shell
docker run -d --name sentry-postgress -e POSTGRES_PASSWORD=secret -e POSTGRES_USER=sentry postgres
```  

4. 生成一个sentry的秘钥  
```shell
docker run --rm sentry config generate-secret-key
```  
生成完后保存秘钥，如：`p&03jv^yh*p5qn9cip_85=w88uuet+(vonhx8uxd(d#ulu^!71`  

5. 如果是第一次运行，要运行update  
```shell
docker run -it --rm -e SENTRY_SECRET_KEY='生成的秘钥' --link sentry-postgres:postgres --link sentry-redis:redis sentry upgrade
```  
按步骤填写邮箱和密码（sentry管理员账号和密码）

6. 启动sentry，暴露 `9000` 端口  
```shell
docker run -d --name my-sentry -e SENTRY_SECRET_KEY='你的秘钥' --link sentry-redis:redis --link sentry-postgres:postgres -p 9000:9000 sentry
```  

7. 启动 Celery cron 和 Celery workers（？？？）  
提示：Celery 是用 Python 写的一个分布式任务调度模块。  
```shell
docker run -d --name sentry-cron -e SENTRY_SECRET_KEY='你的秘钥' --link sentry-postgres:postgres --link sentry-redis:redis sentry run cron
```    

```shell
docker run -d --name sentry-worker-1 -e SENTRY_SECRET_KEY='你的秘钥' --link sentry-postgres:postgres --link sentry-redis:redis sentry run worker
```   

## nest接口字段错误信息关联数据库实体数据验证
参考[nestjs管道](https://docs.nestjs.cn/7/pipes?id=%e7%ae%a1%e9%81%93)  
1. 安装 `class-validator` 和 `class-transformer` 两个插件  
```shell
npm install class-validator class-transformer  
```

2. `entity` 文件内定义 `column` 时，添加 `class-validator` 定义验证信息  
ex: `/modules/user/user.entity.ts`
```typescript
import { IsEmail, IsNotEmpty } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;

  @IsEmail({ message: '账号必须为邮箱' })
  @IsNotEmpty({ message: '账号不能为空' })
  @Column({ comment: '账号' })
  account: String;

  @IsNotEmpty({ message: '密码不能为空' })
  @Column({ comment: '密码' })
  password: String;
}
```

3. 新建 `/pipes/validation.pipe.ts` 文件，根据 `entity` 的定义验证数据  
ex:
```typescript
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }
    const object = plainToClass(metatype, value)
    const errors = await validate(object)
    if (errors.length > 0) {
      // entity定义的验证信息合并返回
      const errorMessage = errors.map(error => {
        return Object.values(error.constraints).join(';')
      }).join(';')
      throw new BadRequestException(errorMessage)
    }
    return value
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
```  

3. 在 `controller` 里定义路由方法时，参数需要关联 `实体`  
ex: `/modules/user/user.controller.ts`
```typescript
import { Body, Controller, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor (
    private readonly userService: UserService
  ) {}

  // user参数必须关联User实体，才能使用class-validator定义的验证信息
  @Post()
  async register (@Body() user: User): Promise<Object> {
    return this.userService.create(user)
  }
}
```  

4. 最后一步，在 `main.ts` 内将 `ValidationPipe` 定义为全局的管道器  
```typescript
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';
import { ValidationPipe } from './pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule);

  app.enableCors() // 允许跨域

  app.useGlobalFilters(new HttpExceptionFilter()) // 自定义接口异常详情
  app.useGlobalPipes(new ValidationPipe()) // 数据验证器
  app.useGlobalInterceptors(new ResponseInterceptor()) // 自定义接口响应，输出日志

  await app.listen(3000);
  console.log(`App is listen on http://localhost:${3000}`)
}
bootstrap();
```

## 宝塔公益4040
[404公益](https://www.dnpw.org/cn/pa-notfound.html?bt)

[miantijing](https://v2ee.cn/)

## Entity内@Exclude()装饰器不生效生效问题
`@Exclude`的作用是当在`entity`实体取出数据时忽略改属性  
```typescript
// test.entity.ts
@Entity()
export class TestEntity {
  account: string;

  @Exclude()
  password: string;
}
```  

需在`main.ts`内增加如下配置
```typescript
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // ....
  
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)) // 关键配置
  )
}
```

## Mac 安装Redis
> [redis安装教程](https://blog.csdn.net/realize_dream/article/details/106227622)  

> [redis管理工具](https://gitee.com/qishibo/AnotherRedisDesktopManager/releases).  

## 关于long id
[知乎：雪花算法生成的id是全球唯一吗？](https://www.zhihu.com/question/447384625)
[node snowflake](https://github.com/utkarsh-pro/nodejs-snowflake#readme)

## Redis 安装
[windows](https://www.cnblogs.com/liuqingzheng/p/9831331.html)

## windows mysql
[重置密码](https://blog.csdn.net/qq_36894378/article/details/107043741)
[navicat 15](https://www.cnblogs.com/cyfblogs/p/13518305.html)
