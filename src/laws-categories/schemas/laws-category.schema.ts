import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LawsCategoryDocument = LawsCategory & Document;

@Schema({ timestamps: true })
export class LawsCategory {
  @Prop({ required: true })
  name: string;

  @Prop()
  tag: string;

  @Prop()
  acts: string;

  @Prop()
  sections: string;

  @Prop()
  desc: string;

  @Prop()
  image: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: true })
  isFeatured: boolean;
}

export const LawsCategorySchema = SchemaFactory.createForClass(LawsCategory);
