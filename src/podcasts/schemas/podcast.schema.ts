import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PodcastDocument = Podcast & Document;

export enum PodcastStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  UNPUBLISHED = 'UNPUBLISHED',
}

@Schema({ timestamps: true })
export class Podcast {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ trim: true, default: '' })
  description: string;

  @Prop({ required: true, trim: true })
  youtubeUrl: string;

  @Prop({ required: true, trim: true })
  youtubeVideoId: string;

  @Prop({ required: true, trim: true })
  thumbnailUrl: string;

  @Prop({ required: true, trim: true })
  embedUrl: string;

  @Prop({ 
    type: String, 
    enum: Object.values(PodcastStatus), 
    default: PodcastStatus.DRAFT 
  })
  status: PodcastStatus;

  @Prop({ default: 0 })
  displayOrder: number;

  @Prop({ default: false })
  featured: boolean;

  @Prop()
  duration: string;

  @Prop({ default: Date.now })
  publishedAt: Date;

  @Prop({ default: '' })
  metaTitle: string;

  @Prop({ default: '' })
  metaDescription: string;

  @Prop({ type: [String], default: ['Advocate on Record Tushar Garg', 'Legal Podcast', 'Supreme Court of India'] })
  metaKeywords: string[];
}

export const PodcastSchema = SchemaFactory.createForClass(Podcast);
