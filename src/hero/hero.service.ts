import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hero, HeroDocument } from './schemas/hero.schema';

@Injectable()
export class HeroService {
  constructor(@InjectModel(Hero.name) private heroModel: Model<HeroDocument>) {}

  async getHeroSettings(): Promise<Hero> {
    let hero = await this.heroModel.findOne().exec();
    if (!hero) {
      hero = await this.heroModel.create({});
    }
    return hero;
  }

  async updateHeroSettings(data: Partial<Hero>): Promise<Hero> {
    let hero = await this.heroModel.findOne().exec();
    if (!hero) {
      return await this.heroModel.create(data);
    }
    Object.assign(hero, data);
    return await hero.save();
  }
}
