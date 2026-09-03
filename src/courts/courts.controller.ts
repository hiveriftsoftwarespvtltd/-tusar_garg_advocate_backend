import { Controller, Get, Param, NotFoundException, Post, Body, Delete, Put } from '@nestjs/common';
import { CourtsService } from './courts.service';
import { StatesService } from '../states/states.service';

@Controller('api/courts')
export class CourtsController {
  constructor(
    private readonly courtsService: CourtsService,
    private readonly statesService: StatesService
  ) {}

  @Get()
  async getAllCourts() {
    return this.courtsService.findAll();
  }

  @Get('state/:stateSlug')
  async getCourtsByState(@Param('stateSlug') stateSlug: string) {
    const state = await this.statesService.findBySlug(stateSlug);
    if (!state) throw new NotFoundException('State not found');
    console.log(`Getting courts for stateId: ${state._id.toString()} (${state.name})`);
    const courts = await this.courtsService.findPublishedByStateId(state._id.toString());
    console.log(`Found ${courts.length} courts`);
    return courts;
  }

  // --- Judgments ---
  @Get('judgments/all')
  async getAllJudgments() {
    return this.courtsService.findAllJudgments();
  }

  @Post('judgments')
  async createJudgment(@Body() body: any) {
    return this.courtsService.createJudgment(body);
  }

  @Put('judgments/:id')
  async updateJudgment(@Param('id') id: string, @Body() body: any) {
    return this.courtsService.updateJudgment(id, body);
  }

  @Delete('judgments/:id')
  async deleteJudgment(@Param('id') id: string) {
    return this.courtsService.deleteJudgment(id);
  }

  @Get(':stateSlug/:courtSlug')
  async getCourtDetails(
    @Param('stateSlug') stateSlug: string,
    @Param('courtSlug') courtSlug: string
  ): Promise<any> {
    const state = await this.statesService.findBySlug(stateSlug);
    if (!state) throw new NotFoundException('State not found');
    
    console.log(`Getting court details for stateId: ${state._id}, courtSlug: ${courtSlug}`);
    const court = await this.courtsService.findBySlug(state._id.toString(), courtSlug);
    if (!court) {
      console.log('Court not found in DB!');
      throw new NotFoundException('Court not found');
    }

    // Frontend expects courtDataRaw.state.name and courtDataRaw.state.slug
    const courtObj = (court as any).toObject ? (court as any).toObject() : court;
    const stateObj = (state as any).toObject ? (state as any).toObject() : state;
    
    return {
      ...courtObj,
      state: stateObj
    };
  }

  @Post()
  async createCourt(@Body() body: any) {
    return this.courtsService.create(body);
  }

  @Put(':id')
  async updateCourt(@Param('id') id: string, @Body() body: any) {
    return this.courtsService.update(id, body);
  }

  @Delete(':id')
  async deleteCourt(@Param('id') id: string) {
    return this.courtsService.delete(id);
  }

  // --- Judgments ---

}
