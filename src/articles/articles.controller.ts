import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ArticlesService } from './articles.service';

@Controller('api/articles')
export class ArticlesController {
  constructor(private readonly service: ArticlesService) {}

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.service.delete(id);
  }
}
