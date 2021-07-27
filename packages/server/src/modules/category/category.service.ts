import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from './category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryReposity: Repository<Category>,
  ) {}

  /**
   * @desc 查找分类列表
   * @return { array } 树形结构
   */
  async findAll(query: { page: number; limit: number }): Promise<any> {
    let { page, limit } = query;
    page = page || 1;
    limit = limit || 20;

    const [list, total] = await this.categoryReposity.findAndCount();
    return {
      list,
      total,
    };
  }

  /**
   * @desc 创建分类
   */
  async create(category: Partial<Category>): Promise<any> {
    let { pid } = category;
    pid = pid || 0;
    const existCategory = await this.categoryReposity.find({
      where: { name, pid },
    });

    if (existCategory.length > 0) {
      throw new HttpException('该分类已存在！', HttpStatus.BAD_REQUEST);
    }
    if (pid) {
      const existParentCategory = await this.categoryReposity.findOne(pid);
      if (!existParentCategory) {
        throw new HttpException('非法操作，父类不存在', HttpStatus.NOT_FOUND);
      }
    }
    const newCategory = await this.categoryReposity.create(category);
    await this.categoryReposity.save(newCategory);
    return Promise.resolve(null);
  }

  /**
   * @desc 更新分类信息
   */
  async updateById(category: Partial<Category>): Promise<any> {
    const { id } = category;
    const oldCategory = await this.categoryReposity.findOne({ where: { id } });
    const updateCategory = await this.categoryReposity.merge(oldCategory, category);
    await this.categoryReposity.save(updateCategory);
    return Promise.resolve(null);
  }

  async findById(id: number): Promise<Category> {
    return await this.categoryReposity.findOne(id);
  }

  /**
   * @desc 删除分类
   * https://typeorm.biunav.com/zh/find-options.html#%E8%BF%9B%E9%98%B6%E9%80%89%E9%A1%B9
   */
  async delete(ids: number[]): Promise<null> {
    await this.categoryReposity
      .createQueryBuilder()
      .delete()
      .where({ id: In(ids) })
      .execute();
    return Promise.resolve(null);
  }
}
