import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourtComplexDocument = CourtComplex & Document;

@Schema({ timestamps: true })
export class CourtComplex {
  @Prop({ type: Types.ObjectId, ref: 'State', required: true })
  stateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District', required: true })
  districtId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop()
  address: string;

  @Prop()
  city: string;

  @Prop({ default: 'DRAFT' })
  status: string;

  @Prop({ default: 0 })
  displayOrder: number;
}

export const CourtComplexSchema = SchemaFactory.createForClass(CourtComplex);
