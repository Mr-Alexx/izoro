/**
 * @desc Test service.
 * @file 测试模块数据服务
 * @module module/test/service
 * @author 潜
 */
import { Injectable } from "@nestjs/common"

@Injectable()
export class TestService {
  private readonly tagsCache: any[] = []

  public getTest(): Object {
    return {
      code: 1,
      msg: 'success',
      data: {
        name: 'test',
        url: 'https://www.baidu.com'
      }
    }
  }
}
