import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Court, CourtDocument } from './schemas/court.schema';
import { Judgment, JudgmentDocument } from '../judgments/schemas/judgment.schema';

@Injectable()
export class CourtsService {
  constructor(
    @InjectModel(Court.name) private courtModel: Model<CourtDocument>,
    @InjectModel(Judgment.name) private judgmentModel: Model<JudgmentDocument>
  ) {}

  async findAll() {
    const courts = await this.courtModel.find().populate('stateId').exec();
    return courts.map(c => {
      const obj = c.toObject();
      return { ...obj, state: obj.stateId };
    });
  }

  async findPublishedByStateId(stateId: string) {
    const allCourts = await this.courtModel.find({ status: 'PUBLISHED' }).sort({ displayOrder: 1 }).exec();
    return allCourts.filter(c => c.stateId && c.stateId.toString() === stateId.toString());
  }

  async findBySlug(stateId: string, slug: string) {
    const court = await this.courtModel.findOne({ slug, status: 'PUBLISHED' }).exec();
    if (!court) return null;
    
    // Ensure the court actually belongs to the requested state (prevents mismatched URLs)
    if (court.stateId.toString() !== stateId.toString()) {
      return null;
    }

    // Fetch Judgments for this court
    const judgments = await this.judgmentModel.find({ courtId: court._id }).sort({ date: -1 }).exec();

    // Fetch Related Courts (same state, exclude current)
    const relatedCourts = await this.courtModel.find({ 
      stateId, 
      _id: { $ne: court._id },
      status: 'PUBLISHED'
    }).limit(5).exec();

    return {
      ...court.toObject(),
      judgments,
      relatedCourts
    };
  }

  // Update a court
  async update(id: string, updateData: any) {
    return this.courtModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  // Find all judgments (for admin panel & website, auto-seeds if empty)
  async findAllJudgments() {
    let judgments = await this.judgmentModel.find().populate('courtId', 'name').sort({ date: -1 }).exec();
    
    // If empty or containing old placeholder links, seed/update with real court URLs
    if (!judgments || judgments.length === 0) {
      const court = await this.courtModel.findOne().exec();
      if (court) {
        const defaultJudgments = [
          {
            courtId: court._id,
            title: "State of X vs. ABC Pvt. Ltd.",
            caseNumber: "Civil Appeal No. 1234/2024",
            date: new Date("2024-05-16"),
            bench: "2024 SCC OnLine SC 789",
            shortDescription: "Constitutional Law Landmark Judgment on Federal Powers and Statutory Interpretation.",
            link: "https://main.sci.gov.in/judgments",
            isFeatured: true,
          },
          {
            courtId: court._id,
            title: "Ramesh Kumar vs. State of Haryana",
            caseNumber: "CRM-M No. 5678/2024",
            date: new Date("2024-05-14"),
            bench: "2024 SCC OnLine P&H 456",
            shortDescription: "Criminal Law Ruling on anticipatory bail and protection under procedure.",
            link: "https://highcourtchd.gov.in/",
            isFeatured: true,
          },
          {
            courtId: court._id,
            title: "Sunita Devi vs. Rajesh Singh",
            caseNumber: "Civil Suit No. 234/2023",
            date: new Date("2024-05-10"),
            bench: "District Court Delhi",
            shortDescription: "Property Law Judgment on ancestral land partition and injunctions.",
            link: "https://delhidistrictcourts.nic.in/",
            isFeatured: true,
          },
          {
            courtId: court._id,
            title: "State of Karnataka vs. Union of India & Ors.",
            caseNumber: "AIR 2025 SC 1234",
            date: new Date("2025-05-12"),
            bench: "Supreme Court Bench",
            shortDescription: "Landmark judgment on federal structure and powers of Parliament.",
            link: "https://main.sci.gov.in/judgments",
            isFeatured: true,
          },
          {
            courtId: court._id,
            title: "ABC Pvt. Ltd. vs. XYZ Ltd. & Ors.",
            caseNumber: "2025 SCC OnLine Del 789",
            date: new Date("2025-05-08"),
            bench: "Delhi High Court Bench",
            shortDescription: "On interpretation of commercial contracts and arbitration clause.",
            link: "https://delhihighcourt.nic.in/",
            isFeatured: true,
          },
          {
            courtId: court._id,
            title: "IDBI Bank Ltd. vs. M/s. Quality Steel Ltd.",
            caseNumber: "2025 SCC OnLine NCLAT 321",
            date: new Date("2025-05-02"),
            bench: "NCLAT Bench",
            shortDescription: "On insolvency resolution process and creditors' rights under IBC.",
            link: "https://nclat.nic.in/",
            isFeatured: true,
          },
        ];
        await this.judgmentModel.insertMany(defaultJudgments);
        judgments = await this.judgmentModel.find().populate('courtId', 'name').sort({ date: -1 }).exec();
      }
    } else {
      // Update any legacy judgments with '/judgments' to official website URLs
      const legacyMap: Record<string, string> = {
        "State of X vs. ABC Pvt. Ltd.": "https://main.sci.gov.in/judgments",
        "Ramesh Kumar vs. State of Haryana": "https://highcourtchd.gov.in/",
        "Sunita Devi vs. Rajesh Singh": "https://delhidistrictcourts.nic.in/",
        "State of Karnataka vs. Union of India & Ors.": "https://main.sci.gov.in/judgments",
        "ABC Pvt. Ltd. vs. XYZ Ltd. & Ors.": "https://delhihighcourt.nic.in/",
        "IDBI Bank Ltd. vs. M/s. Quality Steel Ltd.": "https://nclat.nic.in/",
      };

      let updatedAny = false;
      for (const j of judgments) {
        if (!j.link || j.link === '/judgments') {
          const matchedUrl = legacyMap[j.title] || "https://main.sci.gov.in/judgments";
          await this.judgmentModel.findByIdAndUpdate(j._id, { link: matchedUrl });
          updatedAny = true;
        }
      }
      if (updatedAny) {
        judgments = await this.judgmentModel.find().populate('courtId', 'name').sort({ date: -1 }).exec();
      }
    }
    return judgments;
  }

  // Create judgment
  async createJudgment(data: any) {
    const newJudgment = new this.judgmentModel(data);
    return newJudgment.save();
  }

  // Update judgment
  async updateJudgment(id: string, data: any) {
    return this.judgmentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  // Delete judgment
  async deleteJudgment(id: string) {
    return this.judgmentModel.findByIdAndDelete(id).exec();
  }

  async create(createData: any) {
    const newCourt = new this.courtModel(createData);
    return newCourt.save();
  }

  async delete(id: string) {
    return this.courtModel.findByIdAndDelete(id).exec();
  }
}
