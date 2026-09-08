import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VisitedCourt, VisitedCourtDocument } from './schemas/visited-court.schema';

@Injectable()
export class VisitedCourtsService {
  constructor(
    @InjectModel(VisitedCourt.name)
    private visitedCourtModel: Model<VisitedCourtDocument>,
  ) {}

  async findAll() {
    let list = await this.visitedCourtModel.find().sort({ order: 1, createdAt: 1 }).exec();
    
    if (!list || list.length === 0) {
      const defaultCourts = [
        {
          name: "Supreme Court of India",
          category: "APEX COURT • ADVOCATE-ON-RECORD",
          location: "Tilak Marg, New Delhi",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80",
          description: "Appellate advocacy representing litigants in Special Leave Petitions (SLPs under Art. 136), original Writ Petitions (Art. 32), Transfer Petitions, and Constitutional Bench matters.",
          highlights: ["Article 136 SLPs", "Article 32 Writs", "Stay Applications"],
          order: 1,
          isActive: true
        },
        {
          name: "Delhi High Court",
          category: "PRINCIPAL HIGH COURT • ARTICLE 226",
          location: "Sher Shah Road, New Delhi",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=800&q=80",
          description: "Frequent appearances before Single Judge & Division Benches in commercial civil suits, Section 34/37 arbitration appeals, FIR quashing, and Article 226 writ petitions.",
          highlights: ["Commercial Division", "Article 226 Writs", "Arbitration Appeals"],
          order: 2,
          isActive: true
        },
        {
          name: "NCLAT & NCLT (Principal Bench)",
          category: "APPELLATE TRIBUNAL • CORPORATE & IBC",
          location: "CGO Complex & MTNL Bhawan, New Delhi",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
          description: "Representing financial and operational creditors, resolution applicants, and corporate debtors in high-stakes insolvency proceedings under the IBC 2016.",
          highlights: ["CIRP Proceedings", "Section 61 Appeals", "Mergers & Oppression"],
          order: 3,
          isActive: true
        },
        {
          name: "National Green Tribunal (NGT)",
          category: "SPECIALIZED TRIBUNAL • ENVIRONMENTAL",
          location: "Faridkot House, Copernicus Marg, New Delhi",
          image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
          description: "Adjudicating environmental clearances (EC), coastal zone regulations, pollution control mandates, forest land compliance, and environmental policy matters.",
          highlights: ["Environmental Compliance", "EC Challenges", "Pollution Norms"],
          order: 4,
          isActive: true
        },
        {
          name: "Bombay High Court",
          category: "HIGH COURT • COMMERCIAL DIVISION",
          location: "Fort, Mumbai, Maharashtra",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
          description: "Handling multi-jurisdictional corporate litigation, commercial appeals, contractual disputes, intellectual property enforcement, and company applications.",
          highlights: ["Commercial Suits", "Arbitration Enforcement", "Writ Jurisdiction"],
          order: 5,
          isActive: true
        },
        {
          name: "Delhi Int'l Arbitration Centre (DIAC)",
          category: "ARBITRATION FORUM • ADR",
          location: "High Court of Delhi Campus, New Delhi",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
          description: "Counsel in institutional and ad-hoc arbitrations involving large-scale infrastructure agreements, joint ventures, EPC contracts, and domestic award enforcement.",
          highlights: ["Institutional Arbitration", "Arbitral Tribunals", "Award Enforcement"],
          order: 6,
          isActive: true
        },
        {
          name: "NCDRC (Apex Consumer Commission)",
          category: "APEX CONSUMER COURT",
          location: "Upbhokta Nyay Bhawan, New Delhi",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
          description: "Representing buyers and enterprises in major consumer claims, builder-buyer delays, insurance repudiation appeals, and original class action complaints.",
          highlights: ["Builder Disputes", "Insurance Claims", "Original Complaints"],
          order: 7,
          isActive: true
        }
      ];

      await this.visitedCourtModel.insertMany(defaultCourts);
      list = await this.visitedCourtModel.find().sort({ order: 1, createdAt: 1 }).exec();
    }

    return list;
  }

  async findOne(id: string) {
    return this.visitedCourtModel.findById(id).exec();
  }

  async create(data: Partial<VisitedCourt>) {
    const newItem = new this.visitedCourtModel(data);
    return newItem.save();
  }

  async update(id: string, data: Partial<VisitedCourt>) {
    return this.visitedCourtModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.visitedCourtModel.findByIdAndDelete(id).exec();
  }
}
