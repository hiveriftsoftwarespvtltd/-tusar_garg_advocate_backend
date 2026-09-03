import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ResourceDocument = Resource & Document;

@Schema({ timestamps: true })
export class Resource {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ required: true, default: 'Glossary' })
  category: string; // Glossary | Maxims | Procedures | Guides

  @Prop({ required: true, default: 'LEGAL RESOURCE' })
  badge: string;

  @Prop()
  date: string;

  @Prop()
  image: string;

  @Prop()
  latinMeaning?: string;

  @Prop({ type: [String], default: [] })
  keyPoints?: string[];

  @Prop()
  fullExplanation?: string;

  @Prop()
  caseRef?: string;

  @Prop()
  officialLink?: string;

  @Prop({ default: true })
  isFeatured: boolean;
}

export const ResourceSchema = SchemaFactory.createForClass(Resource);
