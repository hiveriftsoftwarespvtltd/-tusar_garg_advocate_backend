import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SettingsDocument = Settings & Document;

@Schema({ timestamps: true })
export class Settings {
  // A. Google Integrations
  @Prop({ default: 'G-VSQM1BYP8Z' })
  googleAnalyticsId: string;

  @Prop({ default: true })
  googleAnalyticsEnabled: boolean;

  @Prop({ default: '' })
  googleTagManagerId: string;

  @Prop({ default: false })
  googleTagManagerEnabled: boolean;

  @Prop({ default: 'Y8IxFpQssO7d7xXlxyp0pd4bZSaK7q3m2GTYHCtthUE' })
  googleSearchConsoleCode: string;

  @Prop({ default: true })
  googleSearchConsoleEnabled: boolean;

  @Prop({ default: '' })
  googleAdsId: string;

  @Prop({ default: false })
  googleAdsEnabled: boolean;

  @Prop({ default: 'Y8IxFpQssO7d7xXlxyp0pd4bZSaK7q3m2GTYHCtthUE' })
  googleSiteVerificationCode: string;

  @Prop({ default: true })
  googleSiteVerificationEnabled: boolean;

  // B. Social Media & Advertising Pixels
  @Prop({ default: '' })
  metaPixelId: string;

  @Prop({ default: false })
  metaPixelEnabled: boolean;

  @Prop({ default: '' })
  linkedinPartnerId: string;

  @Prop({ default: false })
  linkedinEnabled: boolean;

  @Prop({ default: '' })
  tiktokPixelId: string;

  @Prop({ default: false })
  tiktokEnabled: boolean;

  @Prop({ default: '' })
  pinterestTagId: string;

  @Prop({ default: false })
  pinterestEnabled: boolean;

  // C. Custom Code Manager
  @Prop({
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
        code: { type: String, default: '' },
        placement: { type: String, enum: ['head', 'body', 'footer'], default: 'head' },
        enabled: { type: Boolean, default: true },
      },
    ],
    default: [],
  })
  customScripts: {
    id: string;
    name: string;
    code: string;
    placement: 'head' | 'body' | 'footer';
    enabled: boolean;
  }[];

  // D. Basic SEO Settings
  @Prop({ default: 'Tushar Garg - Advocate-on-Record, Supreme Court of India' })
  websiteTitle: string;

  @Prop({
    default:
      'Tushar Garg is an Advocate-on-Record (AOR) at the Supreme Court of India. Professional legal counsel in Constitutional Law, Civil, Criminal, Commercial, Arbitration, Special Leave Petitions (SLP), and comprehensive Indian legal repository.',
  })
  websiteMetaDescription: string;

  @Prop({
    default:
      'Advocate on Record Tushar Garg, Tushar Garg, Advocate on Record, AOR Supreme Court of India, Supreme Court Lawyer Delhi, Special Leave Petition SLP, Writ Petitions Article 32 Article 226, Indian Bare Acts Library, New Criminal Laws 2023 BNS BNSS BSA, Judicial Services Examination, State Judiciary Syllabus, Supreme Court Judgments, Legal Articles India, Indian Law Precedents, High Court of Delhi Lawyer, Legal Consultation Supreme Court',
  })
  defaultMetaKeywords: string;

  @Prop({ default: 'https://advocateonrecordtushargarg.com/sitemap.xml' })
  sitemapUrl: string;

  @Prop({
    default:
      'User-agent: *\nAllow: /\nDisallow: /admin/\nDisallow: /api/\nSitemap: https://advocateonrecordtushargarg.com/sitemap.xml',
  })
  robotsTxt: string;

  // E. AI Chatbot Settings
  @Prop({ default: true })
  chatbotEnabled: boolean;

  @Prop({ default: '' })
  geminiApiKey: string;

  @Prop({ default: 'Advocate Tushar Garg (AOR)' })
  chatbotTitle: string;

  @Prop({ default: 'AI Legal Assistant • Supreme Court' })
  chatbotSubtitle: string;

  @Prop({ default: '/TusharLogo.png' })
  chatbotLogoUrl: string;

  @Prop({
    default:
      'Namaste! Welcome to the Chambers of Advocate Tushar Garg, Advocate-on-Record at the Supreme Court of India. How can I assist you with Supreme Court filings, legal procedures, bare acts, or scheduling a consultation?',
  })
  chatbotWelcomeMessage: string;

  @Prop({ default: 'Provided by HiveRift Softwares Pvt Ltd' })
  chatbotProviderText: string;

  // Automatic backups before updates
  @Prop({
    type: [
      {
        savedAt: { type: Date, default: Date.now },
        snapshot: { type: Object },
      },
    ],
    default: [],
  })
  backups: {
    savedAt: Date;
    snapshot: any;
  }[];
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
