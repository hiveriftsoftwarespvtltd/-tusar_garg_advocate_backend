import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller(['contacts', 'api/contacts'])
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() body: any) {
    return this.contactsService.create(body);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.contactsService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(id);
  }
}
