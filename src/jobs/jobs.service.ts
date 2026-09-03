import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job, JobDocument } from './schemas/job.schema';

@Injectable()
export class JobsService {
  constructor(
    @InjectModel(Job.name)
    private jobModel: Model<JobDocument>,
  ) {}

  async findAll() {
    let list = await this.jobModel.find().sort({ createdAt: -1 }).exec();
    if (!list || list.length === 0) {
      const defaultJobs = [
        {
          title: "Civil Judge (Junior Division)",
          organization: "Himachal Pradesh Public Service Commission (HPPSC)",
          location: "Himachal Pradesh",
          qualification: "LLB Degree",
          experience: "Freshers / Advocates",
          lastDate: "15 Jun 2025",
          salary: "Pay Scale: Rs. 77,840 - Rs. 1,36,520",
          applyLink: "https://hppsc.hp.gov.in",
          category: "Judiciary",
          description: "HPPSC Civil Judge Examination notification for recruitment to Himachal Pradesh Judicial Services.",
          isFeatured: true
        },
        {
          title: "District Judge / Higher Judicial Service",
          organization: "Rajasthan High Court",
          location: "Rajasthan",
          qualification: "LLB Degree with 7 Years Bar Practice",
          experience: "7+ Years Practice",
          lastDate: "30 Jun 2025",
          salary: "Pay Scale: Level-13A (Rs. 1,31,100 - Rs. 2,16,600)",
          applyLink: "https://hcraj.nic.in",
          category: "Judiciary",
          description: "Direct Recruitment to Rajasthan Higher Judicial Service for Advocates with 7 years standing.",
          isFeatured: true
        },
        {
          title: "Assistant Legal Advisor",
          organization: "Ministry of Railways",
          location: "New Delhi",
          qualification: "LLB / LLM Degree",
          experience: "3+ Years Advisory Practice",
          lastDate: "20 May 2025",
          salary: "Level-11 Pay Matrix",
          applyLink: "https://indianrailways.gov.in",
          category: "Government",
          description: "Assistant Legal Advisor recruitment in Railway Board for drafting contracts and handling litigation.",
          isFeatured: true
        },
        {
          title: "Law Officer Grade-I",
          organization: "National Highways Authority of India (NHAI)",
          location: "New Delhi",
          qualification: "LLB Degree",
          experience: "5 Years Experience",
          lastDate: "25 May 2025",
          salary: "Pay Level-12 (Rs. 78,800 - Rs. 2,09,200)",
          applyLink: "https://nhai.gov.in",
          category: "PSU",
          description: "NHAI Law Officer post for land acquisition, arbitration, and High Court writ litigation matters.",
          isFeatured: true
        },
        {
          title: "Law Clerk-cum-Research Associate",
          organization: "Supreme Court of India",
          location: "New Delhi",
          qualification: "LLB Degree",
          experience: "Fresh Law Graduates",
          lastDate: "28 May 2025",
          salary: "Fixed Consolidated Honorarium Rs. 80,000/month",
          applyLink: "https://main.sci.gov.in",
          category: "Court Jobs",
          description: "Engagement of Law Clerk-cum-Research Associates in Supreme Court of India on contractual assignment.",
          isFeatured: true
        },
        {
          title: "Public Prosecutor / Asst. Public Prosecutor",
          organization: "Maharashtra Public Service Commission (MPSC)",
          location: "Maharashtra",
          qualification: "LLB Degree",
          experience: "5 Years Practice at Bar",
          lastDate: "18 Jun 2025",
          salary: "Pay Matrix Level S-15",
          applyLink: "https://mpsc.gov.in",
          category: "Government",
          description: "MPSC Recruitment for Assistant Public Prosecutor positions in Directorate of Prosecution.",
          isFeatured: true
        },
        {
          title: "Legal Researcher & Policy Fellow",
          organization: "Indian Council of Social Science Research (ICSSR)",
          location: "New Delhi",
          qualification: "LLM / PhD in Law",
          experience: "2 Years Research Experience",
          lastDate: "27 May 2025",
          salary: "Consolidated Stipend Rs. 60,000/month",
          applyLink: "https://icssr.org",
          category: "Internships",
          description: "Fellowship for legal research scholars in constitutional law, public policy, and administrative governance.",
          isFeatured: true
        }
      ];
      await this.jobModel.insertMany(defaultJobs);
      list = await this.jobModel.find().sort({ createdAt: -1 }).exec();
    }
    return list;
  }

  async findOne(id: string) {
    return this.jobModel.findById(id).exec();
  }

  async create(data: any) {
    const newItem = new this.jobModel(data);
    return newItem.save();
  }

  async update(id: string, data: any) {
    return this.jobModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
}
