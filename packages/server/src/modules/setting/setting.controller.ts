import { Body, Controller, Get, HttpCode, HttpStatus, UseGuards, Patch } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { SettingService } from './setting.service';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';
import { SettingUpdateDto } from './setting.dto';
import { PERMISSIONS } from '@/constants/permission.constant';

@UseGuards(PermissionGuard)
@Controller('setting')
@ApiTags('Setting')
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @ApiOperation({ summary: '获取配置' })
  @Get()
  findSetting() {
    return this.settingService.findOne();
  }

  @ApiOperation({ summary: '更新配置' })
  @Patch()
  @HttpCode(HttpStatus.OK)
  @Permission(PERMISSIONS.编辑系统配置)
  @UseGuards(JwtAuthGuard)
  update(@Body() setting: SettingUpdateDto): Promise<any> {
    return this.settingService.update(setting);
  }
}
