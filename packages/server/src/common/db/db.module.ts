import { Global, Module } from "@nestjs/common";
import dbConfig from '@/config/db.config'
import mongoose from 'mongoose'

@Global()
@Module({
  exports: []
})
export class DbModule {
  async useFactory () {
    let reconnectTimer = null // 重连定时器

    function connect () {
      return mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DATABASE}`, {})
    }
    mongoose.connection.on('connecting', () => console.log('连接mongoose中...'))

    mongoose.connection.on('open', () => {
      console.log('mongoose连接成功！')
      if (reconnectTimer) { // 如果是重连，需要清除定时器
        clearTimeout(reconnectTimer)
        reconnectTimer = null
      }
    })

    mongoose.connection.on('disconnected', () => {
      console.error(`mongoose连接失败，${dbConfig.RECONNECT_INTERVAL / 1000}s后尝试重连！`)
      reconnectTimer = setTimeout(mongoose.connect)
    })

    mongoose.connection.on('error', err => {
      console.error(`连接mongoose时发生异常！`, err)
      mongoose.disconnect()
      // 其它操作，如发邮件提醒
    })
    return await connect()
  }
}
