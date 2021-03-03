/**
 * @create 2021/03/03 23:15
 * @desc 模型转换器，将基本的 Typegoose 模型转换为 Model 和 Provider，及模型注入器
 * @fork from: https://github.com/kpfromer/nestjs-typegoose/blob/master/src/typegoose.providers.ts
 * @fork <https://github.com/surmon-china>
 * @module transformer/model
 * @author 潜
 */

import { Connection } from 'mongoose'
import { Inject, Provider } from "@nestjs/common";
import { getModelToken } from "@nestjs/mongoose"; // ex: getModelToken('Test') => 'TestModel'
import { TypegooseClass } from "nestjs-typegoose/dist/typegoose-class.interface";
import { getModelForClass } from '@typegoose/typegoose';
import db from '@/config/db.config'

// 根据Class获取Provider
export function getProviderByTypegooseClass(typegooseClass: TypegooseClass): Provider {
  return {
    provide: getModelToken(typegooseClass.name),
    useFactory: (connection: Connection) => {
      return getModelForClass(typegooseClass, {
        existingConnection: connection
      })
    },
    inject: [db.connect_token]
  }
}

// Model注入器
export function InjectModel(model: TypegooseClass) {
  return Inject(getModelToken(model.name))
}
