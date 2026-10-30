import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { LawsCategoriesService } from './laws-categories.service';

@Controller('api/laws-categories')
export class LawsCategoriesController {
  constructor(private readonly service: LawsCategoriesService) { }

  @Get()
  async getAll() {
    return this.service.findAll();
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
