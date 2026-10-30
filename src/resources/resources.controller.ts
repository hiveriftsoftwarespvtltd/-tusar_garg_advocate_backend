import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller('api/resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) {}

  @Get()
  async findAll() {
    return this.resourcesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.resourcesService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.resourcesService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.resourcesService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.resourcesService.delete(id);
  }
}
