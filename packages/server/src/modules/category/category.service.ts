import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Category } from "./category.entity";

@Injectable()
export class CategoryService {
  constructor (
    @InjectRepository(Category)
    private readonly categoryReposity: Repository<Category>
  ) {}

  /**
   * @desc 查找分类列表
   * @return { array } 树形结构
   */
  async findAll (query) {
    let { page, limit } = query
    page = page || 1
    limit = limit || 20

    const [list, total] = await this.categoryReposity.findAndCount()
    return {
      list,
      total
    }
  }

  /**
   * @desc 更新分类信息
   */
  async updateById (category): Promise<null> {
    const { id } = category
    const oldCategory = await this.categoryReposity.findOne({ where: { id  } })
    const updateCategory = await this.categoryReposity.merge(oldCategory, category)
    await this.categoryReposity.save(updateCategory)
    return Promise.resolve(null)
  }

  /**
   * @desc 删除分类
   * https://typeorm.biunav.com/zh/find-options.html#%E8%BF%9B%E9%98%B6%E9%80%89%E9%A1%B9
   */
  async delete (ids: number[]): Promise<null> {
    const categories = await this.categoryReposity.find({ where: {
      id: In(ids)
    }})
    await this
      .categoryReposity
      .createQueryBuilder()
      .delete()
      .where({ id: In(ids) })
      .execute()
    return Promise.resolve(null)
  }
}
