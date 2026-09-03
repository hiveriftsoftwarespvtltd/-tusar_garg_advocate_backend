import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { StatesModule } from './states/states.module';
import { DistrictsModule } from './districts/districts.module';
import { CourtComplexesModule } from './court-complexes/court-complexes.module';
import { CourtsModule } from './courts/courts.module';
import { FeaturedGroupsModule } from './featured-groups/featured-groups.module';
import { JudgmentsModule } from './judgments/judgments.module';
import { CourtLinksModule } from './court-links/court-links.module';
import { HeroModule } from './hero/hero.module';
import { LawsCategoriesModule } from './laws-categories/laws-categories.module';
import { ArticlesModule } from './articles/articles.module';
import { TestimonialsModule } from './testimonials/testimonials.module';
import { TribunalsModule } from './tribunals/tribunals.module';
import { JobsModule } from './jobs/jobs.module';
import { CollegesModule } from './colleges/colleges.module';
import { JudiciaryModule } from './judiciary/judiciary.module';
import { ResourcesModule } from './resources/resources.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/tusar-garg-advocate'),
    AuthModule,
    AdminModule,
    StatesModule,
    DistrictsModule,
    CourtComplexesModule,
    CourtsModule,
    FeaturedGroupsModule,
    JudgmentsModule,
    CourtLinksModule,
    HeroModule,
    LawsCategoriesModule,
    ArticlesModule,
    TestimonialsModule,
    TribunalsModule,
    JobsModule,
    CollegesModule,
    JudiciaryModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
