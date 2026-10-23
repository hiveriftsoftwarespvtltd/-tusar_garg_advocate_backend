import { 
  Controller, 
  Get, 
  Post, 
  Put, 
  Patch, 
  Delete, 
  Body, 
  Param 
} from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller(['admin/subadmins', 'api/admin/subadmins', 'admin/users', 'api/admin/users'])
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Post()
  async create(@Body() body: any) {
    return this.adminService.create(body);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    return this.adminService.update(id, body);
  }

  @Patch(':id/toggle-status')
  async toggleStatus(@Param('id') id: string) {
    return this.adminService.toggleStatus(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
