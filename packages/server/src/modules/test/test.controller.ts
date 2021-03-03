/**
 * @desc Test Controller.
 * @file 测试模块路由服务
 * @module module/test/controller
 * @author 潜
 */

import { All, Controller, Delete, Get, Head, Options, Patch, Post, Put } from '@nestjs/common';
import { getModelToken } from "@nestjs/mongoose";
import { TypegooseClass } from "nestjs-typegoose/dist/typegoose-class.interface";

@Controller('test')
export class TestController {
  /**
   * @desc Get
   */
  @Get()
  findAll(): String {
    let a: TypegooseClass;
    console.log(a)
    return getModelToken('Test')
  }

  /**
   * @desc Post
   */
  @Post()
  create(): String {
    return '创建成功'
  }

  /**
   * @desc Put
   */
  @Put()
  put(): String {
    return `put接口`
  }

  /**
   * @desc Delete
   */
  @Delete()
  del(): String {
    return '删除成功'
  }

  /**
   * @desc Patch
   */
  @Patch()
  pat(): String {
    return '什么东西'
  }

  /**
   * @desc Options
   */
  @Options()
  opt(): String {
    return 'Option请求'
  }

  /**
   * @desc Head
   */
  @Head()
  hd(): String {
    return 'Head请求'
  }

  /**
   * @desc All
   */
  @All()
  al(): String {
    return 'All请求'
  }
}
