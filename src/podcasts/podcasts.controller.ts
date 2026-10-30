import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PodcastsService } from './podcasts.service';
import { PodcastStatus } from './schemas/podcast.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('api/podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  /**
   * Public: Get published podcasts.
   * e.g., /api/podcasts?limit=4&page=1
   */
  @Get()
  async getPublished(
    @Query('limit') limit?: number,
    @Query('page') page?: number,
  ) {
    return this.podcastsService.findPublished(limit, page);
  }

  /**
   * Admin: Get all podcasts (Draft, Published, Unpublished)
   */
  @Get('admin/all')
  async getAllAdmin() {
    return this.podcastsService.findAllAdmin();
  }

  /**
   * Admin: Get single podcast for editing
   */
  @Get('admin/:id')
  async getOneAdmin(@Param('id') id: string) {
    return this.podcastsService.findOneAdmin(id);
  }

  /**
   * Public: Get single published podcast by ID
   */
  @Get(':id')
  async getOnePublished(@Param('id') id: string) {
    return this.podcastsService.findOnePublished(id);
  }

  /**
   * Admin: Create podcast
   */
  @Post()
  async create(@Body() body: any) {
    return this.podcastsService.create(body);
  }

  /**
   * Admin: Update podcast
   */
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.podcastsService.update(id, body);
  }

  /**
   * Admin: Quick status change (Draft / Published / Unpublished)
   */
  @Patch(':id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body('status') status: PodcastStatus,
  ) {
    return this.podcastsService.updateStatus(id, status);
  }

  /**
   * Admin: Delete podcast
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.podcastsService.delete(id);
  }
}
