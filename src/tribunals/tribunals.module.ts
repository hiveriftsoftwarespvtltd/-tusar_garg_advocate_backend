import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Tribunal, TribunalSchema } from './schemas/tribunal.schema';
import { TribunalsService } from './tribunals.service';
import { TribunalsController } from './tribunals.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Tribunal.name, schema: TribunalSchema }]),
  ],
  controllers: [TribunalsController],
  providers: [TribunalsService],
  exports: [TribunalsService],
})
export class TribunalsModule {}
