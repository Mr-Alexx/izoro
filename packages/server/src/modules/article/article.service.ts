import { PublishStatus } from '@/interfaces/status.interface'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import UniqueID from 'nodejs-snowflake'
import { SnowflakeID } from '@/utils/snowflake'
import { In, Repository } from 'typeorm'
import { CategoryService } from '../category/category.service'
import { TagService } from '../tag/tag.service'
import { Article } from './article.entity'
import { CacheService } from './cache.service'

@Injectable()
export class ArticleService {
  public snowflake = new UniqueID({ machineID: 1024 })
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService,
    private readonly cacheService: CacheService,
  ) {}

  /**
   * @desc 获取文章列表
   * @param { any } query 查询参数
   */
  async findAll(queryObj: any = {}): Promise<{ list: any[]; total: number }> {
    console.log(new SnowflakeID().generate(), new SnowflakeID({ mid: +new Date() }).generate())
    const { keyword, cid, status, tags } = queryObj
    let { page, limit, sort } = queryObj

    page = +queryObj.page || 1
    limit = +queryObj.limit || 10
    if (limit > 50) {
      throw new HttpException('非法操作，limit不能超过50条！', HttpStatus.BAD_REQUEST)
    }
    sort = (sort || 'create_at') + ''

    // 取缓存
    const cacheKey = JSON.stringify(queryObj)
    // const cache = await this.cacheService.get(`article:list:${cacheKey}`)
    // if (cache) {
    //   return cache
    // }

    try {
      const query = this.articleRepository
        .createQueryBuilder('article')
        .select(['article.id', 'article.title', 'article.cover', 'article.create_at', 'article.publish_at', 'article.update_at', 'article.status', 'article.password', 'article.views'])
        .innerJoin('article.category', 'category')
        .addSelect('category.name')
        .leftJoin('article.tags', 'tag')
        .addSelect('tag.name')
        // .leftJoinAndSelect('article.category', 'name')
        // .leftJoinAndSelect('article.category', 'category.name')
        // .leftJoinAndSelect('article.tags', 'tag.name')
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy(`article.${sort}`, sort.indexOf('-') > -1 ? 'ASC' : 'DESC')

      console.log(query.getSql())

      keyword && query.andWhere('article.title like :keyword', { keyword })
      cid && query.andWhere('article.categoryId = :cid', { cid })
      status && query.andWhere('article.status = :status', { status })
      Array.isArray(tags) && query.andWhere('article.tags in :tags', { tags })
      // create_at && (where['status'] = {  })
      // tags && (where['tags'] = Like(`%${keyword}%`))
      // ['user.id', 'title', 'summary', 'cover', 'create_at', 'publish_at', 'update_at', 'views', 'status']
      const [list, total] = await query.getManyAndCount()
      // 设置缓存
      this.cacheService.set(`article:list:${cacheKey}`, { list, total })
      return { list, total }
    } catch (err) {
      console.error(err)
    }
  }

  async create(article: Partial<Article>): Promise<any> {
    const id = this.snowflake.getUniqueID()
    try {
      const { status, category } = article
      let { tags } = article
      Object.assign(article, { id })

      if (status === PublishStatus.published) {
        // 此处不用 = 赋值的原因是ts会进行类型检测，不能将string类型赋值给Date类型
        Object.assign(article, {
          publish_at: new Date(),
        })
      }

      if (Array.isArray(tags) && tags.length > 0) {
        tags = await this.tagService.findByIds(tags)
      }

      const existCate = await this.categoryService.findById(Number(category))
      const newArticle = await this.articleRepository.create({
        ...article,
        tags,
        category: existCate,
      })
      await this.articleRepository.save(newArticle)
      return Promise.resolve(id)
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async update(id: string, article: Article): Promise<any> {
    const oldArticle = await this.articleRepository.findOne(id)
    if (!oldArticle) {
      throw new HttpException('该文章不存在，无法更新！', HttpStatus.NOT_FOUND)
    }
    const newArticle = await this.articleRepository.merge(oldArticle, article)
    return await this.articleRepository.save(newArticle)
  }

  // 软删-多个
  async recycleAll(ids: string[]): Promise<string> {
    try {
      await this.articleRepository
        .createQueryBuilder()
        .update(Article)
        .set({ status: -1 })
        .where({ id: In(ids) })
        .execute()
      return Promise.resolve('删除成功！')
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  // 硬删
  async deleteAll(ids: string[]): Promise<string> {
    try {
      await this.articleRepository
        .createQueryBuilder()
        .delete()
        .where({ id: In(ids) })
        .execute()
      return Promise.resolve('删除成功！')
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
