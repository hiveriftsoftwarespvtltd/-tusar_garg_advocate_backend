import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CourtsService } from '../courts/courts.service';

@Controller(['judgments', 'api/judgments'])
export class JudgmentsController {
  constructor(private readonly courtsService: CourtsService) {}

  @Get()
  async getAllJudgments() {
    return this.courtsService.findAllJudgments();
  }

  @Get('all')
  async getAllJudgmentsAlt() {
    return this.courtsService.findAllJudgments();
  }

  @Post()
  async createJudgment(@Body() body: any) {
    return this.courtsService.createJudgment(body);
  }

  @Put(':id')
  async updateJudgment(@Param('id') id: string, @Body() body: any) {
    return this.courtsService.updateJudgment(id, body);
  }

  @Delete(':id')
  async deleteJudgment(@Param('id') id: string) {
    return this.courtsService.deleteJudgment(id);
  }
}
