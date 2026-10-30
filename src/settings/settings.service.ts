import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Settings, SettingsDocument } from './schemas/settings.schema';

@Injectable()
export class SettingsService {
  private readonly logger = new Logger(SettingsService.name);

  constructor(
    @InjectModel(Settings.name) private settingsModel: Model<SettingsDocument>,
  ) {}

  async getSettings(): Promise<Settings> {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      settings = await this.settingsModel.create({});
      this.logger.log('Initialized default Website Settings in database');
    }
    return settings;
  }

  async updateSettings(data: Partial<Settings>): Promise<Settings> {
    let settings = await this.settingsModel.findOne().exec();
    if (!settings) {
      settings = await this.settingsModel.create(data);
      return settings;
    }

    // Create a backup snapshot before applying updates
    const currentSnapshot: any = settings.toObject ? settings.toObject() : { ...settings };
    delete currentSnapshot._id;
    delete currentSnapshot.backups;

    const backups = Array.isArray(settings.backups) ? [...settings.backups] : [];
    backups.unshift({
      savedAt: new Date(),
      snapshot: currentSnapshot,
    });
    // Keep at most 10 recent backups
    const trimmedBackups = backups.slice(0, 10);

    // Apply allowed updates
    const allowedKeys: (keyof Settings)[] = [
      'googleAnalyticsId',
      'googleAnalyticsEnabled',
      'googleTagManagerId',
      'googleTagManagerEnabled',
      'googleSearchConsoleCode',
      'googleSearchConsoleEnabled',
      'googleAdsId',
      'googleAdsEnabled',
      'googleSiteVerificationCode',
      'googleSiteVerificationEnabled',
      'metaPixelId',
      'metaPixelEnabled',
      'linkedinPartnerId',
      'linkedinEnabled',
      'tiktokPixelId',
      'tiktokEnabled',
      'pinterestTagId',
      'pinterestEnabled',
      'customScripts',
      'websiteTitle',
      'websiteMetaDescription',
      'defaultMetaKeywords',
      'sitemapUrl',
      'robotsTxt',
      'chatbotEnabled',
      'geminiApiKey',
      'chatbotTitle',
      'chatbotSubtitle',
      'chatbotLogoUrl',
      'chatbotWelcomeMessage',
      'chatbotProviderText',
    ];

    for (const key of allowedKeys) {
      if (data[key] !== undefined) {
        (settings as any)[key] = data[key];
      }
    }

    settings.backups = trimmedBackups;
    const saved = await settings.save();
    this.logger.log('Website settings updated and backup created successfully');
    return saved;
  }

  async getBackups() {
    const settings = await this.getSettings();
    return settings.backups || [];
  }
}
