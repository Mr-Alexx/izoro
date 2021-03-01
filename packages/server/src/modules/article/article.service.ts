import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  /**
   * @desc Get all articles
   * @param { any } query 查询参数
   */
  findAll(query: any = {}): Promise<object> {
    return Promise.resolve({
      total: 2,
      list: [
        { id: 1, title: '测试title', sub_title: 'test', tags: ['测试', 'test'], create_at: new Date().getTime(), updated_at: new Date().getTime(), display: true, published: false, content: '<div>test</div>' },
        { id: 2, title: '测试title', sub_title: 'test', tags: ['测试', 'test'], create_at: new Date().getTime(), updated_at: new Date().getTime(), display: true, published: false, content: '<div>test</div>' }
      ]
    })
  }
}
