import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { SettingsModule } from '../settings/settings.module';
import { ContactsModule } from '../contacts/contacts.module';

@Module({
  imports: [SettingsModule, ContactsModule],
  controllers: [ChatController],
  providers: [ChatService],
  exports: [ChatService],
})
export class ChatModule {}
