import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type HeroDocument = Hero & Document;

@Schema({ timestamps: true })
export class Hero {
  @Prop({ default: 'ADVOCATE-ON-RECORD • SUPREME COURT OF INDIA' })
  badgeText: string;

  @Prop({ default: 'TUSHAR' })
  titleFirst: string;

  @Prop({ default: 'GARG' })
  titleSecond: string;

  @Prop({ default: 'Legal Practice, Supreme Court & High Courts of India' })
  subTitle: string;

  @Prop({ default: 'Dedicated to constitutional law, appellate litigation, civil disputes, criminal defense, and legal research across all judicial forums in India.' })
  description: string;

  @Prop({ type: [String], default: ['Supreme Court SLPs', 'Constitutional Matters', 'Civil & Criminal Litigation', 'Arbitration & Corporate'] })
  expertiseBadges: string[];

  @Prop({
    type: [
      {
        line1: String,
        line2: String,
        icon: String,
        href: String,
      },
    ],
    default: [
      { line1: 'EXPLORE', line2: 'JUDGMENTS', icon: 'Scale', href: '/judgments' },
      { line1: 'INDIAN', line2: 'LAWS & ACTS', icon: 'Gavel', href: '/laws' },
      { line1: 'COURTS', line2: 'DIRECTORY', icon: 'Landmark', href: '/courts' },
      { line1: 'JUDICIARY', line2: 'RESOURCES', icon: 'GraduationCap', href: '/judiciary' },
    ],
  })
  ctaButtons: { line1: string; line2: string; icon: string; href: string }[];

  @Prop({ default: '/home/hero_banner_image.png' })
  bgImage: string;

  @Prop({ default: 50 })
  bgOverlayOpacity: number;

  @Prop({ default: 'Adv. Tushar Garg' })
  advocateName: string;

  @Prop({ default: 'Supreme Court of India' })
  advocateTitle: string;

  @Prop({ default: '/home/tusar_garg_photo.jpeg' })
  advocatePhoto: string;

  @Prop({
    type: [
      {
        label: String,
        value: String,
      },
    ],
    default: [
      { label: 'Years Practice', value: '10+' },
      { label: 'Cases Handled', value: '5000+' },
      { label: 'States Covered', value: '28+' },
    ],
  })
  stats: { label: string; value: string }[];

  @Prop({ default: '/contact' })
  consultationLink: string;

  @Prop({ default: 'Book Legal Consultation' })
  consultationText: string;
}

export const HeroSchema = SchemaFactory.createForClass(Hero);
