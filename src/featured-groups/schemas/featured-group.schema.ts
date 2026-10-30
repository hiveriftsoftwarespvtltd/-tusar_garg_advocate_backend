import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type FeaturedGroupDocument = FeaturedGroup & Document;

@Schema()
export class FeaturedGroup {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ default: 'ACTIVE' })
  status: string;

  @Prop({ default: 0 })
  displayOrder: number;
}

export const FeaturedGroupSchema = SchemaFactory.createForClass(FeaturedGroup);
