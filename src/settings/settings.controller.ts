import { Controller, Get, Put, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { SettingsService } from './settings.service';

@Controller(['settings', 'api/settings'])
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get()
  async getSettings() {
    return this.settingsService.getSettings();
  }

  @Put()
  async updateSettings(@Body() body: any) {
    return this.settingsService.updateSettings(body);
  }

  @Get('backups')
  async getBackups() {
    return this.settingsService.getBackups();
  }
}
