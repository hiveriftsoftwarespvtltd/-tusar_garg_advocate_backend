import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { State, StateDocument } from './schemas/state.schema';

@Injectable()
export class StatesService {
  constructor(@InjectModel(State.name) private stateModel: Model<StateDocument>) {}

  async findAll() {
    return this.stateModel.find().sort({ displayOrder: 1 }).exec();
  }

  async findPublished() {
    return this.stateModel.find({ status: 'PUBLISHED' }).sort({ displayOrder: 1 }).exec();
  }

  async findBySlug(slug: string) {
    return this.stateModel.findOne({ slug }).exec();
  }

  async create(createData: any) {
    const newState = new this.stateModel(createData);
    return newState.save();
  }

  async update(id: string, updateData: any) {
    return this.stateModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string) {
    return this.stateModel.findByIdAndDelete(id).exec();
  }
}
