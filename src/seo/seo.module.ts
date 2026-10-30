import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Seo, SeoSchema } from './schemas/seo.schema';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seo.name, schema: SeoSchema }]),
  ],
  controllers: [SeoController],
  providers: [SeoService],
  exports: [SeoService],
})
export class SeoModule {}
