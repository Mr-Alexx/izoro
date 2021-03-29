import { PublishStatus } from '@/interfaces/status.interface';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';
import UniqueID from 'nodejs-snowflake';
import { In, Like, MoreThan, Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { TagService } from '../tag/tag.service';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  public snowflake = new UniqueID({ machineID: 1024 })
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
    private readonly tagService: TagService,
    private readonly categoryService: CategoryService
  ) {}

  /**
   * @desc 获取文章列表
   * @param { any } query 查询参数
   */
  async findAll(queryObj: any = {}): Promise<object> {
    let {
      page,
      limit,
      keyword,
      cid,
      status,
      tags,
      create_at,
      publish_at,
      sort
    } = queryObj

    page = +queryObj.page || 1
    limit = +queryObj.limit || 20
    sort = (sort || 'create_at') + ''
    try {
      const query = this.articleRepository
        .createQueryBuilder('article')
        .leftJoinAndSelect('article.category', 'category')
        .leftJoinAndSelect('article.tags', 'tag')
        .skip((page - 1) * limit)
        .take(limit)
        .orderBy(`article.${sort}`, sort.indexOf('-') > -1 ? 'DESC' : 'ASC')

      keyword && (query.andWhere('article.title like :keyword', { keyword }))
      cid && (query.andWhere('article.categoryId = :cid', { cid }))
      status && (query.andWhere('article.status = :status', { status }))
      // Array.isArray(tags) && (query.andWhere('article.tags in :tags', { tags }))
      // create_at && (where['status'] = {  })
      // tags && (where['tags'] = Like(`%${keyword}%`))
      const [list, total] = await query.getManyAndCount()
      return { list, total }
    } catch (err) {
      console.error(err)
    }
  }

  async create (article: Partial<Article>): Promise<any> {
    const id = this.snowflake.getUniqueID()
    const { status, category, tags } = article
    if (status === PublishStatus.published) {
      // 此处不用 = 赋值的原因是ts会进行类型检测，不能将string类型赋值给Date类型
      Object.assign(article, {
        publish_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
      })
    }
    try {
      // const newArticle = await this.articleRepository.create({
      //   id,
      //   ...article
      // })
      tags = await this.tagService.findByIds(tags)
      category = await this.categoryService.findById(category) 
      return await this.articleRepository.save(newArticle)
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
