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
    keywords: ['Advocate on Record Tushar Garg', 'Advocate on Record', 'Tushar Garg', 'Supreme Court of India', 'AOR Supreme Court', 'Supreme Court Advocate Delhi', 'Top Supreme Court Lawyer'],
    canonical: 'https://advocateonrecordtushargarg.com/',
  },
  {
    route: '/about',
    pageName: 'About Advocate Tushar Garg',
    title: 'About Advocate Tushar Garg | Advocate-on-Record, Supreme Court of India',
    description: 'Learn about Advocate Tushar Garg (B.A. LL.B., LL.M.), Advocate-on-Record at the Supreme Court of India with extensive litigation experience in SLPs, writ petitions, civil, and criminal law.',
    keywords: ['Advocate on Record Tushar Garg', 'About Advocate Tushar Garg', 'Advocate on Record Supreme Court', 'AOR Supreme Court of India', 'Tushar Garg Advocate', 'Supreme Court Lawyer Delhi'],
    canonical: 'https://advocateonrecordtushargarg.com/about',
  },
  {
    route: '/judiciary',
    pageName: 'Judiciary Examination Hub',
    title: 'Indian Judiciary Examinations - 28 States Syllabus & PYQs | Advocate Tushar Garg',
    description: 'Comprehensive judicial services examination repository covering all 28 States of India. Access state syllabi, prelims & mains question papers, exam patterns, and official high court portals.',
    keywords: ['Advocate on Record Tushar Garg', 'Judiciary Examination India', 'Judicial Services Exam', 'Civil Judge Junior Division', 'PCS J Examination', 'UP PCS J', 'Delhi Judicial Service'],
    canonical: 'https://advocateonrecordtushargarg.com/judiciary',
  },
  {
    route: '/bare-acts',
    pageName: 'Bare Acts Library',
    title: 'Indian Bare Acts Library & Official Gazette PDFs | Advocate Tushar Garg',
    description: 'Download official gazette copies of central Bare Acts including the New Criminal Laws 2023 (BNS, BNSS, BSA), Constitution of India, CPC, and commercial codes.',
    keywords: ['Advocate on Record Tushar Garg', 'Indian Bare Acts', 'Bare Acts PDF Download', 'New Criminal Laws 2023', 'Bharatiya Nyaya Sanhita BNS PDF', 'Bharatiya Nagarik Suraksha Sanhita BNSS PDF'],
    canonical: 'https://advocateonrecordtushargarg.com/bare-acts',
  },
  {
    route: '/laws',
    pageName: 'Indian Laws & Central Acts',
    title: 'Indian Laws & Central Bare Acts Directory | Advocate Tushar Garg',
    description: 'Comprehensive Indian Laws directory featuring Central & State Bare Acts, Constitutional Law, Criminal Laws (BNS), Civil Law, Corporate & Commercial Laws by Advocate Tushar Garg (AOR).',
    keywords: ['Advocate on Record Tushar Garg', 'Indian Laws', 'Bare Acts India', 'Central Acts', 'Constitutional Law India', 'Bharatiya Nyaya Sanhita', 'Criminal Law India'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/tribunals',
    pageName: 'Tribunals Directory',
    title: 'Indian Tribunals & Appellate Authorities Directory | Advocate Tushar Garg',
    description: 'Comprehensive directory of 27+ specialized Indian Tribunals including NCLAT, NCLT, NGT, TDSAT, ITAT, APTEL, CAT, and CESTAT. Litigation guidance by Advocate Tushar Garg (AOR).',
    keywords: ['Advocate on Record Tushar Garg', 'Indian Tribunals', 'Appellate Tribunals India', 'NCLT', 'NCLAT', 'NGT', 'ITAT', 'TDSAT', 'CAT', 'CESTAT'],
    canonical: 'https://advocateonrecordtushargarg.com/tribunals',
  },
  {
    route: '/slp',
    pageName: 'Special Leave Petitions (SLP)',
    title: 'Special Leave Petitions (SLP Article 136) | Supreme Court of India - Advocate Tushar Garg',
    description: 'Comprehensive legal guide on Special Leave Petitions (SLP) under Article 136 of the Constitution of India. Understand Civil vs Criminal SLP grounds, 90-day limitation period, AOR drafting, and precedents.',
    keywords: ['Advocate on Record Tushar Garg', 'Special Leave Petition Article 136', 'Supreme Court SLP India', 'Advocate on Record SLP', 'Civil SLP High Court Appeal', 'Criminal SLP Bail Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/slp',
  },
  {
    route: '/writ-petitions',
    pageName: 'Writ Petitions (Art 32 & 226)',
    title: 'Writ Petitions (Article 32 & Article 226) | Supreme Court & High Court Advocacy - Advocate Tushar Garg',
    description: 'Comprehensive legal guide on Constitutional Writ Petitions under Article 32 (Supreme Court) and Article 226 (High Courts). Habeas Corpus, Mandamus, Certiorari, Prohibition, Quo Warranto.',
    keywords: ['Advocate on Record Tushar Garg', 'Writ Petitions Article 32', 'Article 226 Writ Jurisdiction', 'Habeas Corpus Petition', 'Mandamus Writ India', 'Certiorari Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/writ-petitions',
  },
  {
    route: '/aor',
    pageName: 'Advocate-on-Record Guide',
    title: 'Advocate-on-Record (AOR) — Supreme Court of India | Advocate Tushar Garg',
    description: 'Comprehensive guide to Advocate-on-Record (AOR) practice, statutory entitlement under Article 145, Supreme Court Rules 2013, SLP filings, writ petitions, and chamber representation.',
    keywords: ['Advocate on Record Tushar Garg', 'Advocate on Record', 'AOR Supreme Court of India', 'Article 145 Constitution of India', 'Supreme Court Rules 2013', 'AOR Examination'],
    canonical: 'https://advocateonrecordtushargarg.com/aor',
  },
  {
    route: '/articles',
    pageName: 'Legal Articles & Analysis',
    title: 'Legal Articles & Case Analysis | Advocate Tushar Garg (AOR)',
    description: 'Read in-depth legal articles, case analyses, practice guides, and constitutional insights authored by Advocate Tushar Garg, Advocate-on-Record, Supreme Court of India.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Articles India', 'Supreme Court Analysis', 'Constitutional Law Articles', 'Criminal Law Insights', 'Bail Jurisprudence'],
    canonical: 'https://advocateonrecordtushargarg.com/articles',
  },
  {
    route: '/courts',
    pageName: 'All India Courts Directory',
    title: 'All India Courts Directory | Supreme Court, High Courts & District Courts',
    description: 'Comprehensive directory of Supreme Court, 25 High Courts, and 700+ District Courts across all Indian States & Union Territories. E-Courts links, cause lists, and legal information.',
    keywords: ['Advocate on Record Tushar Garg', 'All India Courts Directory', 'High Courts India', 'District Courts India', 'eCourts Services', 'Supreme Court of India'],
    canonical: 'https://advocateonrecordtushargarg.com/courts',
  },
  {
    route: '/high-courts',
    pageName: '25 High Courts of India',
    title: '25 High Courts of India Directory | Official Websites & Jurisdictions',
    description: 'Official directory of all 25 Constitutional High Courts of India. Access official websites, cause lists, case status, benches, and territorial jurisdictions.',
    keywords: ['Advocate on Record Tushar Garg', 'High Courts of India', '25 High Courts India', 'Allahabad High Court', 'Bombay High Court', 'Delhi High Court', 'Madras High Court'],
    canonical: 'https://advocateonrecordtushargarg.com/high-courts',
  },
  {
    route: '/district-courts',
    pageName: 'District Courts Directory',
    title: 'All India District Courts Directory | 700+ Verified e-Courts Portals',
    description: 'Comprehensive directory of 700+ District and Sessions Courts across all 28 Indian States and Union Territories. Search by state or district for official e-Courts portals.',
    keywords: ['Advocate on Record Tushar Garg', 'District Courts India', 'Sessions Courts India', 'eCourts Services', 'District Court Case Status', 'District Court Cause List'],
    canonical: 'https://advocateonrecordtushargarg.com/district-courts',
  },
  {
    route: '/contact',
    pageName: 'Contact & Chambers',
    title: 'Contact Advocate Tushar Garg | Legal Consultation & Office Address',
    description: 'Get in touch with Advocate Tushar Garg, Advocate-on-Record, Supreme Court of India. Schedule a legal consultation for Supreme Court, High Court, and Tribunal cases.',
    keywords: ['Advocate on Record Tushar Garg', 'Contact Advocate Tushar Garg', 'Supreme Court Lawyer Contact', 'Advocate on Record Phone Number', 'Legal Consultation Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/contact',
  },
  {
    route: '/jobs',
    pageName: 'Legal Jobs & Internships',
    title: 'Legal Jobs, Judicial Clerkships & Law Internships | Advocate Tushar Garg',
    description: 'Explore legal career opportunities including Judicial Clerkships, Supreme Court Internships, Public Prosecutor roles, Law Officer vacancies, and Corporate Counsel positions in India.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Jobs India', 'Judicial Clerkship Supreme Court', 'Law Internships Delhi', 'Supreme Court Internship', 'Law Officer Vacancy'],
    canonical: 'https://advocateonrecordtushargarg.com/jobs',
  },
  {
    route: '/colleges',
    pageName: 'Law Colleges & Universities',
    title: 'Top Law Colleges & Universities in India | NIRF Rankings & Admissions',
    description: 'Discover premier law colleges and National Law Universities (NLUs) in India. Detailed guide on CLAT, AILET, courses (BA LLB, LLM), NIRF rankings, and legal education.',
    keywords: ['Advocate on Record Tushar Garg', 'Top Law Colleges India', 'National Law Universities', 'NLUs India', 'CLAT Exam', 'AILET Law Admissions'],
    canonical: 'https://advocateonrecordtushargarg.com/colleges',
  },
  {
    route: '/legal-drafts',
    pageName: 'Legal Drafts Repository',
    title: 'Legal Drafts, Notices & Petitions Repository | Advocate Tushar Garg',
    description: 'Comprehensive database of court-tested legal drafts, statutory demand notices, bail applications, affidavits, agreements, and power of attorney formats.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Drafts India', 'Legal Notice Formats', 'Bail Application Format', 'Court Petitions Format', 'Affidavit Templates'],
    canonical: 'https://advocateonrecordtushargarg.com/legal-drafts',
  },
  {
    route: '/faqs',
    pageName: 'Legal FAQs',
    title: 'Legal FAQs & Litigant Rights Guide | Advocate Tushar Garg',
    description: 'Clear answers to critical Indian legal questions regarding Supreme Court litigation, High Court writs, criminal bail, property disputes, and arbitration.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal FAQs India', 'Supreme Court Questions', 'High Court Writ FAQ', 'Bail Rules India', 'Criminal Law FAQs'],
    canonical: 'https://advocateonrecordtushargarg.com/faqs',
  },
  {
    route: '/podcast',
    pageName: 'Podcast & Legal Discussions',
    title: 'Legal Podcast & Expert Discussions | Advocate Tushar Garg (AOR)',
    description: 'Listen and watch insightful legal conversations, Supreme Court litigation analysis, and expert discussions hosted by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Podcast India', 'Supreme Court Lawyer Podcast', 'Tushar Garg Podcast', 'Law and Judiciary Discussions'],
    canonical: 'https://advocateonrecordtushargarg.com/podcast',
  },
  {
    route: '/resources',
    pageName: 'Legal Resources & Guides',
    title: 'Legal Resources, Glossaries & Procedural Guides | Advocate Tushar Garg',
    description: 'Comprehensive Indian legal resources, procedural flowcharts, court fee guides, legal glossary, Latin maxims, and practice guidelines by Advocate Tushar Garg (AOR).',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Resources India', 'Legal Glossary', 'Latin Legal Maxims', 'Court Procedures India', 'Litigation Guides'],
    canonical: 'https://advocateonrecordtushargarg.com/resources',
  },
  // --- DYNAMIC ROUTE TEMPLATES IN BACKEND SEO REPOSITORY ---
  {
    route: '/courts/:state',
    pageName: 'State Courts Directory (Dynamic Template)',
    title: 'State Courts & Subordinate Judiciary Directory | Advocate Tushar Garg',
    description: 'High Court and District Court directory, official e-Courts portals, and legal representation in Supreme Court appeals by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'State Courts Directory', 'High Court', 'District Courts', 'eCourts India', 'Advocate on Record'],
    canonical: 'https://advocateonrecordtushargarg.com/courts',
  },
  {
    route: '/courts/:state/:court',
    pageName: 'Court Details & Case Status (Dynamic Template)',
    title: 'Court Details, Cause Lists & Case Status | Advocate Tushar Garg (AOR)',
    description: 'Official court information, e-Courts case status, cause lists, judges, and Supreme Court appeal representation by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Court Case Status', 'Court Cause List', 'eCourts Services', 'District Judge', 'Advocate on Record Supreme Court'],
    canonical: 'https://advocateonrecordtushargarg.com/courts',
  },
  {
    route: '/judgments/:id',
    pageName: 'Judgments & Case Law (Dynamic Template)',
    title: 'Supreme Court & High Court Judgment | Advocate Tushar Garg (AOR)',
    description: 'Verified Indian judicial order, ratio decidendi, legal citations, and precedent analysis by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Supreme Court Judgments', 'High Court Case Law', 'Legal Precedents', 'Ratio Decidendi', 'Advocate on Record'],
    canonical: 'https://advocateonrecordtushargarg.com/judgments',
  },
  {
    route: '/tribunals/:slug',
    pageName: 'Tribunals & Appellate Fora (Dynamic Template)',
    title: 'Tribunal Overview, Benches & Supreme Court Appeals | Advocate Tushar Garg',
    description: 'Statutory tribunals overview, benches, jurisdiction, and Supreme Court appellate advocacy by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Indian Tribunals', 'Appellate Tribunals India', 'Tribunal Appeal Supreme Court', 'Advocate on Record'],
    canonical: 'https://advocateonrecordtushargarg.com/tribunals',
  },
  {
    route: '/laws/:slug',
    pageName: 'Indian Laws Category (Dynamic Template)',
    title: 'Indian Laws, Bare Acts & Statutory Precedents | Advocate Tushar Garg',
    description: 'Comprehensive statutory guide, Bare Acts, and litigation practice before the Supreme Court of India by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Indian Laws', 'Bare Acts India', 'Supreme Court Precedents', 'Advocate on Record'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/laws/:slug/acts',
    pageName: 'Bare Acts Repository (Dynamic Template)',
    title: 'Central & State Bare Acts Repository | Advocate Tushar Garg (AOR)',
    description: 'Verified Central Bare Acts and legislative amendments library curated by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Bare Acts Library', 'Central Acts India', 'Indian Legislation', 'Statutory Provisions'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/laws/:slug/sections',
    pageName: 'Statutory Sections & Remedies (Dynamic Template)',
    title: 'Statutory Sections & Legal Remedies | Advocate Tushar Garg (AOR)',
    description: 'In-depth section breakdown, legal remedies, and apex court litigation by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Statutory Sections', 'Legal Remedies', 'Bare Acts Sections', 'Advocate on Record'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/laws/:slug/precedents',
    pageName: 'Landmark Precedents (Dynamic Template)',
    title: 'Landmark Supreme Court Precedents | Advocate Tushar Garg (AOR)',
    description: 'Supreme Court & High Court landmark precedents, citations, and ratio decidendi repository curated by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Landmark Precedents', 'Supreme Court Precedents', 'Apex Court Case Laws', 'Advocate on Record'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/laws/:slug/practice/:areaSlug',
    pageName: 'Practice Area Detail (Dynamic Template)',
    title: 'Practice Area Legal Advocacy | Advocate Tushar Garg (AOR)',
    description: 'Specialized legal practice and dispute resolution before the Supreme Court of India and High Courts by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Practice Area', 'Supreme Court Representation', 'Advocate on Record India'],
    canonical: 'https://advocateonrecordtushargarg.com/laws',
  },
  {
    route: '/judiciary/:slug',
    pageName: 'State Judicial Services Guide (Dynamic Template)',
    title: 'State Judicial Services Syllabus & PYQs | Advocate Tushar Garg',
    description: 'Complete state judiciary syllabus, prelims, mains, and preparation guides curated by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'State Judiciary Exam', 'PCS J Syllabus', 'Civil Judge Exam Preparation', 'Judicial Services'],
    canonical: 'https://advocateonrecordtushargarg.com/judiciary',
  },
  {
    route: '/judiciary/services/:slug',
    pageName: 'Judicial Examination Guide (Dynamic Template)',
    title: 'Judicial Examination Strategy & Syllabus | Advocate Tushar Garg',
    description: 'Detailed judicial examination strategy and syllabus analysis curated by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Judicial Services Examination', 'Civil Judge Exam', 'Judiciary Preparation India'],
    canonical: 'https://advocateonrecordtushargarg.com/judiciary',
  },
  {
    route: '/articles/:id',
    pageName: 'Legal Article Analysis (Dynamic Template)',
    title: 'Legal Article & Constitutional Insights | Advocate Tushar Garg (AOR)',
    description: 'In-depth legal articles and Supreme Court jurisprudence analyses authored by Advocate on Record Tushar Garg.',
    keywords: ['Advocate on Record Tushar Garg', 'Legal Articles India', 'Supreme Court Analysis', 'Constitutional Law Articles'],
    canonical: 'https://advocateonrecordtushargarg.com/articles',
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
      } else if (exists.keywords && !exists.keywords.includes('Advocate on Record Tushar Garg')) {
        exists.keywords.unshift('Advocate on Record Tushar Garg');
        await exists.save();
      }
    }
  }

  async findAll(): Promise<Seo[]> {
    const list = await this.seoModel.find().sort({ route: 1 }).exec();
    return list.map(item => {
      const obj = (item as any).toObject ? (item as any).toObject() : item;
      if (obj.keywords && !obj.keywords.includes('Advocate on Record Tushar Garg')) {
        obj.keywords.unshift('Advocate on Record Tushar Garg');
      }
      return obj;
    });
  }

  /**
   * Retrieves SEO metadata by route.
   * If an exact record exists, returns it with 'Advocate on Record Tushar Garg'.
   * If a dynamic route is queried (e.g., /courts/:state/:court, /judgments/:id, /tribunals/:slug),
   * synthesizes dynamic SEO metadata guaranteed to include 'Advocate on Record Tushar Garg'.
   */
  async findByRoute(route: string): Promise<Seo | null> {
    if (!route) return null;
    const normalized = route.startsWith('/') ? route : `/${route}`;

    // 1. Exact match in DB
    const exact = await this.seoModel.findOne({ route: normalized }).exec();
    if (exact) {
      const obj = (exact as any).toObject ? (exact as any).toObject() : exact;
      if (obj.keywords && !obj.keywords.includes('Advocate on Record Tushar Garg')) {
        obj.keywords.unshift('Advocate on Record Tushar Garg');
      }
      return obj;
    }

    // 2. Synthesize dynamic route metadata
    return this.synthesizeDynamicSeo(normalized);
  }

  private formatSlug(slug: string): string {
    if (!slug) return '';
    return slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  private synthesizeDynamicSeo(route: string): any {
    const defaultKeyword = 'Advocate on Record Tushar Garg';

    // /courts/:state/:court
    const courtMatch = route.match(/^\/courts\/([^/]+)\/([^/]+)$/);
    if (courtMatch) {
      const stateName = this.formatSlug(courtMatch[1]);
      const courtName = this.formatSlug(courtMatch[2]);
      return {
        route,
        pageName: `${courtName} (${stateName})`,
        title: `${courtName} (${stateName}) | e-Courts & Case Status | Advocate Tushar Garg`,
        description: `Official judicial establishment of ${courtName} in ${stateName}. Cause lists, case status, orders, and Supreme Court appeal guidance by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          courtName,
          `${courtName} Case Status`,
          `${courtName} Cause List`,
          `${stateName} Courts`,
          'eCourts Services India',
          'Advocate on Record',
          'Supreme Court of India'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /courts/:state
    const stateMatch = route.match(/^\/courts\/([^/]+)$/);
    if (stateMatch) {
      const stateName = this.formatSlug(stateMatch[1]);
      return {
        route,
        pageName: `${stateName} Courts Directory`,
        title: `${stateName} Courts & Judicial Directory | High Court & District Courts | Advocate Tushar Garg`,
        description: `Comprehensive directory of High Court and District & Sessions Courts in ${stateName}. E-Courts links, cause lists, and legal counsel by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          `${stateName} Courts`,
          `${stateName} High Court`,
          `${stateName} District Courts`,
          `${stateName} Judiciary`,
          'Advocate on Record',
          'Supreme Court of India'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /judgments/:id
    const judgmentMatch = route.match(/^\/judgments\/([^/]+)$/);
    if (judgmentMatch) {
      return {
        route,
        pageName: 'Judgment Brief & Case Law',
        title: 'Supreme Court & High Court Judgment | Ratio Decidendi | Advocate Tushar Garg (AOR)',
        description: 'Read verified Indian case law, order summaries, ratio decidendi, and legal analysis curated by Advocate on Record Tushar Garg.',
        keywords: [
          defaultKeyword,
          'Supreme Court Judgments',
          'High Court Case Law',
          'Indian Legal Precedents',
          'Ratio Decidendi',
          'Advocate on Record',
          'Supreme Court Rules'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /tribunals/:slug
    const tribunalMatch = route.match(/^\/tribunals\/([^/]+)$/);
    if (tribunalMatch) {
      const name = tribunalMatch[1].toUpperCase();
      return {
        route,
        pageName: `${name} Tribunal`,
        title: `${name} Tribunal & Appellate Forum | Advocate Tushar Garg (AOR)`,
        description: `Complete overview, jurisdiction, benches, and litigation procedures for ${name} Tribunal in India. Supreme Court representation by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          `${name} Tribunal`,
          `${name} India`,
          `${name} Benches`,
          'Appellate Tribunals India',
          'Supreme Court Appeal',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /laws/:slug/practice/:areaSlug
    const practiceMatch = route.match(/^\/laws\/([^/]+)\/practice\/([^/]+)$/);
    if (practiceMatch) {
      const category = this.formatSlug(practiceMatch[1]);
      const area = this.formatSlug(practiceMatch[2]);
      return {
        route,
        pageName: `${area} — ${category}`,
        title: `${area} — ${category} | Practice Area | Advocate Tushar Garg (AOR)`,
        description: `Specialized legal representation before the Supreme Court of India and High Courts in ${area} under ${category} by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          area,
          category,
          `${category} Practice Area`,
          'Supreme Court Litigation',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /laws/:slug/precedents
    const precedentsMatch = route.match(/^\/laws\/([^/]+)\/precedents$/);
    if (precedentsMatch) {
      const name = this.formatSlug(precedentsMatch[1]);
      return {
        route,
        pageName: `${name} Landmark Precedents`,
        title: `Landmark Supreme Court Precedents | ${name} - Advocate Tushar Garg (AOR)`,
        description: `Landmark Supreme Court & High Court judgments repository under ${name}. Citations, ratio decidendi, and litigation principles by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          `${name} Landmark Judgments`,
          `${name} Precedents`,
          'Supreme Court Case Laws',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /laws/:slug/sections
    const sectionsMatch = route.match(/^\/laws\/([^/]+)\/sections$/);
    if (sectionsMatch) {
      const name = this.formatSlug(sectionsMatch[1]);
      return {
        route,
        pageName: `${name} Sections & Provisions`,
        title: `${name} — Statutory Sections & Provisions | Advocate Tushar Garg`,
        description: `Detailed guide to key Articles, Sections, and statutory remedies under ${name}. Legal repository by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          `${name} Sections`,
          `${name} Statutory Provisions`,
          'Indian Legislation',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /laws/:slug/acts
    const actsMatch = route.match(/^\/laws\/([^/]+)\/acts$/);
    if (actsMatch) {
      const name = this.formatSlug(actsMatch[1]);
      return {
        route,
        pageName: `${name} Bare Acts`,
        title: `${name} Central Bare Acts & Statutes | Advocate Tushar Garg (AOR)`,
        description: `Central Acts and statutory codes for ${name} curated by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          `${name} Bare Acts`,
          `Central Acts ${name}`,
          'Indian Legislation',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /laws/:slug
    const lawMatch = route.match(/^\/laws\/([^/]+)$/);
    if (lawMatch) {
      const name = this.formatSlug(lawMatch[1]);
      return {
        route,
        pageName: name,
        title: `${name} | Bare Acts, Precedents & Legal Guidance - Advocate Tushar Garg`,
        description: `Comprehensive legal guide on ${name}, central bare acts, landmark precedents, and Supreme Court litigation by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          name,
          `${name} Bare Acts`,
          `${name} Precedents`,
          'Supreme Court of India',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /judiciary/services/:slug
    const judServiceMatch = route.match(/^\/judiciary\/services\/([^/]+)$/);
    if (judServiceMatch) {
      const name = this.formatSlug(judServiceMatch[1]);
      return {
        route,
        pageName: `${name} Exam Guide`,
        title: `${name} - Complete Exam Guide & Syllabus | Advocate Tushar Garg`,
        description: `Judicial services examination syllabus, pattern, and strategy curated by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          name,
          'Judicial Services Exam',
          'Civil Judge Syllabus',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // /judiciary/:slug
    const judiciaryMatch = route.match(/^\/judiciary\/([^/]+)$/);
    if (judiciaryMatch) {
      const name = this.formatSlug(judiciaryMatch[1]);
      return {
        route,
        pageName: `${name} Judiciary`,
        title: `${name} Judicial Services Examination & Syllabus | Advocate Tushar Garg`,
        description: `State Judicial Services exam pattern, syllabus, and notification updates for ${name} curated by Advocate on Record Tushar Garg.`,
        keywords: [
          defaultKeyword,
          `${name} Judiciary`,
          `${name} Judicial Services`,
          'Civil Judge Junior Division',
          'Advocate on Record'
        ],
        canonical: `https://advocateonrecordtushargarg.com${route}`,
      };
    }

    // Fallback dynamic synthesis
    return {
      route,
      pageName: 'Legal Directory Page',
      title: 'Tushar Garg - Advocate-on-Record, Supreme Court of India',
      description: 'Supreme Court litigation, Indian Bare Acts, and legal precedents by Advocate on Record Tushar Garg.',
      keywords: [
        defaultKeyword,
        'Advocate on Record',
        'Supreme Court of India',
        'AOR Supreme Court'
      ],
      canonical: `https://advocateonrecordtushargarg.com${route}`,
    };
  }

  async upsert(dto: Partial<Seo>): Promise<Seo> {
    const route = dto.route?.startsWith('/') ? dto.route : `/${dto.route || ''}`;
    const keywords = Array.isArray(dto.keywords) ? [...dto.keywords] : [];
    if (!keywords.includes('Advocate on Record Tushar Garg')) {
      keywords.unshift('Advocate on Record Tushar Garg');
    }
    return this.seoModel.findOneAndUpdate(
      { route },
      { $set: { ...dto, route, keywords } },
      { new: true, upsert: true },
    ).exec();
  }

  async delete(route: string): Promise<any> {
    const normalized = route.startsWith('/') ? route : `/${route}`;
    return this.seoModel.deleteOne({ route: normalized }).exec();
  }
}
