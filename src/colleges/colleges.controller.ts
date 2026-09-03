import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CollegesService } from './colleges.service';

@Controller('api/colleges')
export class CollegesController {
  constructor(private readonly service: CollegesService) {}

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
