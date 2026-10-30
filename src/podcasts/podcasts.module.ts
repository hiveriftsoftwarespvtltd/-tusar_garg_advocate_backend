import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Podcast, PodcastSchema } from './schemas/podcast.schema';
import { PodcastsService } from './podcasts.service';
import { PodcastsController } from './podcasts.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Podcast.name, schema: PodcastSchema }]),
  ],
  controllers: [PodcastsController],
  providers: [PodcastsService],
  exports: [PodcastsService],
})
export class PodcastsModule {}
