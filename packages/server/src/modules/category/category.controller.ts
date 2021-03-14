import { Controller, Get, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CategoryService } from "./category.service";

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor (
    private readonly categoryService: CategoryService
  ) {}

  @ApiOperation({ summary: '分类列表' })
  @Get()
  findAll (@Query() query): Promise<object> {
    return this.categoryService.findAll(query)
  }
}
