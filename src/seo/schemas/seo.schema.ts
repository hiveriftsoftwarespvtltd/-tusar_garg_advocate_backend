import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SeoDocument = Seo & Document;

@Schema({ timestamps: true })
export class Seo {
  @Prop({ required: true, unique: true, index: true })
  route: string; // e.g. "/", "/about", "/judiciary", "/bare-acts", "/laws", "/tribunals", "/contact", "/slp", "/writ-petitions", etc.

  @Prop({ required: true })
  pageName: string; // e.g. "Homepage", "About Advocate", "Judiciary Hub", etc.

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], default: [] })
  keywords: string[];

  @Prop({ default: '' })
  canonical: string;

  @Prop({ default: '' })
  ogImage: string;
}

export const SeoSchema = SchemaFactory.createForClass(Seo);
