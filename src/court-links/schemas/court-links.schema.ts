import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourtLinksDocument = CourtLinks & Document;

@Schema()
export class CourtLinks {
  @Prop({ type: Types.ObjectId, ref: 'Court', required: true, unique: true })
  courtId: Types.ObjectId;

  @Prop()
  officialWebsite: string;

  @Prop()
  caseStatus: string;

  @Prop()
  judgments: string;

  @Prop()
  causeList: string;

  @Prop()
  recruitment: string;

  @Prop()
  rules: string;
}

export const CourtLinksSchema = SchemaFactory.createForClass(CourtLinks);
