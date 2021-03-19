import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import UniqueID from 'nodejs-snowflake';
import { Repository } from 'typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  public snowflake = new UniqueID({ machineID: 1024 })
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>
  ) {}

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

  async create (article: Article): Promise<any> {
    const id = this.snowflake.getUniqueID()

    try {
      const newArticle = await this.articleRepository.create({
        id,
        ...article
      })
      return await this.articleRepository.save(newArticle)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(article: Article): Promise<any> {
    const oldArticle = await this.articleRepository.findOne({ where: { id: article.id } })
    const newArticle = await this.articleRepository.merge(oldArticle, article)
    return await this.articleRepository.save(newArticle)
  }
}
