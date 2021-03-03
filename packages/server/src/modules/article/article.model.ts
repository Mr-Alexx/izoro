/**
 * @desc Article model. 文章模块数据模型
 * @module module/article/model
 * @author 潜
 */

import { modelOptions, prop} from "@typegoose/typegoose";
import { IsIn, IsNotEmpty, IsString, Length } from "class-validator";
import { PublishStatus } from '@/interfaces/status.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose'
import { getProviderByTypegooseClass } from '@/transformers/model.transformer'

// 给添加的数据加入时间戳
@modelOptions({
  schemaOptions: {
    timestamps: true
  }
})
export class Article extends Document {
  // id
  @prop({ unique: true })
  id: Number;

  // 标题
  @ApiProperty({ description: '文章标题', example: '谷歌浏览器如何调试？' })
  @IsNotEmpty({ message: '文章标题不能为空！' })
  @IsString({ message: '文章标题类型必须为字符串！' })
  @Length(1, 200)
  @prop({ required: true, text: true })
  title: String;

  // 副标题
  @ApiProperty({ description: '文章副标题', example: '副标题' })
  @Length(0, 200)
  @prop({ text: true })
  subtitle?: String;

  // 摘要
  @ApiProperty({ description: '文章摘要', example: '利用network调试。。。' })
  @prop({ required: true, text: true })
  summary: String;

  // 内容
  @ApiProperty({ description: '文章内容', example: '<div>测试。。。</div>' })
  @IsNotEmpty({ message: '文章内容不能为空！' })
  @IsString({ message: '文章内容类型必须为字符串！' })
  @prop({ required: true, text: true })
  content: String;

  // 发布状态
  // @IsIn()
  @ApiProperty({ description: '发布状态，-1：回收，0：草稿，1：已发布', example: 1 })
  status: PublishStatus;

  // seo关键字
  @ApiProperty({ description: 'SEO关键字', example: 'google google调试' })
  @Length(0, 500)
  keywords?: String;

  // seo描述
  @ApiProperty({ description: 'SEO描述', example: 'google调试是这样的。。。' })
  @Length(0, 1000)
  description?: String;

  // 创建时间
  @ApiProperty({ description: '创建时间', example: '2021-03-03 09:16:25' })
  @prop({ default: Date.now, index: true })
  create_at?: Date;

  // 更新时间
  @ApiProperty({ description: '更新时间', example: '2021-03-03 09:16:25' })
  @prop({ default: Date.now })
  update_at?: Date;
}

// 导出Provider
export const ArticleProvider = getProviderByTypegooseClass(Article)
