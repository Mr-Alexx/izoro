import { Module } from '@nestjs/common';

// 测试模块
import { TestModule } from './modules/test/test.controller'

@Module({
  imports: [],
  controllers: [TestModule],
  providers: [],
})
export class AppModule {}
