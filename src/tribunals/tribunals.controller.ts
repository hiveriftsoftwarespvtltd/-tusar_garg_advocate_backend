import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TribunalsService } from './tribunals.service';

@Controller('api/tribunals')
export class TribunalsController {
  constructor(private readonly service: TribunalsService) {}

  @Get()
  async getAll() {
    return this.service.findAll();
  }

  @Get('slug/:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.service.findBySlug(slug);
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
