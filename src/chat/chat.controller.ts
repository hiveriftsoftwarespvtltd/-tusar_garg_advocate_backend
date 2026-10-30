import { Controller, Post, Body } from '@nestjs/common';
import { ChatService } from './chat.service';

@Controller(['chat', 'api/chat'])
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post()
  async handleChat(@Body() body: { message: string; history?: any[] }) {
    const { message, history } = body;
    return this.chatService.processChat(message || '', history || []);
  }

  @Post('lead')
  async handleLead(
    @Body()
    body: {
      name: string;
      phone: string;
      email?: string;
      message: string;
      subject?: string;
    },
  ) {
    return this.chatService.saveChatLead(body);
  }
}
