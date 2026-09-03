import { Module } from '@nestjs/common';
import { FeaturedGroupsController } from './featured-groups.controller';
import { FeaturedGroupsService } from './featured-groups.service';

@Module({
  controllers: [FeaturedGroupsController],
  providers: [FeaturedGroupsService]
})
export class FeaturedGroupsModule {}
