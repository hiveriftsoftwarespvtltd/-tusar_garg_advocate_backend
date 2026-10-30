import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CollegeDocument = College & Document;

@Schema({ timestamps: true })
export class College {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  location: string;

  @Prop()
  state: string;

  @Prop()
  city: string;

  @Prop({ default: 'NLU' })
  type: string;

  @Prop({ default: 'UG, PG, Ph.D.' })
  courses: string;

  @Prop()
  logo: string;

  @Prop()
  website: string;

  @Prop()
  affiliation: string;

  @Prop({ default: true })
  isFeatured: boolean;
}

export const CollegeSchema = SchemaFactory.createForClass(College);
