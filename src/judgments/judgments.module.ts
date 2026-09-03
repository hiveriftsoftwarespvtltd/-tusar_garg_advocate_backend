import { Module } from '@nestjs/common';
import { JudgmentsController } from './judgments.controller';
import { JudgmentsService } from './judgments.service';

@Module({
  controllers: [JudgmentsController],
  providers: [JudgmentsService]
})
export class JudgmentsModule {}
