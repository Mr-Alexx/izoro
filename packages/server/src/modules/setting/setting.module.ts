import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuModule } from '../menu/menu.module';
import { SettingController } from './setting.controller';
import { Setting } from './setting.entity';
import { SettingService } from './setting.service';

@Module({
  imports: [TypeOrmModule.forFeature([Setting]), MenuModule],
  controllers: [SettingController],
  providers: [SettingService],
})
export class SettingModule {}
