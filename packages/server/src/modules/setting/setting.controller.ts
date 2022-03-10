import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { SettingService } from './setting.service';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';
import { SettingUpdateDto } from './setting.dto';

@ApiTags('Setting')
@Controller('setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiOperation({ summary: '获取配置' })
  @Get()
  findSetting() {
    return this.settingService.findOne();
  }

  @ApiOperation({ summary: '更新配置' })
  @Post()
  @HttpCode(HttpStatus.OK)
  // @UseGuards(PermissionGuard)
  // @Permission('setting:update')
  // @UseGuards(JwtAuthGuard)
  update(@Body() setting: SettingUpdateDto): Promise<any> {
    console.log('setting', setting);
    return this.settingService.update(setting);
  }
}
