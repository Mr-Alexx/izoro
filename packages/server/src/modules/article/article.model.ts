/**
 * @desc Article model. 文章模块数据模型
 * @module module/article/model
 * @author 潜
 */

import { prop } from "@typegoose/typegoose";
import { IsIn, IsNotEmpty, IsString, Length } from "class-validator";
import { PulishStatus } from '@interfaces/status.interface'

export class Article {
  // id
  @prop({ unique: true })
  id: Number;

  // 标题
  @IsNotEmpty({ message: '文章标题不能为空！' })
  @IsString({ message: '文章标题类型必须为字符串！' })
  @Length(1, 200)
  @prop({ required: true, text: true })
  title: String;

  // 副标题
  @Length(0, 200)
  @prop({ text: true })
  subtitle?: String;

  // 摘要
  @prop({ required: true, text: true })
  summary: String;

  // 内容
  @IsNotEmpty({ message: '文章内容不能为空！' })
  @IsString({ message: '文章内容类型必须为字符串！' })
  @prop({ required: true, text: true })
  content: String;

  // 发布状态
  // @IsIn()
  status: PulishStatus;

  // seo关键字
  @Length(0, 500)
  keywords?: String;

  // seo描述
  @Length(0, 1000)
  description?: String;

  // 创建时间
  @prop({ default: Date.now, index: true })
  create_at?: Date;

  // 更新时间
  @prop({ default: Date.now })
  update_at?: Date;
}
 