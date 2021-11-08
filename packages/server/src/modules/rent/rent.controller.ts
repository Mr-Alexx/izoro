import { Body, Controller, Delete, Get, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@/guards/jwt-auth.guard';
import { Rent } from './rent.entity';
import { RentService } from './rent.service';
import { Permission } from '@/decorators/permission.decorator';
import { PermissionGuard } from '@/guards/permission.guard';

@ApiTags('Rent')
@Controller('rent')
export class RentController {
  constructor(private readonly rentService: RentService) {}

  @ApiOperation({ summary: 'zufang信息列表' })
  @Get()
  findAll(@Query() query: Record<string, any>): Promise<any> {
    return this.rentService.findAll(query);
  }

  @ApiOperation({ summary: '新增' })
  @Post()
  create(@Body() rents: Rent[]): Promise<any> {
    return this.rentService.create(rents);
  }

  // @ApiOperation({ summary: '删除标签' })
  // @Delete()
  // @UseGuards(PermissionGuard)
  // @Permission('tag:del')
  // @UseGuards(JwtAuthGuard)
  // delete(@Body() body: Record<string, any>): Promise<any> {
  //   const { ids } = body;
  //   return this.rentService.delete(ids);
  // }
}
