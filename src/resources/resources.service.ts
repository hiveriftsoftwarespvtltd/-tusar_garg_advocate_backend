import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Resource, ResourceDocument } from './schemas/resource.schema';

const defaultLegalResources = [
  {
    title: "A-Z of Constitutional Terms",
    desc: "Key terms related to Fundamental Rights, Writs, Preamble, and Constitutional Bench definitions.",
    category: "Glossary",
    date: "18 May 2025",
    image: "/resource/legal_glossary.png",
    badge: "CONSTITUTION",
    fullExplanation: "Comprehensive dictionary covering Constitutional terms including Article 21, Habeas Corpus, Mandamus, Quo Warranto, Judicial Review, and Basic Structure Doctrine.",
    keyPoints: [
      "Writs under Article 32 & 226 defined with scope.",
      "Key definitions of Sovereign, Socialist, Secular, Democratic, Republic.",
      "Explanation of Advisory Jurisdiction & Curative Petitions."
    ],
    caseRef: "Kesavananda Bharati v. State of Kerala (1973)",
    isFeatured: true
  },
  {
    title: "Criminal Law Terms & Bails",
    desc: "Important terms used in criminal trial, FIR, Anticipatory Bail, Cognizable Offences and Charge Sheets.",
    category: "Glossary",
    date: "16 May 2025",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=400&auto=format&fit=crop",
    badge: "CRIMINAL LAW",
    fullExplanation: "Essential terminology under CrPC 1973 and Bharatiya Nagarik Suraksha Sanhita (BNSS), covering Cognizable vs Non-Cognizable, Bailable vs Non-Bailable offences, and Discharge applications.",
    keyPoints: [
      "Difference between Section 437, 438, and 439 Bail provisions.",
      "Zero FIR and Statement under Section 164 CrPC.",
      "Police Custody vs Judicial Remand."
    ],
    caseRef: "Arnesh Kumar v. State of Bihar (2014)",
    isFeatured: true
  },
  {
    title: "Civil & Commercial Law Glossary",
    desc: "Essential terms in civil suits, Res Judicata, Injunctions, CPC, and Corporate Insolvency (IBC).",
    category: "Glossary",
    date: "14 May 2025",
    image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=400&auto=format&fit=crop",
    badge: "CIVIL & IBC",
    fullExplanation: "Definitions covering Civil Procedure Code (CPC 1908), Order 39 Injunctions, Section 11 Res Judicata, Caveat Petitions, and CIRP under Insolvency and Bankruptcy Code 2016.",
    keyPoints: [
      "Order 39 Rules 1 & 2 Temporary Injunctions.",
      "Section 9 & 11 Arbitration & Conciliation Act.",
      "NCLT CIRP Initiation & Moratorium Under Section 14 IBC."
    ],
    caseRef: "Vidya Drolia v. Durga Trading Corp (2021)",
    isFeatured: true
  },
  {
    title: "Actus Non Facit Reum Nisi Mens Sit Rea",
    desc: "An act does not make a person guilty unless there is a guilty mind (Criminal Intent).",
    category: "Maxims",
    date: "17 May 2025",
    image: "/resource/legal_maxims.png",
    badge: "CRIMINAL MAXIM",
    latinMeaning: "Actus Reus + Mens Rea = Criminal Liability",
    fullExplanation: "Fundamental principle of criminal jurisprudence stating that for crime liability, there must be both a physical prohibited act (Actus Reus) combined with a culpable mental state (Mens Rea).",
    keyPoints: [
      "Physical act alone without criminal intent is not punishable in general criminal law.",
      "Exceptions: Strict liability statutory offences like Food Adulteration and Environmental pollution.",
      "Applied under Sections 80 to 106 IPC General Exceptions."
    ],
    caseRef: "R. v. Prince (1875) L.R. 2 C.C.R. 154",
    isFeatured: true
  },
  {
    title: "Nemo Judex In Causa Sua",
    desc: "No person shall be a judge in their own cause (First Principle of Natural Justice).",
    category: "Maxims",
    date: "15 May 2025",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    badge: "NATURAL JUSTICE",
    latinMeaning: "Rule Against Bias",
    fullExplanation: "Corpus rule of Natural Justice prohibiting pecuniary bias, personal bias, or official bias in judicial, quasi-judicial, and administrative decision-making.",
    keyPoints: [
      "Disqualifies any adjudicator having personal interest or bias.",
      "Mandatory for Courts, Tribunals (NCLT, NGT, ITAT) and Arbitrators.",
      "Violation renders judicial order void ab initio."
    ],
    caseRef: "AK Kraipak v. Union of India (1969)",
    isFeatured: true
  },
  {
    title: "Audi Alteram Partem",
    desc: "Hear the other side — No person shall be condemned unheard.",
    category: "Maxims",
    date: "13 May 2025",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=400&auto=format&fit=crop",
    badge: "NATURAL JUSTICE",
    latinMeaning: "Right to Fair Hearing",
    fullExplanation: "Mandatory natural justice rule requiring prior notice, opportunity of being heard, disclosure of evidence, and reasoned order (speaking order) before passing adverse orders.",
    keyPoints: [
      "Notice must be specific, unambiguous and provide adequate preparation time.",
      "Right to cross-examination and submission of counter-affidavits.",
      "Reasoned Order requirement for quasi-judicial bodies."
    ],
    caseRef: "Maneka Gandhi v. Union of India (1978)",
    isFeatured: true
  },
  {
    title: "How to File a Supreme Court Writ Petition",
    desc: "Step-by-step guide to drafting, filing and listing Writ Petitions under Article 32 in Supreme Court.",
    category: "Procedures",
    date: "18 May 2025",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=400&auto=format&fit=crop",
    badge: "PROCEDURE GUIDE",
    fullExplanation: "Complete procedural roadmap for drafting, indexing, filing, e-filing, scrutiny by Registry, listing before Court, and arguing Writ Petitions in the Supreme Court of India.",
    keyPoints: [
      "Drafting by Advocate-on-Record (AOR) with Synopsis & List of Dates.",
      "Affidavit, Court Fees, Paper Book binding & e-Filing portal upload.",
      "Scrutiny defects cure within 28 days & Computer Registry listing."
    ],
    officialLink: "https://main.sci.gov.in",
    isFeatured: true
  },
  {
    title: "Bail Application & Suspension of Sentence",
    desc: "Procedural steps for Regular Bail, Anticipatory Bail (Sec 438) and Interim Bail in High Courts.",
    category: "Procedures",
    date: "15 May 2025",
    image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=400&auto=format&fit=crop",
    badge: "BAIL PROCEDURE",
    fullExplanation: "Detailed process for invoking High Court and Sessions Court jurisdiction under Section 438 & 439 CrPC / BNSS, including annexures, case diary inspection, and bail condition compliance.",
    keyPoints: [
      "Filing Anticipatory Bail prior to arrest with apprehending apprehension grounds.",
      "Regular Bail application post arrest with charge sheet filing status.",
      "Bail Bond submission & Release Warrant execution before Jail Superintendent."
    ],
    caseRef: "Sanjay Chandra v. CBI (2012)",
    isFeatured: true
  },
  {
    title: "Checking Case Status & Daily Cause List",
    desc: "How to check Supreme Court & High Court daily cause lists, item numbers, and case status.",
    category: "Procedures",
    date: "12 May 2025",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    badge: "PORTAL GUIDE",
    fullExplanation: "Practical guide for advocates, litigants, and researchers on navigating e-Courts services, Supreme Court Mobile App, Cause List item tracking, and digital order downloads.",
    keyPoints: [
      "Searching by CNR Number, Case Number, Party Name, or Advocate Name.",
      "Downloading signed PDF Judgment & Certified Copies from Registry.",
      "Tracking Live Display Boards of Supreme Court & High Court Benches."
    ],
    officialLink: "https://ecourts.gov.in",
    isFeatured: true
  }
];

@Injectable()
export class ResourcesService implements OnModuleInit {
  constructor(
    @InjectModel(Resource.name) private resourceModel: Model<ResourceDocument>
  ) {}

  async onModuleInit() {
    const count = await this.resourceModel.countDocuments();
    if (count === 0) {
      await this.resourceModel.insertMany(defaultLegalResources);
      console.log('Seeded default Legal Resources into MongoDB');
    }
  }

  async findAll(): Promise<Resource[]> {
    return this.resourceModel.find().sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string): Promise<Resource | null> {
    return this.resourceModel.findById(id).exec();
  }

  async create(data: Partial<Resource>): Promise<Resource> {
    const created = new this.resourceModel(data);
    return created.save();
  }

  async update(id: string, data: Partial<Resource>): Promise<Resource | null> {
    return this.resourceModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string): Promise<any> {
    return this.resourceModel.findByIdAndDelete(id).exec();
  }
}
