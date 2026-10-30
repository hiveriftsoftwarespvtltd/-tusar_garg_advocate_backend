import { Module } from '@nestjs/common';
import { CourtLinksController } from './court-links.controller';
import { CourtLinksService } from './court-links.service';

@Module({
  controllers: [CourtLinksController],
  providers: [CourtLinksService]
})
export class CourtLinksModule {}
