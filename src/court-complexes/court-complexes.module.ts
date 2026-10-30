import { Module } from '@nestjs/common';
import { CourtComplexesController } from './court-complexes.controller';
import { CourtComplexesService } from './court-complexes.service';

@Module({
  controllers: [CourtComplexesController],
  providers: [CourtComplexesService]
})
export class CourtComplexesModule {}
