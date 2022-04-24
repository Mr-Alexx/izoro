import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublishStatus, PublicStatus } from '@/interfaces/status.interface';

// 创建参数
export class SettingUpdateDto {
  @ApiPropertyOptional({ description: 'logo' })
  logo: string;

  @ApiPropertyOptional({ description: 'favicon' })
  favicon: string;

  @ApiPropertyOptional({ description: '站点名称' })
  site_name: string;

  @ApiPropertyOptional({ description: 'seo keyword', maxLength: 200 })
  seo_keyword: string;

  @ApiPropertyOptional({ description: 'seo description', maxLength: 500 })
  seo_description: string;

  @ApiPropertyOptional({ description: '百度统计id' })
  baidu_analysis_id: string;

  @ApiPropertyOptional({ description: '谷歌分析id' })
  google_analysis_id: string;

  @ApiPropertyOptional({ description: 'sentry js sdk' })
  sentry_sdk: string;

  @ApiPropertyOptional({ description: 'sentry dsn key' })
  sentry_dsn_key: string;
}
