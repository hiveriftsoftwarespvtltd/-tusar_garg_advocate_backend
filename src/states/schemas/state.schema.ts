import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StateDocument = State & Document;

@Schema({ timestamps: true })
export class State {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true, unique: true })
  code: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop({ default: 'PUBLISHED' })
  status: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop()
  canonical: string;

  @Prop()
  ogImage: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
