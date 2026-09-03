import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { JudiciaryService } from './judiciary.service';

@Controller('api/judiciary')
export class JudiciaryController {
  constructor(private readonly judiciaryService: JudiciaryService) {}

  @Get()
  async findAll() {
    return this.judiciaryService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.judiciaryService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.judiciaryService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.judiciaryService.update(id, body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.judiciaryService.delete(id);
  }
}
