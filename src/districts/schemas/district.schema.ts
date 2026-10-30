import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DistrictDocument = District & Document;

@Schema({ timestamps: true })
export class District {
  @Prop({ type: Types.ObjectId, ref: 'State', required: true })
  stateId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ default: 'DRAFT' })
  status: string;

  @Prop({ default: 0 })
  displayOrder: number;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
