import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('api/jobs')
export class JobsController {
  constructor(private readonly service: JobsService) {}

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
