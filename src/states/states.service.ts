import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { State, StateDocument } from './schemas/state.schema';

const defaultStates = [
  {
    name: "Haryana",
    slug: "haryana",
    code: "HR",
    description: "Punjab & Haryana High Court, Gurugram, Faridabad, Karnal, Panchkula, and Ambala District Courts.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 1,
    metaTitle: "Haryana Courts & Judicial Services - Advocate Tushar Garg",
    metaDescription: "Comprehensive legal directory for Haryana High Court and Subordinate District Courts.",
    canonical: "https://advocateonrecordtushargarg.com/courts/haryana",
    ogImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Punjab",
    slug: "punjab",
    code: "PB",
    description: "Punjab & Haryana High Court at Chandigarh, Ludhiana, Jalandhar, Amritsar, and Patiala Sessions Courts.",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 2,
    metaTitle: "Punjab Courts & Legal Services Directory",
    metaDescription: "High Court of Punjab & Haryana, District Courts, and Legal Services in Punjab.",
    canonical: "https://advocateonrecordtushargarg.com/courts/punjab",
    ogImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Delhi",
    slug: "delhi",
    code: "DL",
    description: "High Court of Delhi, Supreme Court of India, Tis Hazari, Patiala House, Karkardooma, Saket, Dwarka, and Rohini Courts.",
    image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 3,
    metaTitle: "Delhi High Court & District Courts Legal Portal",
    metaDescription: "Supreme Court, Delhi High Court, and 6 District Court Complexes in National Capital Territory of Delhi.",
    canonical: "https://advocateonrecordtushargarg.com/courts/delhi",
    ogImage: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Rajasthan",
    slug: "rajasthan",
    code: "RJ",
    description: "Rajasthan High Court at Jodhpur, Jaipur Bench, Kota, Udaipur, Jodhpur, and Bikaner District Courts.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 4,
    metaTitle: "Rajasthan High Court & District Judiciary Directory",
    metaDescription: "High Court of Judicature for Rajasthan at Jodhpur & Jaipur Bench.",
    canonical: "https://advocateonrecordtushargarg.com/courts/rajasthan",
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Uttar Pradesh",
    slug: "uttar-pradesh",
    code: "UP",
    description: "Allahabad High Court, Lucknow Bench, Noida, Ghaziabad, Kanpur Nagar, Varanasi, and Agra District Courts.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 5,
    metaTitle: "Uttar Pradesh High Court & Subordinate Courts",
    metaDescription: "Allahabad High Court & Lucknow Bench litigation, cause lists, and case status.",
    canonical: "https://advocateonrecordtushargarg.com/courts/uttar-pradesh",
    ogImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Madhya Pradesh",
    slug: "madhya-pradesh",
    code: "MP",
    description: "High Court of Madhya Pradesh at Jabalpur, Indore Bench, Gwalior Bench, Bhopal, and Indore District Courts.",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 6,
    metaTitle: "Madhya Pradesh High Court & District Courts Legal Directory",
    metaDescription: "MP High Court Principal Seat Jabalpur, Indore Bench, Gwalior Bench.",
    canonical: "https://advocateonrecordtushargarg.com/courts/madhya-pradesh",
    ogImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Gujarat",
    slug: "gujarat",
    code: "GJ",
    description: "High Court of Gujarat at Ahmedabad, Surat, Vadodara, Rajkot, and Gandhinagar District Judiciary.",
    image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 7,
    metaTitle: "Gujarat High Court & Subordinate Judiciary Directory",
    metaDescription: "Gujarat High Court Sola Ahmedabad and District Courts across Gujarat State.",
    canonical: "https://advocateonrecordtushargarg.com/courts/gujarat",
    ogImage: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Maharashtra",
    slug: "maharashtra",
    code: "MH",
    description: "Bombay High Court at Mumbai, Nagpur Bench, Aurangabad Bench, Goa Bench, Pune, and Thane District Courts.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 8,
    metaTitle: "Bombay High Court & Maharashtra District Courts",
    metaDescription: "High Court of Judicature at Bombay, City Civil Court Mumbai, Sessions Courts.",
    canonical: "https://advocateonrecordtushargarg.com/courts/maharashtra",
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Bihar",
    slug: "bihar",
    code: "BR",
    description: "Patna High Court, Patna Civil Court, Muzaffarpur, Gaya, and Bhagalpur District Courts.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 9,
    metaTitle: "Patna High Court & Bihar District Judiciary",
    metaDescription: "High Court of Judicature at Patna and District Sessions Courts across Bihar.",
    canonical: "https://advocateonrecordtushargarg.com/courts/bihar",
    ogImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "West Bengal",
    slug: "west-bengal",
    code: "WB",
    description: "Calcutta High Court, City Civil Court Kolkata, Howrah, North 24 Parganas, and South 24 Parganas Courts.",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 10,
    metaTitle: "Calcutta High Court & West Bengal District Courts",
    metaDescription: "High Court at Calcutta - Chartered High Court of India.",
    canonical: "https://advocateonrecordtushargarg.com/courts/west-bengal",
    ogImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Karnataka",
    slug: "karnataka",
    code: "KA",
    description: "High Court of Karnataka at Bengaluru, Dharwad Bench, Kalaburagi Bench, and City Civil Court Bengaluru.",
    image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 11,
    metaTitle: "Karnataka High Court & Bengaluru District Courts",
    metaDescription: "High Court of Karnataka Attara Kacheri Bengaluru, Dharwad, Kalaburagi Benches.",
    canonical: "https://advocateonrecordtushargarg.com/courts/karnataka",
    ogImage: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Tamil Nadu",
    slug: "tamil-nadu",
    code: "TN",
    description: "Madras High Court at Chennai, Madurai Bench, City Civil Court Chennai, and Coimbatore District Courts.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 12,
    metaTitle: "Madras High Court & Tamil Nadu Judiciary Directory",
    metaDescription: "High Court of Judicature at Madras & Madurai Bench.",
    canonical: "https://advocateonrecordtushargarg.com/courts/tamil-nadu",
    ogImage: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Telangana",
    slug: "telangana",
    code: "TS",
    description: "High Court for the State of Telangana at Hyderabad, City Civil Court Hyderabad, and Ranga Reddy Courts.",
    image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 13,
    metaTitle: "Telangana High Court & Hyderabad Courts Portal",
    metaDescription: "High Court for Telangana at Hyderabad and District Sessions Courts.",
    canonical: "https://advocateonrecordtushargarg.com/courts/telangana",
    ogImage: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop"
  },
  {
    name: "Kerala",
    slug: "kerala",
    code: "KL",
    description: "High Court of Kerala at Ernakulam, Thiruvananthapuram, Kozhikode, and Thrissur District Courts.",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop",
    status: "PUBLISHED",
    featured: true,
    displayOrder: 14,
    metaTitle: "Kerala High Court & District Courts Legal Services",
    metaDescription: "High Court of Kerala Ernakulam and District Courts across Kerala State.",
    canonical: "https://advocateonrecordtushargarg.com/courts/kerala",
    ogImage: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=600&auto=format&fit=crop"
  }
];

@Injectable()
export class StatesService implements OnModuleInit {
  constructor(@InjectModel(State.name) private stateModel: Model<StateDocument>) {}

  async onModuleInit() {
    for (const stateObj of defaultStates) {
      const exists = await this.stateModel.findOne({ slug: stateObj.slug }).exec();
      if (!exists) {
        await this.stateModel.create(stateObj);
        console.log(`Seeded state: ${stateObj.name}`);
      }
    }
  }

  async findAll() {
    return this.stateModel.find().sort({ displayOrder: 1 }).lean().exec();
  }

  async findPublished() {
    return this.stateModel.find({ status: 'PUBLISHED' }).sort({ displayOrder: 1 }).lean().exec();
  }

  async findBySlug(slug: string) {
    return this.stateModel.findOne({ slug }).lean().exec();
  }

  async create(createData: any) {
    const newState = new this.stateModel(createData);
    return newState.save();
  }

  async update(id: string, updateData: any) {
    return this.stateModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string) {
    return this.stateModel.findByIdAndDelete(id).exec();
  }
}
