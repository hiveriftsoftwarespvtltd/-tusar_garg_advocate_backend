import { Controller, Get, Put, Body } from '@nestjs/common';
import { HeroService } from './hero.service';

@Controller('api/hero')
export class HeroController {
  constructor(private readonly heroService: HeroService) {}

  @Get()
  async getHeroSettings() {
    return this.heroService.getHeroSettings();
  }

  @Put()
  async updateHeroSettings(@Body() body: any) {
    return this.heroService.updateHeroSettings(body);
  }
}
