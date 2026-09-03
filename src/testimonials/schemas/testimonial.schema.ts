import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TestimonialDocument = Testimonial & Document;

@Schema({ timestamps: true })
export class Testimonial {
  @Prop({ required: true })
  name: string;

  @Prop({ default: 'Client' })
  role: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: 5 })
  rating: number;

  @Prop({ default: true })
  isApproved: boolean;
}

export const TestimonialSchema = SchemaFactory.createForClass(Testimonial);
