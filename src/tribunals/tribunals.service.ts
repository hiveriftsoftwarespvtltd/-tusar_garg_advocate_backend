import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Tribunal, TribunalDocument } from './schemas/tribunal.schema';

@Injectable()
export class TribunalsService {
  constructor(
    @InjectModel(Tribunal.name)
    private tribunalModel: Model<TribunalDocument>,
  ) {}

  async findAll() {
    let list = await this.tribunalModel.find().sort({ createdAt: -1 }).exec();
    if (!list || list.length === 0) {
      const defaultTribunals = [
        {
          abbr: "NCLT",
          slug: "nclt",
          name: "National Company Law Tribunal",
          tagline: "Adjudicating Authority for Corporate Insolvency, Mergers, and Company Matters",
          established: "1 June 2016",
          statute: "Companies Act, 2013 & Insolvency and Bankruptcy Code (IBC), 2016",
          ministry: "Ministry of Corporate Affairs, Govt. of India",
          jurisdiction: "All Indian Corporate Entities, Corporate Debtors & Financial Creditors",
          website: "https://nclt.gov.in",
          logoUrl: "/home/trubinals_&_forum/nclt.svg",
          description: "The National Company Law Tribunal (NCLT) is a quasi-judicial body in India that adjudicates issues relating to Indian companies. Formed under Section 408 of the Companies Act, 2013, NCLT holds exclusive jurisdiction over corporate insolvency resolution process (CIRP), liquidation proceedings, corporate restructuring, schemes of arrangement, mergers & acquisitions, and shareholder oppression/mismanagement claims.",
          benches: [
            { name: "Principal Bench", location: "New Delhi", type: "Apex Bench" },
            { name: "New Delhi Benches (I-V)", location: "New Delhi", type: "Division Benches" },
            { name: "Mumbai Benches (I-VI)", location: "Mumbai, Maharashtra", type: "Division Benches" },
            { name: "Bengaluru Bench", location: "Bengaluru, Karnataka", type: "Regional Bench" },
            { name: "Chennai Bench", location: "Chennai, Tamil Nadu", type: "Regional Bench" }
          ],
          keyMatters: [
            "Corporate Insolvency Resolution Process (CIRP) under Section 7, 9 & 10 of IBC 2016",
            "Oppression and Mismanagement Claims under Sections 241-242 of Companies Act 2013",
            "Approval of Schemes of Amalgamation, Compromise, and Corporate Restructuring"
          ],
          recentOrders: [
            { title: "Admission of Section 7 CIRP Petition against Corporate Debtor", date: "18 May 2025", bench: "Principal Bench, New Delhi", orderNo: "CP (IB) No. 412/ND/2024" }
          ],
          isFeatured: true
        },
        {
          abbr: "NCLAT",
          slug: "nclat",
          name: "National Company Law Appellate Tribunal",
          tagline: "Appellate Authority for Appeals Against NCLT, CCI, and IBBI Orders",
          established: "1 June 2016",
          statute: "Companies Act, 2013 (Section 410)",
          ministry: "Ministry of Corporate Affairs, Govt. of India",
          jurisdiction: "Appeals against NCLT, Competition Commission of India (CCI), and IBBI",
          website: "https://nclat.nic.in",
          logoUrl: "/home/trubinals_&_forum/nclat.svg",
          description: "NCLAT hears appeals against orders passed by NCLT, CCI, and IBBI.",
          benches: [
            { name: "Principal Bench", location: "New Delhi", type: "Apex Bench" },
            { name: "Chennai Bench", location: "Chennai, Tamil Nadu", type: "Southern Regional Bench" }
          ],
          keyMatters: [
            "Appeals under Section 61 of the Insolvency and Bankruptcy Code (IBC), 2016",
            "Appeals under Section 421 of the Companies Act, 2013"
          ],
          recentOrders: [
            { title: "Order Setting Aside CIRP Commencement in Commercial Appeal", date: "17 May 2025", bench: "Principal Bench, New Delhi", orderNo: "Company Appeal (AT) No. 201/2025" }
          ],
          isFeatured: true
        },
        {
          abbr: "NGT",
          slug: "ngt",
          name: "National Green Tribunal",
          tagline: "Specialized Environmental Court for Protection of Environment & Forests",
          established: "18 October 2010",
          statute: "National Green Tribunal Act, 2010",
          ministry: "Ministry of Environment, Forest and Climate Change",
          jurisdiction: "Environmental Conservation, Protection of Forests, Air & Water Pollution Claims",
          website: "https://greentribunal.gov.in",
          logoUrl: "/home/trubinals_&_forum/NGT.svg",
          description: "NGT handles environmental protection and forest conservation matters across India.",
          benches: [
            { name: "Principal Bench", location: "New Delhi", type: "Headquarters" },
            { name: "Zonal Bench (Pune)", location: "Pune, Maharashtra", type: "Western Zone" }
          ],
          keyMatters: [
            "Water and Air Pollution Act enforcement",
            "Environment Protection Act & Forest Conservation litigation"
          ],
          recentOrders: [
            { title: "Directions on Sewage Treatment Plant (STP) Standards Compliance", date: "15 May 2025", bench: "Principal Bench, New Delhi", orderNo: "OA No. 519/2024" }
          ],
          isFeatured: true
        },
        {
          abbr: "NCDRC",
          slug: "ncdrc",
          name: "National Consumer Disputes Redressal Commission",
          tagline: "Apex Consumer Protection Forum in India",
          established: "1988",
          statute: "Consumer Protection Act, 2019",
          ministry: "Ministry of Consumer Affairs, Food and Public Distribution",
          jurisdiction: "Consumer Disputes exceeding Rs 2 Crore & Appellate Remedies",
          website: "http://ncdrc.nic.in",
          logoUrl: "/home/trubinals_&_forum/ncdrc.svg",
          description: "NCDRC is an apex quasi-judicial commission in India to address consumer grievances.",
          benches: [
            { name: "Principal Bench", location: "New Delhi", type: "Apex Bench" }
          ],
          keyMatters: ["Original Complaints exceeding Rs 2 Crore", "Appeals from State Commissions"],
          recentOrders: [{ title: "Order Directing Developer Compensation for Deficiency in Service", date: "12 May 2025", bench: "New Delhi", orderNo: "CC No. 104/2024" }],
          isFeatured: true
        },
        {
          abbr: "RERA",
          slug: "rera",
          name: "Real Estate Regulatory Authority",
          tagline: "Regulator & Dispute Adjudicator for Real Estate Developers & Homebuyers",
          established: "1 May 2016",
          statute: "Real Estate (Regulation and Development) Act, 2016",
          ministry: "Ministry of Housing and Urban Affairs",
          jurisdiction: "Real Estate Projects, Builder-Homebuyer Disputes, Delayed Possession Claims",
          website: "https://mohua.gov.in",
          logoUrl: "/home/trubinals_&_forum/rera.svg",
          description: "RERA protects home buyers and boosts real estate investments by enforcing project timelines and builder compliance.",
          benches: [
            { name: "MahaRERA", location: "Mumbai, Maharashtra", type: "State Authority" },
            { name: "HRERA", location: "Gurugram, Haryana", type: "State Authority" }
          ],
          keyMatters: ["Refund of Homebuyer Amount with Interest", "Enforcement of Project Deadlines"],
          recentOrders: [{ title: "Order Directing Builder Refund with SBI MCLR Interest", date: "16 May 2025", bench: "HRERA Gurugram", orderNo: "Comp No. 3412/2024" }],
          isFeatured: true
        },
        {
          abbr: "DRT",
          slug: "drt",
          name: "Debt Recovery Tribunals",
          tagline: "Recovery of Debts Due to Banks and Financial Institutions",
          established: "1993",
          statute: "RDDBFI Act, 1993 & SARFAESI Act, 2002",
          ministry: "Ministry of Finance, Govt. of India",
          jurisdiction: "Bank Debt Recovery Applications & SARFAESI Securitisation Appeals",
          website: "https://drt.gov.in",
          logoUrl: "/home/trubinals_&_forum/DRT.svg",
          description: "DRTs adjudicate applications from banks for recovery of non-performing assets.",
          benches: [{ name: "DRT-I, II, III New Delhi", location: "New Delhi", type: "Regional Benches" }],
          keyMatters: ["Securitisation Applications (SA) under SARFAESI", "Original Applications by Banks"],
          recentOrders: [{ title: "Interim Stay on E-Auction Notice under SARFAESI Act", date: "12 May 2025", bench: "DRT-I New Delhi", orderNo: "SA No. 189/2025" }],
          isFeatured: true
        },
        {
          abbr: "DRAT",
          slug: "drat",
          name: "Debt Recovery Appellate Tribunals",
          tagline: "Appellate Authority for DRT Orders",
          established: "1993",
          statute: "RDDBFI Act, 1993 & SARFAESI Act, 2002",
          ministry: "Ministry of Finance",
          jurisdiction: "Appeals against Debt Recovery Tribunals",
          website: "https://drat.gov.in",
          logoUrl: "/home/trubinals_&_forum/drat.svg",
          description: "DRAT hears appeals against orders passed by Debt Recovery Tribunals across India.",
          benches: [{ name: "DRAT Allahabad, Delhi, Chennai, Mumbai, Kolkata", location: "Delhi/Mumbai", type: "Appellate Benches" }],
          keyMatters: ["Pre-deposit Waivers & SARFAESI Appeals"],
          recentOrders: [{ title: "Order Granting Partial Waiver of Pre-Deposit under Section 18 SARFAESI", date: "10 May 2025", bench: "DRAT Delhi", orderNo: "Appeal No. 44/2025" }],
          isFeatured: true
        },
        {
          abbr: "ITAT",
          slug: "itat",
          name: "Income Tax Appellate Tribunal",
          tagline: "Quasi-Judicial Forum for Direct Tax Litigation",
          established: "25 January 1941",
          statute: "Income Tax Act, 1961",
          ministry: "Ministry of Law and Justice",
          jurisdiction: "Direct Income Tax & Transfer Pricing Appeals",
          website: "https://itat.gov.in",
          logoUrl: "/home/trubinals_&_forum/itat.svg",
          description: "ITAT is a quasi-judicial institution specializing in direct tax appellate remedies.",
          benches: [{ name: "New Delhi Benches", location: "New Delhi", type: "Division Benches" }],
          keyMatters: ["Direct Income Tax Disputes", "Transfer Pricing Adjustments"],
          recentOrders: [{ title: "Order Allowing Section 80IA Tax Deduction Claim", date: "09 May 2025", bench: "ITAT Delhi Bench", orderNo: "ITA No. 891/Del/2024" }],
          isFeatured: true
        },
        {
          abbr: "CESTAT",
          slug: "cestat",
          name: "Customs, Excise & Service Tax Appellate Tribunal",
          tagline: "Appellate Forum for Indirect Tax & Customs Matters",
          established: "1982",
          statute: "Customs Act, 1962 & Central Excise Act",
          ministry: "Ministry of Finance",
          jurisdiction: "Customs Duty, Central Excise & Legacy Service Tax Appeals",
          website: "https://cestat.gov.in",
          logoUrl: "/home/trubinals_&_forum/cestat.svg",
          description: "CESTAT hears appeals against orders passed by Commissioners of Customs and Excise.",
          benches: [{ name: "Principal Bench New Delhi", location: "New Delhi", type: "Apex Bench" }],
          keyMatters: ["Customs Valuation Disputes", "Classification of Goods & Duty Refunds"],
          recentOrders: [{ title: "Order Granting Refund of Customs Duty Duty Entitlement Passbook", date: "05 May 2025", bench: "CESTAT Delhi", orderNo: "Customs Appeal No. 230/2024" }],
          isFeatured: true
        },
        {
          abbr: "CAT",
          slug: "cat",
          name: "Central Administrative Tribunal",
          tagline: "Service Matters & Employment Grievances of Central Government Employees",
          established: "1 November 1985",
          statute: "Administrative Tribunals Act, 1985",
          ministry: "Ministry of Personnel, Public Grievances and Pensions",
          jurisdiction: "Central Civil Services, Railway, Post & Defense Civilian Personnel",
          website: "https://cgat.gov.in",
          logoUrl: "/home/trubinals_&_forum/CAT.svg",
          description: "CAT adjudicates service disputes regarding recruitment and conditions of service of Central Government employees.",
          benches: [{ name: "Principal Bench New Delhi", location: "New Delhi", type: "Apex Bench" }],
          keyMatters: ["Promotion, Seniority & Pension Disputes", "Disciplinary Enquiry Challenges"],
          recentOrders: [{ title: "Directions for Promotion of Senior Officers with Retrospective Effect", date: "11 May 2025", bench: "CAT Principal Bench", orderNo: "OA No. 1102/2024" }],
          isFeatured: true
        },
        {
          abbr: "AFT",
          slug: "aft",
          name: "Armed Forces Tribunal / Forfeited Property",
          tagline: "Appellate Tribunal for Defense Personnel & Forfeited Property",
          established: "2009",
          statute: "Armed Forces Tribunal Act, 2007",
          ministry: "Ministry of Defence",
          jurisdiction: "Army, Navy, Airforce Service & Court Martial Appeals",
          website: "https://aftdelhi.nic.in",
          logoUrl: "/home/trubinals_&_forum/AFT.svg",
          description: "AFT provides judicial review of court martials and service conditions for armed forces personnel.",
          benches: [{ name: "Principal Bench New Delhi", location: "New Delhi", type: "Apex Bench" }],
          keyMatters: ["Disabilities & Pensionary Reliefs", "Court Martial Appeals"],
          recentOrders: [{ title: "Order Granting Disability Pension Relief to Veteran Officer", date: "08 May 2025", bench: "AFT Delhi Bench", orderNo: "OA No. 441/2024" }],
          isFeatured: true
        },
        {
          abbr: "SAT",
          slug: "sat",
          name: "Securities Appellate Tribunal",
          tagline: "Appellate Body for SEBI, IRDAI and PFRDA Directives",
          established: "1992",
          statute: "SEBI Act, 1992 (Section 15K)",
          ministry: "Ministry of Finance",
          jurisdiction: "Appeals against SEBI, Stock Exchanges, IRDAI & PFRDA Orders",
          website: "https://sat.gov.in",
          logoUrl: "/home/trubinals_&_forum/sat.svg",
          description: "SAT hears appeals against penalty orders passed by SEBI and financial regulators.",
          benches: [{ name: "Principal Bench Mumbai", location: "Mumbai, Maharashtra", type: "Apex Bench" }],
          keyMatters: ["Insider Trading Penalty Appeals", "Market Manipulation & Takeover Code Litigation"],
          recentOrders: [{ title: "Quashing SEBI Penalty Order for Lack of Substantive Evidence", date: "14 May 2025", bench: "SAT Mumbai", orderNo: "Appeal No. 98/2025" }],
          isFeatured: true
        },
        {
          abbr: "TDSAT",
          slug: "tdsat",
          name: "Telecom Disputes Settlement & Appellate Tribunal",
          tagline: "Adjudicating Authority for Telecom, Broadcasting & Cyber Disputes",
          established: "2000",
          statute: "TRAI Act, 1997 & Information Technology Act",
          ministry: "Ministry of Communications",
          jurisdiction: "Telecom Operators, Cable TV Broadcasters & Airport Tariff Disputes",
          website: "https://tdsat.gov.in",
          logoUrl: "/home/trubinals_&_forum/tsat.svg",
          description: "TDSAT adjudicates disputes between licensors, licensees, service providers, and consumers in telecom and broadcasting sectors.",
          benches: [{ name: "Principal Bench New Delhi", location: "New Delhi", type: "Apex Bench" }],
          keyMatters: ["Interconnect Agreements & Spectrum Disputes", "Broadcasting & Signal Distribution Disputes"],
          recentOrders: [{ title: "Directions Issued to Broadcaster regarding Interconnect Agreement", date: "13 May 2025", bench: "TDSAT New Delhi", orderNo: "Petition No. 45/2025" }],
          isFeatured: true
        }
      ];
      await this.tribunalModel.insertMany(defaultTribunals);
      list = await this.tribunalModel.find().sort({ createdAt: -1 }).exec();
    }
    return list;
  }

  async findOne(id: string) {
    return this.tribunalModel.findById(id).exec();
  }

  async findBySlug(slug: string) {
    return this.tribunalModel.findOne({ slug: slug.toLowerCase() }).exec();
  }

  async create(data: any) {
    if (data.abbr && !data.slug) {
      data.slug = data.abbr.toLowerCase();
    }
    const newItem = new this.tribunalModel(data);
    return newItem.save();
  }

  async update(id: string, data: any) {
    return this.tribunalModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.tribunalModel.findByIdAndDelete(id).exec();
  }
}
