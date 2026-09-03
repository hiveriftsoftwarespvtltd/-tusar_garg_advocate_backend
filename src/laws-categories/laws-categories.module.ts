import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LawsCategory, LawsCategorySchema } from './schemas/laws-category.schema';
import { LawsCategoriesService } from './laws-categories.service';
import { LawsCategoriesController } from './laws-categories.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LawsCategory.name, schema: LawsCategorySchema }]),
  ],
  controllers: [LawsCategoriesController],
  providers: [LawsCategoriesService],
  exports: [LawsCategoriesService],
})
export class LawsCategoriesModule {}
