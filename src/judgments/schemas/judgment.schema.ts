import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JudgmentDocument = Judgment & Document;

@Schema({ timestamps: true })
export class Judgment {
  @Prop({ type: Types.ObjectId, ref: 'Court', required: true })
  courtId: Types.ObjectId;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  caseNumber: string;

  @Prop()
  date: Date;

  @Prop()
  bench: string;

  @Prop()
  shortDescription: string;

  @Prop()
  link: string;

  @Prop({ default: false })
  isFeatured: boolean;
}

export const JudgmentSchema = SchemaFactory.createForClass(Judgment);
