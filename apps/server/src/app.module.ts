/**
 * @description 应用模块集合
 * @author 潜
 */

import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import dbConfig from '@/config/db.config';
import { TypeOrmModule } from '@nestjs/typeorm';

/** 全局模块（公用） */
// import { DbModule } from '@/common/db/db.module'

/** 业务模块 */
import { ArticleModule } from './modules/article/article.module'; // 文章模块
import { TagModule } from './modules/tag/tag.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { FileModule } from './modules/file/file.module';
import { MenuModule } from './modules/menu/menu.module';
import { RoleModule } from './modules/role/role.module';
import { CommonModule } from './modules/common/common.module';
import { ScheduleModule } from '@nestjs/schedule';
import { CacheModule } from './modules/cache/cache.module';
// import { TasksService } from './schedule/tasks.service';
import { ScheduleModule as TaskModule } from '@/modules/schedule/schedule.module';
import { TagController } from './modules/tag/tag.controller';
import { SettingModule } from './modules/setting/setting.module';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        entities: [`${__dirname}/modules/**/*.entity{.ts,.js}`],
        ...dbConfig,
      }),
    }),
    // /**
    //  * cache模块
    //  * @see https://www.npmjs.com/package/cache-manager-redis-store
    //  * @see https://www.zhangshengrong.com/p/Z9a23xlyNV/
    //  */
    // CacheModule.register({
    //   ...redisConfig,
    //   store: redisStore,
    // }),
    CommonModule,
    CacheModule,
    ArticleModule,
    TagModule,
    UserModule,
    AuthModule,
    CategoryModule,
    FileModule,
    MenuModule,
    RoleModule,
    // ScheduleModule.forRoot(),
    // TaskModule,
    SettingModule,
  ],
  // providers: [TasksService],
})
export class AppModule {}
