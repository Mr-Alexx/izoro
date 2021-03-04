import { Module } from '@nestjs/common';
import dbConfig from '@/config/db.config'
import { TypeOrmModule } from '@nestjs/typeorm';

// 全局模块（公用）
// import { DbModule } from '@/common/db/db.module'

// 业务模块
import { ArticleModule } from './modules/article/article.module' // 文章模块
import { TagModule } from './modules/tag/tag.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async () => ({
        type: 'mysql',
        entities: [`${__dirname}/modules/**/*.entity{.ts,.js}`],
        ...dbConfig
      })
    }),
    ArticleModule,
    TagModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
