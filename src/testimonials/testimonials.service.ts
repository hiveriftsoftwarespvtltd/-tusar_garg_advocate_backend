import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Testimonial, TestimonialDocument } from './schemas/testimonial.schema';

@Injectable()
export class TestimonialsService {
  constructor(
    @InjectModel(Testimonial.name)
    private testimonialModel: Model<TestimonialDocument>,
  ) {}

  async findAll() {
    let list = await this.testimonialModel.find().sort({ createdAt: -1 }).exec();
    if (!list || list.length === 0) {
      const defaultTestimonials = [
        {
          name: "Ravi Sharma",
          role: "Business Owner & Client",
          text: "Advocate Tushar Garg is an exceptional lawyer with deep legal knowledge and strong courtroom presence. His guidance and dedication made a complex Supreme Court matter much easier for us.",
          rating: 5,
          isApproved: true
        },
        {
          name: "Neha Verma",
          role: "Entrepreneur & Corporate Counsel",
          text: "Highly professional, responsive, and result-oriented. He explains procedural details clearly and provides effective legal remedies. Truly a trusted Advocate-on-Record.",
          rating: 5,
          isApproved: true
        },
        {
          name: "Arjun Mehta",
          role: "Private Client",
          text: "Outstanding legal support, research depth, and strategic advice. I highly recommend Tushar Garg for any complex constitutional, civil, or appellate litigation.",
          rating: 5,
          isApproved: true
        }
      ];
      await this.testimonialModel.insertMany(defaultTestimonials);
      list = await this.testimonialModel.find().sort({ createdAt: -1 }).exec();
    }
    return list;
  }

  async findOne(id: string) {
    return this.testimonialModel.findById(id).exec();
  }

  async create(data: any) {
    const newItem = new this.testimonialModel(data);
    return newItem.save();
  }

  async update(id: string, data: any) {
    return this.testimonialModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.testimonialModel.findByIdAndDelete(id).exec();
  }
}
