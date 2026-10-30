import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VisitedCourt, VisitedCourtSchema } from './schemas/visited-court.schema';
import { VisitedCourtsController } from './visited-courts.controller';
import { VisitedCourtsService } from './visited-courts.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: VisitedCourt.name, schema: VisitedCourtSchema },
    ]),
  ],
  controllers: [VisitedCourtsController],
  providers: [VisitedCourtsService],
  exports: [VisitedCourtsService],
})
export class VisitedCourtsModule {}
