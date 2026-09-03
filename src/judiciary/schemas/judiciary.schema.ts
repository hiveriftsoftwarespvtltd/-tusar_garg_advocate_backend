import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JudiciaryDocument = Judiciary & Document;

@Schema({ timestamps: true })
export class Judiciary {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  state: string;

  @Prop()
  slug: string;

  @Prop({ default: 'Civil Judge' })
  category: string;

  @Prop()
  conductingBody: string;

  @Prop()
  notificationDate: string;

  @Prop()
  lastDateToApply: string;

  @Prop()
  officialLink: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isFeatured: boolean;
}

export const JudiciarySchema = SchemaFactory.createForClass(Judiciary);
