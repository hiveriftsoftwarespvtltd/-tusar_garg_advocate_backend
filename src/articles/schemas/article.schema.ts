import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ArticleDocument = Article & Document;

@Schema({ timestamps: true })
export class Article {
  @Prop({ required: true })
  title: string;

  @Prop({ default: 'LEGAL ANALYSIS' })
  category: string;

  @Prop({ default: 'Advocate Tushar Garg' })
  author: string;

  @Prop()
  date: string;

  @Prop()
  readTime: string;

  @Prop()
  summary: string;

  @Prop()
  content: string;

  @Prop()
  image: string;

  @Prop({ default: true })
  isFeatured: boolean;
}

export const ArticleSchema = SchemaFactory.createForClass(Article);
