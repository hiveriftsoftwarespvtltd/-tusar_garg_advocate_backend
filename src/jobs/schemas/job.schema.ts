import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JobDocument = Job & Document;

@Schema({ timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  organization: string;

  @Prop()
  location: string;

  @Prop()
  qualification: string;

  @Prop()
  experience: string;

  @Prop()
  lastDate: string;

  @Prop()
  salary: string;

  @Prop()
  applyLink: string;

  @Prop({ default: 'Government' })
  category: string;

  @Prop()
  description: string;

  @Prop({ default: true })
  isFeatured: boolean;
}

export const JobSchema = SchemaFactory.createForClass(Job);
