import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
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
}
