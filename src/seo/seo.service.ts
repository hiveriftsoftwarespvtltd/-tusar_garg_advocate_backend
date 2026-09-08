import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seo, SeoDocument } from './schemas/seo.schema';

export const DEFAULT_SEO_PAGES = [
  {
    route: '/',
    pageName: 'Homepage',
    title: 'Tushar Garg - Advocate-on-Record, Supreme Court of India | Official Portal',
    description: 'Advocate Tushar Garg (AOR) represents clients before the Supreme Court of India, High Courts, and Appellate Tribunals in SLPs, writ petitions, and complex litigation.',
    keywords: ['Advocate on Record', 'Tushar Garg', 'Supreme Court of India', 'AOR Supreme Court', 'Supreme Court Advocate Delhi', 'Top Supreme Court Lawyer'],
    canonical: 'https://advocateonrecordtushargarg.com/',
  },
  {
    route: '/about',
    pageName: 'About Advocate Tushar Garg',
    title: 'About Advocate Tushar Garg | Advocate-on-Record, Supreme Court of India',
    description: 'Learn about Advocate Tushar Garg (B.A. LL.B., LL.M.), Advocate-on-Record at the Supreme Court of India with extensive litigation experience in SLPs, writ petitions, civil, and criminal law.',
    keywords: ['About Advocate Tushar Garg', 'Advocate on Record Supreme Court', 'AOR Supreme Court of India', 'Tushar Garg Advocate', 'Supreme Court Lawyer Delhi'],
    canonical: 'https://advocateonrecordtushargarg.com/about',
  },
  {
    route: '/judiciary',
    pageName: 'Judiciary Examination Hub',
    title: 'Indian Judiciary Examinations - 28 States Syllabus & PYQs | Advocate Tushar Garg',
    description: 'Comprehensive judicial services examination repository covering all 28 States of India. Access state syllabi, prelims & mains question papers, exam patterns, and official high court portals.',
    keywords: ['Judiciary Examination India', 'Judicial Services Exam', 'Civil Judge Junior Division', 'PCS J Examination', 'UP PCS J', 'Delhi Judicial Service'],
    canonical: 'https://advocateonrecordtushargarg.com/judiciary',
  },
  {
    route: '/bare-acts',
    pageName: 'Bare Acts Library',
    title: 'Indian Bare Acts Library & Official Gazette PDFs | Advocate Tushar Garg',
    description: 'Download official gazette copies of central Bare Acts including the New Criminal Laws 2023 (BNS, BNSS, BSA), Constitution of India, CPC, and commercial codes.',
    keywords: ['Indian Bare Acts', 'Bare Acts PDF Download', 'New Criminal Laws 2023', 'Bharatiya Nyaya Sanhita BNS PDF', 'Bharatiya Nagarik Suraksha Sanhita BNSS PDF'],
    canonical: 'https://advocateonrecordtushargarg.com/bare-acts',
  },
  {
    route: '/laws',
    pageName: 'Indian Laws & Central Acts',
    title: 'Indian Laws & Central Bare Acts Directory | Advocate Tushar Garg',
    description: 'Comprehensive Indian Laws directory featuring Central & State Bare Acts, Constitutional Law, Criminal Laws (BNS), Civil Law, Corporate & Commercial Laws by Advocate Tushar Garg (AOR).',
    keywords: ['Indian Laws', 'Bare Acts India', 'Central Acts', 'Constitutional Law India', 'Bharatiya Nyaya Sanhita', 'Criminal Law India'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/tribunals',
    pageName: 'Tribunals Directory',
    title: 'Indian Tribunals & Appellate Authorities Directory | Advocate Tushar Garg',
    description: 'Comprehensive directory of 27+ specialized Indian Tribunals including NCLAT, NCLT, NGT, TDSAT, ITAT, APTEL, CAT, and CESTAT. Litigation guidance by Advocate Tushar Garg (AOR).',
    keywords: ['Indian Tribunals', 'Appellate Tribunals India', 'NCLT', 'NCLAT', 'NGT', 'ITAT', 'TDSAT', 'CAT', 'CESTAT'],
    canonical: 'https://advocateonrecordtushargarg.com/tribunals',
  },
  {
    route: '/slp',
    pageName: 'Special Leave Petitions (SLP)',
    title: 'Special Leave Petitions (SLP Article 136) | Supreme Court of India - Advocate Tushar Garg',
    description: 'Comprehensive legal guide on Special Leave Petitions (SLP) under Article 136 of the Constitution of India. Understand Civil vs Criminal SLP grounds, 90-day limitation period, AOR drafting, and precedents.',
    keywords: ['Special Leave Petition Article 136', 'Supreme Court SLP India', 'Advocate on Record SLP', 'Civil SLP High Court Appeal', 'Criminal SLP Bail Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/slp',
  },
  {
    route: '/writ-petitions',
    pageName: 'Writ Petitions (Art 32 & 226)',
    title: 'Writ Petitions (Article 32 & Article 226) | Supreme Court & High Court Advocacy - Advocate Tushar Garg',
    description: 'Comprehensive legal guide on Constitutional Writ Petitions under Article 32 (Supreme Court) and Article 226 (High Courts). Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto.',
    keywords: ['Writ Petitions Article 32', 'Article 226 Writ Jurisdiction', 'Habeas Corpus Petition', 'Mandamus Writ India', 'Certiorari Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/writ-petitions',
  },
  {
    route: '/aor',
    pageName: 'Advocate-on-Record Guide',
    title: 'Advocate-on-Record (AOR) — Supreme Court of India | Advocate Tushar Garg',
    description: 'Comprehensive guide to Advocate-on-Record (AOR) practice, statutory entitlement under Article 145, Supreme Court Rules 2013, SLP filings, writ petitions, and chamber representation.',
    keywords: ['Advocate on Record', 'AOR Supreme Court of India', 'Article 145 Constitution of India', 'Supreme Court Rules 2013', 'AOR Examination'],
    canonical: 'https://advocateonrecordtushargarg.com/aor',
  },
  {
    route: '/articles',
    pageName: 'Legal Articles & Analysis',
    title: 'Legal Articles & Case Analysis | Advocate Tushar Garg (AOR)',
    description: 'Read in-depth legal articles, case analyses, practice guides, and constitutional insights authored by Advocate Tushar Garg, Advocate-on-Record, Supreme Court of India.',
    keywords: ['Legal Articles India', 'Supreme Court Analysis', 'Constitutional Law Articles', 'Criminal Law Insights', 'Bail Jurisprudence'],
    canonical: 'https://advocateonrecordtushargarg.com/articles',
  },
  {
    route: '/courts',
    pageName: 'All India Courts Directory',
    title: 'All India Courts Directory | Supreme Court, High Courts & District Courts',
    description: 'Comprehensive directory of Supreme Court, 25 High Courts, and 700+ District Courts across all Indian States & Union Territories. E-Courts links, cause lists, and legal information.',
    keywords: ['All India Courts Directory', 'High Courts India', 'District Courts India', 'eCourts Services', 'Supreme Court of India'],
    canonical: 'https://advocateonrecordtushargarg.com/courts',
  },
  {
    route: '/high-courts',
    pageName: '25 High Courts of India',
    title: '25 High Courts of India Directory | Official Websites & Jurisdictions',
    description: 'Official directory of all 25 Constitutional High Courts of India. Access official websites, cause lists, case status, benches, and territorial jurisdictions.',
    keywords: ['High Courts of India', '25 High Courts India', 'Allahabad High Court', 'Bombay High Court', 'Delhi High Court', 'Madras High Court'],
    canonical: 'https://advocateonrecordtushargarg.com/high-courts',
  },
  {
    route: '/district-courts',
    pageName: 'District Courts Directory',
    title: 'All India District Courts Directory | 700+ Verified e-Courts Portals',
    description: 'Comprehensive directory of 700+ District and Sessions Courts across all 28 Indian States and Union Territories. Search by state or district for official e-Courts portals.',
    keywords: ['District Courts India', 'Sessions Courts India', 'eCourts Services', 'District Court Case Status', 'District Court Cause List'],
    canonical: 'https://advocateonrecordtushargarg.com/district-courts',
  },
  {
    route: '/contact',
    pageName: 'Contact & Chambers',
    title: 'Contact Advocate Tushar Garg | Legal Consultation & Office Address',
    description: 'Get in touch with Advocate Tushar Garg, Advocate-on-Record, Supreme Court of India. Schedule a legal consultation for Supreme Court, High Court, and Tribunal cases.',
    keywords: ['Contact Advocate Tushar Garg', 'Supreme Court Lawyer Contact', 'Advocate on Record Phone Number', 'Legal Consultation Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/contact',
  },
  {
    route: '/jobs',
    pageName: 'Legal Jobs & Internships',
    title: 'Legal Jobs, Judicial Clerkships & Law Internships | Advocate Tushar Garg',
    description: 'Explore legal career opportunities including Judicial Clerkships, Supreme Court Internships, Public Prosecutor roles, Law Officer vacancies, and Corporate Counsel positions in India.',
    keywords: ['Legal Jobs India', 'Judicial Clerkship Supreme Court', 'Law Internships Delhi', 'Supreme Court Internship', 'Law Officer Vacancy'],
    canonical: 'https://advocateonrecordtushargarg.com/jobs',
  },
  {
    route: '/colleges',
    pageName: 'Law Colleges & Universities',
    title: 'Top Law Colleges & Universities in India | NIRF Rankings & Admissions',
    description: 'Discover premier law colleges and National Law Universities (NLUs) in India. Detailed guide on CLAT, AILET, courses (BA LLB, LLM), NIRF rankings, and legal education.',
    keywords: ['Top Law Colleges India', 'National Law Universities', 'NLUs India', 'CLAT Exam', 'AILET Law Admissions'],
    canonical: 'https://advocateonrecordtushargarg.com/colleges',
  },
  {
    route: '/legal-drafts',
    pageName: 'Legal Drafts Repository',
    title: 'Legal Drafts, Notices & Petitions Repository | Advocate Tushar Garg',
    description: 'Comprehensive database of court-tested legal drafts, statutory demand notices, bail applications, affidavits, agreements, and power of attorney formats.',
    keywords: ['Legal Drafts India', 'Legal Notice Formats', 'Bail Application Format', 'Court Petitions Format', 'Affidavit Templates'],
    canonical: 'https://advocateonrecordtushargarg.com/legal-drafts',
  },
  {
    route: '/faqs',
    pageName: 'Legal FAQs',
    title: 'Legal FAQs & Litigant Rights Guide | Advocate Tushar Garg',
    description: 'Clear answers to critical Indian legal questions regarding Supreme Court litigation, High Court writs, criminal bail, property disputes, and arbitration.',
    keywords: ['Legal FAQs India', 'Supreme Court Questions', 'High Court Writ FAQ', 'Bail Rules India', 'Criminal Law FAQs'],
    canonical: 'https://advocateonrecordtushargarg.com/faqs',
  },
  {
    route: '/resources',
    pageName: 'Legal Resources & Guides',
    title: 'Legal Resources, Glossaries & Procedural Guides | Advocate Tushar Garg',
    description: 'Comprehensive Indian legal resources, procedural flowcharts, court fee guides, legal glossary, Latin maxims, and practice guidelines by Advocate Tushar Garg (AOR).',
    keywords: ['Legal Resources India', 'Legal Glossary', 'Latin Legal Maxims', 'Court Procedures India', 'Litigation Guides'],
    canonical: 'https://advocateonrecordtushargarg.com/resources',
  },
];

@Injectable()
export class SeoService implements OnModuleInit {
  constructor(
    @InjectModel(Seo.name) private seoModel: Model<SeoDocument>,
  ) {}

  async onModuleInit() {
    await this.seedDefaults();
  }

  async seedDefaults() {
    for (const page of DEFAULT_SEO_PAGES) {
      const exists = await this.seoModel.findOne({ route: page.route });
      if (!exists) {
        await this.seoModel.create(page);
      }
    }
  }

  async findAll(): Promise<Seo[]> {
    return this.seoModel.find().sort({ route: 1 }).exec();
  }

  async findByRoute(route: string): Promise<Seo | null> {
    if (!route) return null;
    const normalized = route.startsWith('/') ? route : `/${route}`;
    return this.seoModel.findOne({ route: normalized }).exec();
  }

  async upsert(dto: Partial<Seo>): Promise<Seo> {
    const route = dto.route?.startsWith('/') ? dto.route : `/${dto.route || ''}`;
    return this.seoModel.findOneAndUpdate(
      { route },
      { $set: { ...dto, route } },
      { new: true, upsert: true },
    ).exec();
  }

  async delete(route: string): Promise<any> {
    const normalized = route.startsWith('/') ? route : `/${route}`;
    return this.seoModel.deleteOne({ route: normalized }).exec();
  }
}
