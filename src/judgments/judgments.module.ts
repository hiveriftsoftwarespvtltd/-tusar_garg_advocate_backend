import { Module } from '@nestjs/common';
import { JudgmentsController } from './judgments.controller';
import { JudgmentsService } from './judgments.service';
import { CourtsModule } from '../courts/courts.module';

@Module({
  imports: [CourtsModule],
  controllers: [JudgmentsController],
  providers: [JudgmentsService],
})
export class JudgmentsModule {}
