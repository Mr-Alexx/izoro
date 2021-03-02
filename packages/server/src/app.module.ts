import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import db from '@/config/db.config'

// 全局模块（公用）
import { DbModule } from '@/common/db/db.module'

// 业务模块
import { TestModule } from './modules/test/test.module'
import { ArticleModule } from './modules/article/article.module' // 文章模块

@Module({
  imports: [
    // DbModule,
    MongooseModule.forRoot(`mongodb://${db.user}:${db.pwd}@${db.host}:${db.port}/${db.database}`),
    TestModule,
    ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
