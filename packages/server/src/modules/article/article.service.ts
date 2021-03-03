import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from '@typegoose/typegoose/lib/types';
import { Article } from './article.model'

@Injectable()
export class ArticleService {
  // constructor(
  //   @InjectModel('Article') private readonly artcleModel: ModelType<Article>
  // ) {}

  /**
   * @desc 获取文章列表
   * @param { any } query 查询参数
   */
  async findAll(query: any = {}): Promise<object> {
    // const articleModel = getModelForClass(Article)
    // try {
    //   const res = await articleModel.find()
    //   console.log('res', res)
    // } catch (err) {
    //   console.error(err)
    // }
    return Promise.resolve({
      total: 2,
      list: [
        { id: 1, title: '测试title', sub_title: 'test', tags: ['测试', 'test'], create_at: new Date().getTime(), updated_at: new Date().getTime(), display: true, published: false, content: '<div>test</div>' },
        { id: 2, title: '测试title', sub_title: 'test', tags: ['测试', 'test'], create_at: new Date().getTime(), updated_at: new Date().getTime(), display: true, published: false, content: '<div>test</div>' }
      ]
    })
  }
}
