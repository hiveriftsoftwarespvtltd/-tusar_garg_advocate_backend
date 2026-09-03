import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Judiciary, JudiciaryDocument } from './schemas/judiciary.schema';

const defaultJudiciaryNotifications = [
  {
    title: "Haryana Judicial Services Examination 2025",
    state: "Haryana",
    slug: "haryana",
    category: "Civil Judge",
    conductingBody: "Haryana Public Service Commission (HPSC)",
    notificationDate: "15 May 2025",
    lastDateToApply: "15 June 2025",
    officialLink: "https://hpsc.gov.in",
    description: "HPSC Civil Judge (Junior Division) preliminary and mains recruitment notification for Haryana Judiciary.",
    isFeatured: true
  },
  {
    title: "Punjab Civil Judge Recruitment 2025",
    state: "Punjab",
    slug: "punjab",
    category: "Civil Judge",
    conductingBody: "Punjab & Haryana High Court",
    notificationDate: "10 May 2025",
    lastDateToApply: "10 June 2025",
    officialLink: "https://highcourtchd.gov.in",
    description: "Recruitment notification for Judicial Officers and Civil Judges in the state of Punjab.",
    isFeatured: true
  },
  {
    title: "Delhi Judicial Services (DJS) Preliminary Notice",
    state: "Delhi",
    slug: "delhi",
    category: "Civil Judge",
    conductingBody: "Delhi High Court",
    notificationDate: "06 May 2025",
    lastDateToApply: "06 June 2025",
    officialLink: "https://delhihighcourt.nic.in",
    description: "Delhi Judicial Services Exam for Entry Level Judicial Officers in Delhi Subordinate Judiciary.",
    isFeatured: true
  },
  {
    title: "Rajasthan Higher Judicial Service Update",
    state: "Rajasthan",
    slug: "rajasthan",
    category: "Higher Judicial Service",
    conductingBody: "Rajasthan High Court, Jodhpur",
    notificationDate: "02 May 2025",
    lastDateToApply: "02 June 2025",
    officialLink: "https://hcraj.nic.in",
    description: "Rajasthan High Court Direct District Judge / HJS recruitment notification and syllabus update.",
    isFeatured: true
  },
  {
    title: "Uttar Pradesh Higher Judicial Service (UP HJS)",
    state: "Uttar Pradesh",
    slug: "uttar-pradesh",
    category: "Higher Judicial Service",
    conductingBody: "Allahabad High Court",
    notificationDate: "28 Apr 2025",
    lastDateToApply: "28 May 2025",
    officialLink: "https://www.allahabadhighcourt.in",
    description: "Direct recruitment to UP Higher Judicial Service for practicing advocates with 7 years experience.",
    isFeatured: true
  },
  {
    title: "Madhya Pradesh Civil Judge Notification",
    state: "Madhya Pradesh",
    slug: "madhya-pradesh",
    category: "Civil Judge",
    conductingBody: "Madhya Pradesh High Court, Jabalpur",
    notificationDate: "20 Apr 2025",
    lastDateToApply: "20 May 2025",
    officialLink: "https://mphc.gov.in",
    description: "MP High Court Civil Judge Junior Division (Entry Level) examination and online application portal.",
    isFeatured: true
  }
];

@Injectable()
export class JudiciaryService implements OnModuleInit {
  constructor(
    @InjectModel(Judiciary.name) private judiciaryModel: Model<JudiciaryDocument>
  ) {}

  async onModuleInit() {
    const count = await this.judiciaryModel.countDocuments();
    if (count === 0) {
      await this.judiciaryModel.insertMany(defaultJudiciaryNotifications);
      console.log('Seeded default Judiciary notifications into MongoDB');
    }
  }

  async findAll(): Promise<Judiciary[]> {
    return this.judiciaryModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Judiciary | null> {
    return this.judiciaryModel.findById(id).exec();
  }

  async create(data: Partial<Judiciary>): Promise<Judiciary> {
    const created = new this.judiciaryModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Judiciary>): Promise<Judiciary | null> {
    return this.judiciaryModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.judiciaryModel.findByIdAndDelete(id).exec();
  }
}
