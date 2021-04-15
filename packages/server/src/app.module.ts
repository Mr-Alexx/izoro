/**
 * @format
 * @description 应用模块集合
 * @author 潜
 */

import { Module } from '@nestjs/common'
import dbConfig from '@/config/db.config'
import { TypeOrmModule } from '@nestjs/typeorm'

// 全局模块（公用）
// import { DbModule } from '@/common/db/db.module'

// 业务模块
import { ArticleModule } from './modules/article/article.module' // 文章模块
import { TagModule } from './modules/tag/tag.module'
import { UserModule } from './modules/user/user.module'
import { AuthModule } from './modules/auth/auth.module'
import { CategoryModule } from './modules/category/category.module'
import { FileModule } from './modules/file/file.module'

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        entities: [`${__dirname}/modules/**/*.entity{.ts,.js}`],
        ...dbConfig,
      }),
    }),
    ArticleModule,
    TagModule,
    UserModule,
    AuthModule,
    CategoryModule,
    FileModule,
  ],
  providers: [],
})
export class AppModule {}
