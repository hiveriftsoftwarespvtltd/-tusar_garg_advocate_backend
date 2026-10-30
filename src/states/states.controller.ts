import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { StatesService } from './states.service';

@Controller('api/states')
export class StatesController {
  constructor(private readonly statesService: StatesService) {}

  @Get()
  async getPublishedStates() {
    return this.statesService.findPublished();
  }

  @Get(':slug')
  async getStateBySlug(@Param('slug') slug: string) {
    return this.statesService.findBySlug(slug);
  }

  @Post()
  async createState(@Body() body: any) {
    return this.statesService.create(body);
  }

  @Put(':id')
  async updateState(@Param('id') id: string, @Body() body: any) {
    return this.statesService.update(id, body);
  }

  @Delete(':id')
  async deleteState(@Param('id') id: string) {
    return this.statesService.delete(id);
  }
}
