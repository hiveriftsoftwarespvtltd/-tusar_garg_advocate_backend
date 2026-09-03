import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CourtsController } from './courts.controller';
import { CourtsService } from './courts.service';
import { Court, CourtSchema } from './schemas/court.schema';
import { Judgment, JudgmentSchema } from '../judgments/schemas/judgment.schema';
import { StatesModule } from '../states/states.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Court.name, schema: CourtSchema },
      { name: Judgment.name, schema: JudgmentSchema }
    ]),
    StatesModule
  ],
  controllers: [CourtsController],
  providers: [CourtsService]
})
export class CourtsModule {}
