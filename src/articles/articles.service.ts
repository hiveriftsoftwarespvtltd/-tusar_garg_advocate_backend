import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Article, ArticleDocument } from './schemas/article.schema';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectModel(Article.name)
    private articleModel: Model<ArticleDocument>,
  ) {}

  async findAll() {
    let list = await this.articleModel.find().sort({ createdAt: -1 }).exec();
    if (!list || list.length === 0) {
      const defaultArticles = [
        {
          title: "The Evolving Scope of Judicial Review in India: Recent Supreme Court Precedents",
          category: "LEGAL ANALYSIS",
          author: "Advocate Tushar Garg",
          date: "19 May 2025",
          readTime: "8 min read",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=1200&q=80",
          summary: "An in-depth analysis of landmark judgments and the expanding contours of writ jurisdiction and judicial review by the Supreme Court of India.",
          content: `Judicial review in India serves as the cornerstone of constitutional governance, ensuring that executive actions and statutory enactments strictly adhere to fundamental constitutional limits. Over recent years, the Supreme Court of India has expanded the frontiers of judicial review, balancing administrative efficiency with fundamental rights protection.

### 1. The Constitutional Framework of Judicial Review
Under Articles 32 and 226 of the Constitution of India, both the Supreme Court and High Courts possess expansive writ jurisdiction to enforce Fundamental Rights under Part III. The basic structure doctrine, established in Kesavananda Bharati, affirms that judicial review itself is an unamendable core feature of the Constitution.

### 2. Recent Supreme Court Pronouncements
In recent landmark decisions, the Apex Court has reiterated that procedural impropriety, proportionality, and non-arbitrariness (Article 14) constitute valid grounds for setting aside executive directives and delegated legislation. The court emphasized that administrative discretion must be exercised reasonably and with due regard to procedural fairness.

### 3. Key Takeaways for Legal Practitioners
- **Proportionality Test**: Courts increasingly apply the 4-prong proportionality standard in writ petitions challenging state policy.
- **Documentary Pre-requisites**: Pleadings must clearly outline the specific constitutional violations and exhausted statutory remedies.
- **Interim Protection**: Seeking stay orders requires establishing a strong prima facie case, balance of convenience, and irreparable injury.`,
          isFeatured: true
        },
        {
          title: "Bail Jurisprudence in India: Balancing Personal Liberty & Societal Interests",
          category: "CASE NOTE",
          author: "Advocate Tushar Garg",
          date: "18 May 2025",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?auto=format&fit=crop&w=600&q=80",
          summary: "Critical study on Section 439 CrPC, triple test conditions, and recent High Court guidelines on anticipatory bail.",
          content: `"Bail is the rule, jail is an exception" remains one of the most fundamental tenets of Indian criminal jurisprudence. However, balancing personal liberty guaranteed under Article 21 with societal interests and fair investigation requires careful judicial scrutiny.

### 1. The Triple Test for Bail
When evaluating regular bail applications under Section 439 CrPC (now Bharatiya Nagarik Suraksha Sanhita), courts consistently apply the three-fold test:
1. Flight Risk (Risk of absconding)
2. Tampering with Evidence (Risk of destroying documents/digital records)
3. Influencing Witnesses (Risk of coercing prosecution witnesses)

### 2. Anticipatory Bail & Section 438 CrPC
Granting pre-arrest bail requires examining the nature and gravity of accusations, antecedents of the applicant, and possibility of the applicant fleeing from justice. The Supreme Court in Sushila Aggarwal affirmed that anticipatory bail need not be restricted to a specific time frame unless extraordinary circumstances exist.`,
          isFeatured: true
        },
        {
          title: "How to Draft an Effective Writ Petition: A Practical Guide for Advocates",
          category: "PRACTICE GUIDE",
          author: "Advocate Tushar Garg",
          date: "17 May 2025",
          readTime: "7 min read",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=600&q=80",
          summary: "Step-by-step drafting framework for Article 226 and Article 32 petitions including interim relief applications.",
          content: `Drafting a writ petition before the High Court under Article 226 or the Supreme Court under Article 32 demands precision, facts organization, and clean legal arguments.

### Essential Elements of a Writ Petition:
1. **Synopsis & List of Dates**: A chronological factual timeline highlighting key events and cause of action.
2. **Question of Law**: Clearly formulated constitutional and statutory questions requiring court adjudication.
3. **Grounds**: Separate, concise numbered paragraphs alleging violations of fundamental or statutory rights.
4. **Prayer Clause**: Precise, explicit relief sought (Mandamus, Certiorari, Habeas Corpus, Prohibition, Quo Warranto).`,
          isFeatured: true
        },
        {
          title: "Arbitration & Conciliation Act: Key Statutory Amendments & Judicial Impact",
          category: "LEGAL ANALYSIS",
          author: "Advocate Tushar Garg",
          date: "16 May 2025",
          readTime: "9 min read",
          image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80",
          summary: "Analysis of automatic stay provisions, appointment of arbitrators, and enforcement of domestic arbitral awards.",
          content: `Commercial arbitration in India has witnessed significant statutory reform aimed at reducing judicial intervention, ensuring timeline compliance, and encouraging institutional arbitration.

### Key Highlights of Recent Amendments:
- **Section 11 Appointment**: Expedited appointment procedures for arbitrators.
- **Section 34 Challenge**: Strict standard of public policy grounds to set aside arbitral awards.
- **Interim Reliefs under Section 9**: Powers of emergency arbitrators and interim protection measures.`,
          isFeatured: true
        },
        {
          title: "Understanding Section 319 CrPC: Power to Proceed Against Other Persons",
          category: "EXPLAINER",
          author: "Advocate Tushar Garg",
          date: "15 May 2025",
          readTime: "5 min read",
          image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
          summary: "Procedural breakdown of court powers to summon additional accused during trial based on evidentiary standards.",
          content: `Section 319 CrPC empowers trial courts to summon any person not named as an accused in the FIR or charge sheet if evidence adduced during trial indicates their involvement in the offense.

### Standard of Evidence Required:
The Supreme Court Constitutional Bench in Hardeep Singh vs State of Punjab held that the test to be applied is much stronger than a mere prima facie case, requiring evidence demonstrating a strong probability of guilt.`,
          isFeatured: true
        },
        {
          title: "Fundamental Rights vs Directive Principles: Evolving Harmonious Construction",
          category: "CONSTITUTIONAL LAW",
          author: "Advocate Tushar Garg",
          date: "14 May 2025",
          readTime: "6 min read",
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
          summary: "Examining judicial doctrine of harmonious construction in fundamental rights litigation before apex courts.",
          content: `The relationship between Part III (Fundamental Rights) and Part IV (Directive Principles of State Policy) has evolved from formal supremacy to harmonious construction, treating both as twin pillars of social revolution in India.`,
          isFeatured: true
        }
      ];
      await this.articleModel.insertMany(defaultArticles);
      list = await this.articleModel.find().sort({ createdAt: -1 }).exec();
    }
    return list;
  }

  async findOne(id: string) {
    return this.articleModel.findById(id).exec();
  }

  async create(data: any) {
    const newItem = new this.articleModel(data);
    return newItem.save();
  }

  async update(id: string, data: any) {
    return this.articleModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

  async delete(id: string) {
    return this.articleModel.findByIdAndDelete(id).exec();
  }
}
