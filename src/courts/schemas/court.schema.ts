import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type CourtDocument = Court & Document;

@Schema({ timestamps: true })
export class Court {
  @Prop({ type: Types.ObjectId, ref: 'State', required: true })
  stateId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'District' })
  districtId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'CourtComplex' })
  courtComplexId: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  slug: string;

  @Prop({ required: true })
  courtType: string;

  @Prop()
  city: string;

  @Prop()
  address: string;

  @Prop()
  jurisdiction: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  featured: boolean;

  @Prop({ default: 'DRAFT' })
  status: string;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop()
  metaTitle: string;

  @Prop()
  metaDescription: string;

  @Prop()
  canonical: string;

  @Prop()
  ogImage: string;

  @Prop()
  image: string; // The primary thumbnail/cover image

  // Official Court Links (Embedded for performance)
  @Prop()
  officialWebsite: string;

  @Prop()
  caseStatusUrl: string;

  @Prop()
  judgmentsUrl: string;

  @Prop()
  causeListUrl: string;

  @Prop()
  recruitmentUrl: string;

  @Prop()
  rulesUrl: string;

  // Additional Comprehensive Info
  @Prop({ type: Object })
  contactInfo: { phone: string; email: string };

  @Prop()
  workingHours: string;

  @Prop()
  postalDetails: string;

  @Prop()
  history: string; // Establishment / About

  @Prop({ type: [{ name: String, designation: String, bench: String, profileUrl: String }] })
  judges: { name: string; designation: string; bench: string; profileUrl: string }[];

  @Prop({ type: [{ title: String, link: String, iconType: String }] })
  services: { title: string; link: string; iconType: string }[];

  @Prop([String])
  practiceAreas: string[];

  @Prop({ type: [{ question: String, answer: String }] })
  faqs: { question: string; answer: string }[];
}

export const CourtSchema = SchemaFactory.createForClass(Court);
