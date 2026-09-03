import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JudiciaryController } from './judiciary.controller';
import { JudiciaryService } from './judiciary.service';
import { Judiciary, JudiciarySchema } from './schemas/judiciary.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Judiciary.name, schema: JudiciarySchema }])
  ],
  controllers: [JudiciaryController],
  providers: [JudiciaryService],
  exports: [JudiciaryService]
})
export class JudiciaryModule {}
