import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { LawsCategory, LawsCategoryDocument } from './schemas/laws-category.schema';

@Injectable()
export class LawsCategoriesService {
  constructor(
    @InjectModel(LawsCategory.name)
    private categoryModel: Model<LawsCategoryDocument>,
  ) { }

  async findAll() {
    let list = await this.categoryModel.find().sort({ displayOrder: 1, createdAt: 1 }).exec();
    if (!list || list.length === 0) {
      const defaultCategories = [
        {
          name: "Constitutional Law",
          acts: "18 Acts",
          sections: "245 Sections",
          desc: "Writ Petitions, Fundamental Rights & Supreme Court Litigation",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=600&q=80",
          tag: "Apex Court & Writs",
          displayOrder: 1,
          isFeatured: true
        },
        {
          name: "Criminal Law",
          acts: "35 Acts",
          sections: "1,248 Sections",
          desc: "Bail, Trial Defense, FIR Quashing & Criminal Appeals",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=600&q=80",
          tag: "Bail & IPC",
          displayOrder: 2,
          isFeatured: true
        },
        {
          name: "Civil Law",
          acts: "28 Acts",
          sections: "1,987 Sections",
          desc: "Injunctions, Money Suits, Civil Appeals & Special Leave Petitions",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
          tag: "CPC & Suits",
          displayOrder: 3,
          isFeatured: true
        },
        {
          name: "Corporate Law",
          acts: "52 Acts",
          sections: "2,105 Sections",
          desc: "NCLT Disputes, Mergers & Corporate Restructuring",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
          tag: "Companies Act & NCLT",
          displayOrder: 4,
          isFeatured: true
        },
        {
          name: "Tax Law",
          acts: "25 Acts",
          sections: "1,056 Sections",
          desc: "Direct & Indirect Tax Appeals, GST & Customs Disputes",
          image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
          tag: "GST & Income Tax",
          displayOrder: 5,
          isFeatured: true
        },
        {
          name: "Property Law",
          acts: "22 Acts",
          sections: "845 Sections",
          desc: "Land Disputes, Title Verification, Possession & Partition Suits",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80",
          tag: "Land & Transfer",
          displayOrder: 6,
          isFeatured: true
        },
        {
          name: "Family Law",
          acts: "15 Acts",
          sections: "532 Sections",
          desc: "Divorce Proceedings, Child Custody, Maintenance & Alimony",
          image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=600&q=80",
          tag: "Hindu & Muslim Law",
          displayOrder: 7,
          isFeatured: true
        },
        {
          name: "Labour Law",
          acts: "29 Acts",
          sections: "1,126 Sections",
          desc: "Central Administrative Tribunal (CAT) & Employment Matters",
          image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=600&q=80",
          tag: "Industrial & CAT",
          displayOrder: 8,
          isFeatured: true
        },
        {
          name: "Arbitration Law",
          acts: "14 Acts",
          sections: "356 Sections",
          desc: "Commercial Arbitration, Domestic & International ADR",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
          tag: "ADR & Conciliation",
          displayOrder: 9,
          isFeatured: true
        },
        {
          name: "Insolvency & Bankruptcy",
          acts: "10 Acts",
          sections: "387 Sections",
          desc: "NCLAT Proceedings, IBC Resolutions & Debt Recovery",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
          tag: "IBC 2016",
          displayOrder: 10,
          isFeatured: true
        },
        {
          name: "Consumer Law",
          acts: "8 Acts",
          sections: "263 Sections",
          desc: "Consumer Commission Suits, RERA & Service Defect Claims",
          image: "https://images.unsplash.com/photo-1556742049-0a670f4a4591?auto=format&fit=crop&w=600&q=80",
          tag: "Consumer Protection",
          displayOrder: 11,
          isFeatured: true
        },
        {
          name: "Environment Law",
          acts: "12 Acts",
          sections: "421 Sections",
          desc: "National Green Tribunal (NGT) Writs & Clearances",
          image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=600&q=80",
          tag: "NGT & Forest Acts",
          displayOrder: 12,
          isFeatured: true
        },
      ];
      await this.categoryModel.insertMany(defaultCategories);
      list = await this.categoryModel.find().sort({ displayOrder: 1, createdAt: 1 }).exec();
    }
    return list;
  }

  async create(data: any) {
    const newItem = new this.categoryModel(data);
    return newItem.save();
  }

  async update(id: string, data: any) {
    return this.categoryModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.categoryModel.findByIdAndDelete(id).exec();
  }
}
