import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { College, CollegeDocument } from './schemas/college.schema';

@Injectable()
export class CollegesService {
  constructor(
    @InjectModel(College.name)
    private collegeModel: Model<CollegeDocument>,
  ) {}

  async findAll() {
    let list = await this.collegeModel.find().sort({ createdAt: -1 }).exec();
    if (!list || list.length === 0) {
      const defaultColleges = [
        {
          name: "National Law School of India University (NLSIU)",
          location: "Bengaluru, Karnataka",
          state: "Karnataka",
          city: "Bengaluru",
          type: "NLU",
          courses: "UG, PG, Ph.D.",
          logo: "NLSIU",
          website: "https://www.nls.ac.in",
          affiliation: "Bar Council of India / UGC",
          isFeatured: true
        },
        {
          name: "The West Bengal National University of Juridical Sciences (NUJS)",
          location: "Kolkata, West Bengal",
          state: "West Bengal",
          city: "Kolkata",
          type: "NLU",
          courses: "UG, PG, Ph.D.",
          logo: "NUJS",
          website: "https://www.nujs.edu",
          affiliation: "Bar Council of India / UGC",
          isFeatured: true
        },
        {
          name: "NALSAR University of Law",
          location: "Hyderabad, Telangana",
          state: "Telangana",
          city: "Hyderabad",
          type: "NLU",
          courses: "UG, PG, Ph.D.",
          logo: "NALSAR",
          website: "https://www.nalsar.ac.in",
          affiliation: "Bar Council of India / UGC",
          isFeatured: true
        },
        {
          name: "National Law University, Delhi (NLUD)",
          location: "New Delhi",
          state: "Delhi",
          city: "New Delhi",
          type: "NLU",
          courses: "UG, PG, Ph.D.",
          logo: "NLUD",
          website: "https://nludelhi.ac.in",
          affiliation: "Bar Council of India / UGC",
          isFeatured: true
        },
        {
          name: "Jindal Global Law School (JGLS)",
          location: "Sonipat, Haryana",
          state: "Haryana",
          city: "Sonipat",
          type: "Private",
          courses: "UG, PG, Ph.D.",
          logo: "JGLS",
          website: "https://jgu.edu.in/jgls",
          affiliation: "OP Jindal Global University",
          isFeatured: true
        },
        {
          name: "Government Law College (GLC), Mumbai",
          location: "Mumbai, Maharashtra",
          state: "Maharashtra",
          city: "Mumbai",
          type: "Government",
          courses: "UG, PG",
          logo: "GLC",
          website: "https://glcmumbai.com",
          affiliation: "University of Mumbai",
          isFeatured: true
        },
        {
          name: "ILS Law College, Pune",
          location: "Pune, Maharashtra",
          state: "Maharashtra",
          city: "Pune",
          type: "Private",
          courses: "UG, PG",
          logo: "ILS",
          website: "https://ilslaw.edu",
          affiliation: "Savitribai Phule Pune University",
          isFeatured: true
        },
        {
          name: "Hidayatullah National Law University (HNLU)",
          location: "Raipur, Chhattisgarh",
          state: "Chhattisgarh",
          city: "Raipur",
          type: "NLU",
          courses: "UG, PG, Ph.D.",
          logo: "HNLU",
          website: "https://hnlu.ac.in",
          affiliation: "Bar Council of India / UGC",
          isFeatured: true
        }
      ];
      await this.collegeModel.insertMany(defaultColleges);
      list = await this.collegeModel.find().sort({ createdAt: -1 }).exec();
    }
    return list;
  }

  async findOne(id: string) {
    return this.collegeModel.findById(id).exec();
  }

  async create(data: any) {
    const newItem = new this.collegeModel(data);
    return newItem.save();
  }

  async update(id: string, data: any) {
    return this.collegeModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.collegeModel.findByIdAndDelete(id).exec();
  }
}
