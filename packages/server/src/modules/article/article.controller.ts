import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ArticleService } from './article.service';
// import { Article } from './article.model';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PublishStatus } from '@/interfaces/status.interface';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Article } from './article.entity';
import { Permission } from '@/decorators/permission.decorator';
import { ArticleCreateDto, ArticleQueryDto, ArticleEditDto } from './article.dto';

// @Crud({
//   model: Article // Article采用增删改查接口模式
// })
@Controller('article')
@ApiTags('Article')
export class ArticleController {
  // 注入service，this调用
  constructor(private readonly articleService: ArticleService) {}

  /**
   * @create 2021/03/04 21:48
   * @desc 获取文章列表
   * @author 潜
   */
  @ApiOperation({ summary: '文章列表' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() query: ArticleQueryDto): Promise<any> {
    return this.articleService.findAll(query);
  }

  /**
   * @description id查找
   */
  @Get(':id')
  findById(@Param('id') id: string): Promise<Article> {
    return this.articleService.findById(id);
  }

  @ApiOperation({ description: '创建文章' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Permission('article:add')
  @UseGuards(JwtAuthGuard)
  async create(@Body() article: ArticleCreateDto): Promise<any> {
    return await this.articleService.create(article);
  }

  @ApiOperation({ description: '编辑文章' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @Permission('article:edit')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() article: ArticleEditDto): Promise<any> {
    return await this.articleService.update(id, article);
  }

  /**
   * @description 文章删除-软删
   */
  @Patch('delete')
  @HttpCode(HttpStatus.OK)
  @Permission('article:del')
  @UseGuards(JwtAuthGuard)
  async recycleAll(@Body('ids') ids: string[]): Promise<any> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('非法操作！ids数组不能为空！', HttpStatus.BAD_REQUEST);
    }
    return this.articleService.recycleAll(ids);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  @Permission('article:del')
  @UseGuards(JwtAuthGuard)
  async deleteAll(@Body('ids') ids: string[]): Promise<any> {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new HttpException('非法操作！ids数组不能为空！', HttpStatus.BAD_REQUEST);
    }
    return await this.articleService.deleteAll(ids);
  }
}
