import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TribunalDocument = Tribunal & Document;

@Schema({ timestamps: true })
export class Tribunal {
  @Prop({ required: true })
  abbr: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  name: string;

  @Prop()
  tagline: string;

  @Prop()
  established: string;

  @Prop()
  statute: string;

  @Prop()
  ministry: string;

  @Prop()
  jurisdiction: string;

  @Prop()
  website: string;

  @Prop()
  logoUrl: string;

  @Prop()
  description: string;

  @Prop({ type: Array, default: [] })
  benches: { name: string; location: string; type: string }[];

  @Prop({ type: [String], default: [] })
  keyMatters: string[];

  @Prop({ type: Array, default: [] })
  recentOrders: { title: string; date: string; bench: string; orderNo: string }[];

  @Prop({ default: true })
  isFeatured: boolean;
}

export const TribunalSchema = SchemaFactory.createForClass(Tribunal);
