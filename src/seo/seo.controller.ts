import { Controller, Get, Post, Delete, Body, Query, UseGuards } from '@nestjs/common';
import { SeoService } from './seo.service';
import { Seo } from './schemas/seo.schema';

@Controller('api/seo')
export class SeoController {
  constructor(private readonly seoService: SeoService) {}

  @Get()
  async getAll(): Promise<Seo[]> {
    return this.seoService.findAll();
  }

  @Get('by-route')
  async getByRoute(@Query('route') route: string): Promise<Seo | null> {
    return this.seoService.findByRoute(route);
  }

  @Post()
  async save(@Body() dto: Partial<Seo>): Promise<Seo> {
    return this.seoService.upsert(dto);
  }

  @Delete()
  async delete(@Query('route') route: string) {
    return this.seoService.delete(route);
  }
}
