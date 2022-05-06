import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublishStatus, PublicStatus } from '@/interfaces/status.interface';
import { Tag } from '../tag/tag.entity';
import { Category } from '../category/category.entity';

// 查询参数
export class ArticleQueryDto {
  @ApiPropertyOptional({
    description: '发布开始时间',
    example: '2021-03-04 22:53:00',
  })
  readonly pulish_at_start?: string;

  @ApiPropertyOptional({
    description: '发布结束时间',
    example: '2021-03-04 22:53:00',
  })
  readonly pulish_at_end?: string;

  @ApiPropertyOptional({
    description: '创建开始时间',
    example: '2021-03-04 22:53:00',
  })
  readonly created_at_start?: string;

  @ApiPropertyOptional({
    description: '创建结束时间',
    example: '2021-03-04 22:53:00',
  })
  readonly created_at_end?: string;

  @ApiPropertyOptional({
    description: '标签id，多个用英文逗号分开',
    example: '1, 2',
  })
  readonly tags?: string;
  @ApiPropertyOptional({
    description: '分类id',
    example: 1,
  })
  readonly cid?: string | number;
  @ApiPropertyOptional({
    description: '发布状态',
    example: PublishStatus.published,
  })
  readonly publish_status?: PublishStatus;

  @ApiPropertyOptional({
    description: '搜索关键词',
    example: '测试',
  })
  readonly keyword?: string;

  @ApiProperty({
    description: '每页条数',
    example: 20,
  })
  readonly limit: number;

  @ApiProperty({
    description: '页码',
    example: 1,
  })
  readonly page: number;
}

// 创建参数
export class ArticleCreateDto {
  @ApiPropertyOptional({
    description: '封面图url',
  })
  readonly cover: string;

  // 标题
  @ApiProperty({ description: '文章标题', example: '谷歌浏览器如何调试？', minLength: 1, maxLength: 200 })
  title: string;

  // 摘要
  @ApiProperty({ description: '文章摘要', example: '利用network调试。。。', minLength: 1, maxLength: 100 })
  summary: string;

  // 原始markdown内容
  @ApiProperty({ description: '文章原始内容', example: '# 标题1 xxx', default: null })
  markdown: string;

  // 转化为html的内容，依据markdown自动生成
  @ApiProperty({ description: '文章转化为html内容', example: '<div>标题1</div>' })
  html: string;

  @ApiPropertyOptional({ description: 'markdown主题', example: 'juejin' })
  theme: string;

  @ApiPropertyOptional({ description: '代码高亮主题', example: 'vs2015' })
  highlight: string;

  // 发布状态
  // @IsIn()
  @ApiProperty({ description: '发布状态：-1 回收，0 草稿，1 已发布' })
  status: number;

  // 查看人数
  @ApiPropertyOptional({ description: '查看人数', example: 100 })
  views: number;

  @ApiPropertyOptional({ description: '密码', example: '123456' })
  password: string;

  // 公开状态
  @ApiProperty({ description: '公开状态：0 公开，1 需要密码，2 私密' })
  public_status: number;

  // seo关键字
  @ApiPropertyOptional({ description: 'SEO关键字', example: 'google google调试', default: null })
  seo_keywords: string;

  // seo描述
  @ApiPropertyOptional({ description: 'SEO描述', example: 'google调试是这样的。。。', default: null })
  seo_description: string;

  // 标签--关联标签表
  @ApiProperty({ description: '关联的标签', example: ['tag1', 'tag2'] })
  tags: Array<Tag>;

  // 分类--关联分类表 使用ApiProperty注释会引起循环引用的问题
  @ApiProperty({ description: '关联的分类', example: '一级分类' })
  category: Category;
}

// 编辑参数
export class ArticleEditDto extends ArticleCreateDto {
  @ApiPropertyOptional({ description: '文章id', example: 1 })
  readonly id?: string;
}
