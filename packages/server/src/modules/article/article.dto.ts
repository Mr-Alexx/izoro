import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { PublishStatus } from '@/interfaces/status.interface';

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
  @PrimaryColumn({ comment: 'id（snowflake）', type: 'bigint' })
  id: string; // bigint保存 https://stackoverflow.com/questions/59927625/how-to-store-big-int-in-nest-js-using-typeorm

  // 封面图
  @Column({ default: null, comment: '文章封面图' })
  @IsString()
  cover: string;

  // 标题
  @ApiProperty({ description: '文章标题', example: '谷歌浏览器如何调试？' })
  @IsNotEmpty({ message: '文章标题不能为空！' })
  @IsString({ message: '文章标题类型必须为字符串！' })
  @Length(1, 200)
  @Column({ comment: '文章标题' })
  title: string;

  // 摘要
  @ApiProperty({ description: '文章摘要', example: '利用network调试。。。' })
  @Column({ type: 'text', default: null, comment: '文章摘要' })
  summary: string;

  // 原始markdown内容
  @ApiProperty({ description: '文章原始内容', example: '# 标题1 xxx' })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '文章markdown' })
  content: string;

  // 转化为html的内容，依据content自动生成
  @ApiProperty({ description: '文章转化为html内容', example: '<div>标题1</div>' })
  @Column({ type: 'mediumtext', default: null, charset: 'utf8mb4', comment: '基于markdown生成的html' })
  html: string;

  @ApiProperty({ description: 'markdown主题', example: 'juejin' })
  @Column({ length: 100, comment: 'markdown主题', default: 'juejin' })
  theme: string;

  @ApiProperty({ description: '代码高亮主题', example: 'vs2015' })
  @Column({ length: 100, comment: '代码高亮主题', default: '' })
  highlight: string;

  // 发布状态
  // @IsIn()
  @ApiProperty({ description: '发布状态：-1 回收，0 草稿，1 已发布', example: 1 })
  @Column({
    type: 'enum',
    enum: PublishStatus,
    default: PublishStatus.draft,
    comment: '发布状态：-1 回收，0 草稿，1 已发布',
  })
  status: PublishStatus;

  // 查看人数
  @ApiProperty({ description: '查看人数', example: 100 })
  @Column({ comment: '查看人数', default: 0 })
  views: number;

  @ApiProperty({ description: '密码', example: '123456' })
  @Column({ comment: '密码', default: null })
  password: string;

  // 公开状态
  @ApiProperty({ description: '公开状态', example: 1 })
  @Column({
    type: 'enum',
    enum: PublicStatus,
    default: PublicStatus.public,
    comment: '公开状态：0 公开，1 需要密码，2 私密',
  })
  public_status: PublicStatus;

  // seo关键字
  @ApiProperty({ description: 'SEO关键字', example: 'google google调试' })
  @Column({ comment: 'seo关键字', default: null })
  seo_keywords: string;

  // seo描述
  @ApiProperty({ description: 'SEO描述', example: 'google调试是这样的。。。' })
  @Column({ comment: 'seo描述', default: null })
  seo_description: string;

  // 创建时间
  @ApiProperty({ description: '创建时间', example: '2021-03-03 09:16:25' })
  @CreateDateColumn({
    type: 'datetime',
    comment: '创建时间',
    name: 'created_at',
  })
  created_at: Date;

  // 发布时间
  @ApiProperty({ description: '发布时间', example: '2021-03-03 09:16:25' })
  @Column({
    type: 'datetime',
    comment: '发布时间',
    name: 'publish_at',
    default: null,
  })
  publish_at: Date;

  // 更新时间
  @ApiProperty({ description: '更新时间', example: '2021-03-03 09:16:25' })
  @UpdateDateColumn({
    type: 'datetime',
    comment: '更新时间',
    name: 'updated_at',
  })
  updated_at: Date;

  // 标签--关联标签表
  // @ApiProperty({ description: '关联的标签', example: ['tag1', 'tag2'] })
  @ManyToMany(() => Tag, tag => tag.articles, { cascade: true })
  @JoinTable()
  tags: Array<Tag>;

  // 分类--关联分类表 使用ApiProperty注释会引起循环引用的问题
  // @ApiProperty({ description: '关联的分类', example: '一级分类' })
  @ManyToOne(() => Category, category => category.articles, { cascade: true })
  @JoinTable()
  category: Category;
}
