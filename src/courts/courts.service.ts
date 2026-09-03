import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Court, CourtDocument } from './schemas/court.schema';
import { State, StateDocument } from '../states/schemas/state.schema';
import { Judgment, JudgmentDocument } from '../judgments/schemas/judgment.schema';

@Injectable()
export class CourtsService implements OnModuleInit {
  constructor(
    @InjectModel(Court.name) private courtModel: Model<CourtDocument>,
    @InjectModel(State.name) private stateModel: Model<StateDocument>,
    @InjectModel(Judgment.name) private judgmentModel: Model<JudgmentDocument>
  ) {}

  async onModuleInit() {
    const states = await this.stateModel.find().exec();
    if (states && states.length > 0) {
      const getStateId = (slug: string) => {
        const found = states.find(s => s.slug === slug);
        return found ? found._id : states[0]._id;
      };

      const defaultCourts = [
        // HARYANA
        {
          stateId: getStateId('haryana'),
          name: "Punjab & Haryana High Court",
          slug: "punjab-and-haryana-high-court",
          courtType: "High Court",
          city: "Chandigarh",
          address: "Capital Complex, Sector 1, Chandigarh, 160001",
          jurisdiction: "State of Punjab, State of Haryana, and Union Territory of Chandigarh",
          description: "The Principal High Court exercising constitutional, appellate, and original jurisdiction for Punjab, Haryana, and Chandigarh.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 1,
          metaTitle: "Punjab & Haryana High Court - Official Information & Case Status",
          metaDescription: "Check Punjab and Haryana High Court cause lists, judgments, case status, and e-filing.",
          canonical: "https://advocateonrecordtushargarg.com/courts/haryana/punjab-and-haryana-high-court",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://highcourtchd.gov.in",
          caseStatusUrl: "https://highcourtchd.gov.in/sub_pages/left_menu/citizen_services/case_status/case_status.php",
          judgmentsUrl: "https://highcourtchd.gov.in/sub_pages/left_menu/judgments/judgments.php",
          causeListUrl: "https://highcourtchd.gov.in/sub_pages/left_menu/cause_list/causelist.php",
          recruitmentUrl: "https://highcourtchd.gov.in/sub_pages/left_menu/recruitment/recruitment.php",
          rulesUrl: "https://highcourtchd.gov.in/sub_pages/left_menu/rules/rules.php",
          contactInfo: { phone: "+91 172 2740071", email: "registrar.highcourt-chd@gov.in" },
          workingHours: "Monday to Friday: 10:00 AM - 4:30 PM (Saturday & Sunday Closed)",
          postalDetails: "The Registrar General, High Court of Punjab & Haryana, Capitol Complex, Sector 1, Chandigarh - 160001",
          history: "Designed by world-famous architect Le Corbusier, the High Court building in Capitol Complex Chandigarh was inaugurated in 1955.",
          judges: [
            { name: "Hon'ble The Chief Justice", designation: "Chief Justice", bench: "Division Bench 1", profileUrl: "#" },
            { name: "Hon'ble Senior High Court Judge", designation: "Judge", bench: "Single Bench (Civil)", profileUrl: "#" }
          ],
          services: [
            { title: "e-Filing Portal", link: "https://efiling.highcourtchd.gov.in", iconType: "Globe" },
            { title: "Certified Copy Portal", link: "https://highcourtchd.gov.in", iconType: "FileText" },
            { title: "Live Display Board", link: "https://highcourtchd.gov.in", iconType: "Activity" }
          ],
          practiceAreas: ["Constitutional Law", "Criminal Appeals", "Civil Revisions", "Service Law", "Taxation & Commercial Writs"],
          faqs: [
            { question: "How to check Punjab & Haryana High Court Case Status?", answer: "Enter your 16 digit CNR Number or Case Type & Number on highcourtchd.gov.in citizen services portal." },
            { question: "What are the court filing timings?", answer: "Physical & e-Filing counters accept documents from 10:00 AM to 3:30 PM on working days." }
          ]
        },
        {
          stateId: getStateId('haryana'),
          name: "Gurugram District & Sessions Court",
          slug: "gurugram-district-court",
          courtType: "District Court",
          city: "Gurugram",
          address: "Near Rajiv Chowk, Sector 12, Gurugram, Haryana 122001",
          jurisdiction: "Revenue District of Gurugram (Gurgaon)",
          description: "Principal Sessions and Civil Court dealing with civil litigation, commercial disputes, criminal trials, and RERA matters in Gurugram.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 2,
          metaTitle: "Gurugram District Court - Case Status & Daily Cause List",
          metaDescription: "Official legal details for Gurugram Sessions Court, Judicial Magistrates, and Family Court.",
          canonical: "https://advocateonrecordtushargarg.com/courts/haryana/gurugram-district-court",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://gurugram.dcourts.gov.in",
          caseStatusUrl: "https://services.ecourts.gov.in/ecourtindia_v6/",
          judgmentsUrl: "https://gurugram.dcourts.gov.in/judgements/",
          causeListUrl: "https://gurugram.dcourts.gov.in/cause-list/",
          recruitmentUrl: "https://gurugram.dcourts.gov.in/notice-category/recruitment/",
          rulesUrl: "https://gurugram.dcourts.gov.in",
          contactInfo: { phone: "+91 124 2321234", email: "distct-gur-hr@gov.in" },
          workingHours: "Monday to Saturday: 10:00 AM - 5:00 PM (2nd & 4th Saturday Closed)",
          postalDetails: "District & Sessions Judge, District Courts Complex, Sector 12, Gurugram, Haryana - 122001",
          history: "Established to serve the rapidly expanding commercial hub of Gurugram, managing over 50 judicial courtrooms.",
          judges: [
            { name: "District & Sessions Judge Gurugram", designation: "District Judge", bench: "Sessions Court 1", profileUrl: "#" }
          ],
          services: [
            { title: "e-Courts Services App", link: "https://ecourts.gov.in", iconType: "Smartphone" },
            { title: "Free Legal Aid Cell", link: "https://gurugram.dcourts.gov.in", iconType: "Shield" }
          ],
          practiceAreas: ["Commercial Disputes", "Real Estate & RERA", "Bail & Criminal Defense", "Matrimonial & Family Law", "Motor Accident Claims"],
          faqs: [
            { question: "Where is Gurugram District Court located?", answer: "It is located near Rajiv Chowk, Sector 12, Gurugram, Haryana." }
          ]
        },

        // DELHI
        {
          stateId: getStateId('delhi'),
          name: "High Court of Delhi",
          slug: "delhi-high-court",
          courtType: "High Court",
          city: "New Delhi",
          address: "Shershah Road, Justice City, New Delhi - 110003",
          jurisdiction: "National Capital Territory of Delhi",
          description: "Chartered High Court having original civil jurisdiction, writ jurisdiction, and appellate jurisdiction over NCT of Delhi.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 3,
          metaTitle: "Delhi High Court - Case Status, Cause List & Judgments",
          metaDescription: "Delhi High Court online portal for cause list, orders, e-filing, and judgment search.",
          canonical: "https://advocateonrecordtushargarg.com/courts/delhi/delhi-high-court",
          image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://delhihighcourt.nic.in",
          caseStatusUrl: "https://delhihighcourt.nic.in/dhc_case_status.asp",
          judgmentsUrl: "https://delhihighcourt.nic.in/dhc_judgement.asp",
          causeListUrl: "https://delhihighcourt.nic.in/dhc_causelist.asp",
          recruitmentUrl: "https://delhihighcourt.nic.in/recruitment.asp",
          rulesUrl: "https://delhihighcourt.nic.in/rules.asp",
          contactInfo: { phone: "+91 11 23386363", email: "delhihighcourt@nic.in" },
          workingHours: "Monday to Friday: 10:00 AM - 4:30 PM",
          postalDetails: "The Registrar General, Delhi High Court, Sher Shah Road, New Delhi - 110003",
          history: "Established in October 1966 with four judges, Delhi High Court is renowned for pioneering judicial reforms and e-filing.",
          judges: [
            { name: "Hon'ble The Chief Justice of Delhi", designation: "Chief Justice", bench: "Court No. 1", profileUrl: "#" }
          ],
          services: [
            { title: "Delhi High Court e-Filing", link: "https://efiling.delhihighcourt.nic.in", iconType: "Globe" },
            { title: "Online Copying Section", link: "https://delhihighcourt.nic.in", iconType: "FileText" }
          ],
          practiceAreas: ["Constitutional Writs", "Intellectual Property (IPR)", "Arbitration & Commercial Law", "Taxation & Customs", "Criminal Special Appeals"],
          faqs: [
            { question: "How to view Delhi High Court Cause List?", answer: "Visit delhihighcourt.nic.in and click on Daily Cause List under Court Services tab." }
          ]
        },
        {
          stateId: getStateId('delhi'),
          name: "Patiala House District Court, New Delhi",
          slug: "patiala-house-court",
          courtType: "District Court",
          city: "New Delhi",
          address: "Patiala House, India Gate, New Delhi - 110001",
          jurisdiction: "New Delhi Judicial District",
          description: "Historic District Court complex handling special CBI cases, NIA trials, Enforcement Directorate matters, and New Delhi district litigation.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 4,
          metaTitle: "Patiala House Court New Delhi - Legal Services & Cause List",
          metaDescription: "New Delhi Judicial District Court at Patiala House near India Gate.",
          canonical: "https://advocateonrecordtushargarg.com/courts/delhi/patiala-house-court",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://delhidistrictcourts.nic.in",
          caseStatusUrl: "https://services.ecourts.gov.in",
          judgmentsUrl: "https://delhidistrictcourts.nic.in",
          causeListUrl: "https://delhidistrictcourts.nic.in",
          recruitmentUrl: "https://delhidistrictcourts.nic.in",
          rulesUrl: "https://delhidistrictcourts.nic.in",
          contactInfo: { phone: "+91 11 23384567", email: "nddistrict@nic.in" },
          workingHours: "Monday to Saturday: 10:00 AM - 5:00 PM (2nd & 4th Saturday Closed)",
          postalDetails: "Principal District & Sessions Judge, Patiala House Courts, New Delhi - 110001",
          history: "Housed in the former palace of the Maharaja of Patiala near India Gate, converted into court premises in 1977.",
          judges: [
            { name: "Principal District & Sessions Judge New Delhi", designation: "District Judge", bench: "Court Room 1", profileUrl: "#" }
          ],
          services: [
            { title: "Special CBI Court Counter", link: "#", iconType: "Shield" }
          ],
          practiceAreas: ["PMLA & Economic Offences", "CBI & NIA Trials", "NDPS & Special Statutes", "Civil & Rent Matters"],
          faqs: [
            { question: "Where is Patiala House Court located?", answer: "Adjacent to India Gate on Tilak Marg, New Delhi." }
          ]
        },

        // RAJASTHAN
        {
          stateId: getStateId('rajasthan'),
          name: "Rajasthan High Court, Jodhpur",
          slug: "rajasthan-high-court",
          courtType: "High Court",
          city: "Jodhpur",
          address: "Jhalamand, Jodhpur, Rajasthan - 342005",
          jurisdiction: "State of Rajasthan",
          description: "Principal Seat of Rajasthan High Court located at Jodhpur with a Permanent Bench at Jaipur.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 5,
          metaTitle: "Rajasthan High Court Jodhpur & Jaipur Bench",
          metaDescription: "Official website for Rajasthan High Court Judgments, Cause Lists, and Case Status.",
          canonical: "https://advocateonrecordtushargarg.com/courts/rajasthan/rajasthan-high-court",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://hcraj.nic.in",
          caseStatusUrl: "https://hcraj.nic.in/hcraj/casestatus.php",
          judgmentsUrl: "https://hcraj.nic.in/hcraj/judgement.php",
          causeListUrl: "https://hcraj.nic.in/hcraj/causelist.php",
          recruitmentUrl: "https://hcraj.nic.in/hcraj/recruitment.php",
          rulesUrl: "https://hcraj.nic.in",
          contactInfo: { phone: "+91 291 2888000", email: "rhc-jod-rj@nic.in" },
          workingHours: "Monday to Friday: 10:30 AM - 4:30 PM",
          postalDetails: "Registrar General, Rajasthan High Court, Jhalamand, Jodhpur - 342005",
          history: "Inaugurated in August 1949 by Rajpramukh Maharaja Sawai Man Singh of Jaipur.",
          judges: [
            { name: "Hon'ble The Chief Justice of Rajasthan", designation: "Chief Justice", bench: "Court No. 1 Jodhpur", profileUrl: "#" }
          ],
          services: [
            { title: "Rajasthan High Court e-Services", link: "https://hcraj.nic.in", iconType: "Globe" }
          ],
          practiceAreas: ["Constitutional Writs", "Land & Revenue Matters", "Criminal Revisions", "Service Disputes"],
          faqs: [
            { question: "Does Rajasthan High Court have two benches?", answer: "Yes, Principal Seat at Jodhpur and Permanent Bench at Jaipur." }
          ]
        },

        // UTTAR PRADESH
        {
          stateId: getStateId('uttar-pradesh'),
          name: "High Court of Judicature at Allahabad",
          slug: "allahabad-high-court",
          courtType: "High Court",
          city: "Prayagraj",
          address: "Nyaya Marg, Cantonment, Prayagraj (Allahabad), UP - 211017",
          jurisdiction: "State of Uttar Pradesh",
          description: "One of the oldest and largest High Courts in India, exercising jurisdiction over the entire state of Uttar Pradesh.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 6,
          metaTitle: "Allahabad High Court & Lucknow Bench Portal",
          metaDescription: "Allahabad High Court judgments, online case status, cause list, and notification portal.",
          canonical: "https://advocateonrecordtushargarg.com/courts/uttar-pradesh/allahabad-high-court",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://www.allahabadhighcourt.in",
          caseStatusUrl: "https://www.allahabadhighcourt.in/casestatus/",
          judgmentsUrl: "https://www.allahabadhighcourt.in/judgments/",
          causeListUrl: "https://www.allahabadhighcourt.in/causelist/",
          recruitmentUrl: "https://www.allahabadhighcourt.in/recruitment/",
          rulesUrl: "https://www.allahabadhighcourt.in",
          contactInfo: { phone: "+91 532 2422335", email: "registrar@allahabadhighcourt.in" },
          workingHours: "Monday to Friday: 10:00 AM - 4:00 PM",
          postalDetails: "The Registrar General, High Court of Judicature at Allahabad, Prayagraj - 211017",
          history: "Established in 1866 under Indian High Courts Act 1861, shifting from Agra to Allahabad in 1869.",
          judges: [
            { name: "Hon'ble The Chief Justice of Allahabad High Court", designation: "Chief Justice", bench: "Court No. 1", profileUrl: "#" }
          ],
          services: [
            { title: "UP Judicial Services Portal", link: "https://www.allahabadhighcourt.in", iconType: "Globe" }
          ],
          practiceAreas: ["Constitutional Writs", "PIL & Environmental Law", "Criminal Appeals & Bails", "Land Acquisition"],
          faqs: [
            { question: "Where is Allahabad High Court Lucknow bench located?", answer: "At Vibhuti Khand, Gomti Nagar, Lucknow." }
          ]
        },

        // MADHYA PRADESH
        {
          stateId: getStateId('madhya-pradesh'),
          name: "High Court of Madhya Pradesh",
          slug: "madhya-pradesh-high-court",
          courtType: "High Court",
          city: "Jabalpur",
          address: "Civil Lines, Jabalpur, Madhya Pradesh - 482001",
          jurisdiction: "State of Madhya Pradesh",
          description: "Principal Seat of MP High Court at Jabalpur with Benches at Indore and Gwalior.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 7,
          metaTitle: "Madhya Pradesh High Court Jabalpur, Indore & Gwalior",
          metaDescription: "MP High Court official website for cause lists, case status, and certified judgments.",
          canonical: "https://advocateonrecordtushargarg.com/courts/madhya-pradesh/madhya-pradesh-high-court",
          image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://mphc.gov.in",
          caseStatusUrl: "https://mphc.gov.in/case-status",
          judgmentsUrl: "https://mphc.gov.in/judgement-orders",
          causeListUrl: "https://mphc.gov.in/cause-list",
          recruitmentUrl: "https://mphc.gov.in/recruitment-result",
          rulesUrl: "https://mphc.gov.in",
          contactInfo: { phone: "+91 761 2620380", email: "mphc@nic.in" },
          workingHours: "Monday to Friday: 10:00 AM - 5:00 PM",
          postalDetails: "Registrar General, High Court of MP, Jabalpur - 482001",
          history: "Established in November 1956 under the States Reorganisation Act.",
          judges: [
            { name: "Hon'ble The Chief Justice of MP", designation: "Chief Justice", bench: "Court No. 1 Jabalpur", profileUrl: "#" }
          ],
          services: [
            { title: "MP High Court e-Filing", link: "https://mphc.gov.in", iconType: "Globe" }
          ],
          practiceAreas: ["Constitutional Writs", "Criminal Revision", "Civil Appeals", "Service & Pension Matters"],
          faqs: [
            { question: "Where are the MP High Court benches located?", answer: "Benches are located in Indore and Gwalior." }
          ]
        },

        // GUJARAT
        {
          stateId: getStateId('gujarat'),
          name: "High Court of Gujarat",
          slug: "gujarat-high-court",
          courtType: "High Court",
          city: "Ahmedabad",
          address: "SG Highway, Sola, Ahmedabad, Gujarat - 380060",
          jurisdiction: "State of Gujarat",
          description: "Apex judicial authority in Gujarat exercising original and appellate jurisdiction.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 8,
          metaTitle: "Gujarat High Court Ahmedabad - Official Legal Portal",
          metaDescription: "Gujarat High Court cause lists, judgments, and case status search.",
          canonical: "https://advocateonrecordtushargarg.com/courts/gujarat/gujarat-high-court",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://gujarathighcourt.nic.in",
          caseStatusUrl: "https://gujarathighcourt.nic.in/casestatus",
          judgmentsUrl: "https://gujarathighcourt.nic.in/judgements",
          causeListUrl: "https://gujarathighcourt.nic.in/causelist",
          recruitmentUrl: "https://hc-ojs.gujarat.gov.in",
          rulesUrl: "https://gujarathighcourt.nic.in",
          contactInfo: { phone: "+91 79 27664601", email: "rg-hc-guj@nic.in" },
          workingHours: "Monday to Friday: 10:30 AM - 5:00 PM",
          postalDetails: "Registrar General, High Court of Gujarat, Sola, Ahmedabad - 380060",
          history: "Established in May 1960 following the bifurcation of Bombay State.",
          judges: [
            { name: "Hon'ble The Chief Justice of Gujarat", designation: "Chief Justice", bench: "Court No. 1", profileUrl: "#" }
          ],
          services: [
            { title: "Gujarat High Court Live Stream", link: "https://gujarathighcourt.nic.in", iconType: "Activity" }
          ],
          practiceAreas: ["Commercial Litigation", "Constitutional Writs", "Taxation", "Company Appeals"],
          faqs: [
            { question: "Is Gujarat High Court live streaming proceedings?", answer: "Yes, Gujarat High Court pioneered YouTube live streaming of bench proceedings." }
          ]
        },

        // MAHARASHTRA
        {
          stateId: getStateId('maharashtra'),
          name: "High Court of Judicature at Bombay",
          slug: "bombay-high-court",
          courtType: "High Court",
          city: "Mumbai",
          address: "Fort, Mumbai, Maharashtra - 400032",
          jurisdiction: "State of Maharashtra, State of Goa, UT of Dadra & Nagar Haveli and Daman & Diu",
          description: "One of the three oldest High Courts in India with benches at Nagpur, Aurangabad, and Panaji (Goa).",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 9,
          metaTitle: "Bombay High Court Mumbai & Benches - Official Portal",
          metaDescription: "Bombay High Court cause list, order, judgment, and e-filing status.",
          canonical: "https://advocateonrecordtushargarg.com/courts/maharashtra/bombay-high-court",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://bombayhighcourt.nic.in",
          caseStatusUrl: "https://bombayhighcourt.nic.in/casualist.php",
          judgmentsUrl: "https://bombayhighcourt.nic.in/judgments.php",
          causeListUrl: "https://bombayhighcourt.nic.in/causelist.php",
          recruitmentUrl: "https://bombayhighcourt.nic.in/recruitment.php",
          rulesUrl: "https://bombayhighcourt.nic.in",
          contactInfo: { phone: "+91 22 22672800", email: "hcbombay@nic.in" },
          workingHours: "Monday to Friday: 10:30 AM - 4:30 PM",
          postalDetails: "The Registrar General, High Court of Judicature at Bombay, Fort, Mumbai - 400032",
          history: "Established on August 14, 1862 under the High Courts Act 1861, designated as a UNESCO World Heritage site architecture.",
          judges: [
            { name: "Hon'ble The Chief Justice of Bombay", designation: "Chief Justice", bench: "Court Room No. 1", profileUrl: "#" }
          ],
          services: [
            { title: "Bombay High Court e-Filing 3.0", link: "https://efiling.ecourts.gov.in", iconType: "Globe" }
          ],
          practiceAreas: ["Commercial Arbitration", "Admiralty & Maritime Law", "Constitutional Law", "Corporate Appeals"],
          faqs: [
            { question: "Where are Bombay High Court benches located?", answer: "At Nagpur, Aurangabad, and Panaji (Goa)." }
          ]
        },

        // BIHAR
        {
          stateId: getStateId('bihar'),
          name: "High Court of Judicature at Patna",
          slug: "patna-high-court",
          courtType: "High Court",
          city: "Patna",
          address: "Jawaharlal Nehru Marg, Patna, Bihar - 800001",
          jurisdiction: "State of Bihar",
          description: "Chartered High Court exercising constitutional, criminal, and civil jurisdiction over Bihar.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 10,
          metaTitle: "Patna High Court - Case Status, Cause List & Judgments",
          metaDescription: "Patna High Court official portal for cause list, order search, and notices.",
          canonical: "https://advocateonrecordtushargarg.com/courts/bihar/patna-high-court",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://patnahighcourt.gov.in",
          caseStatusUrl: "https://patnahighcourt.gov.in/casestatus",
          judgmentsUrl: "https://patnahighcourt.gov.in/judgements",
          causeListUrl: "https://patnahighcourt.gov.in/causelist",
          recruitmentUrl: "https://patnahighcourt.gov.in/recruitment",
          rulesUrl: "https://patnahighcourt.gov.in",
          contactInfo: { phone: "+91 612 2504071", email: "phc-bih@nic.in" },
          workingHours: "Monday to Friday: 10:15 AM - 4:15 PM",
          postalDetails: "Registrar General, Patna High Court, Bailey Road, Patna - 800001",
          history: "Established in February 1916 and opened by Lord Hardinge.",
          judges: [
            { name: "Hon'ble The Chief Justice of Patna", designation: "Chief Justice", bench: "Court No. 1", profileUrl: "#" }
          ],
          services: [
            { title: "Patna High Court Mobile App", link: "https://patnahighcourt.gov.in", iconType: "Smartphone" }
          ],
          practiceAreas: ["Constitutional Law", "Bail Petitions", "Service Matters", "Land Revenue"],
          faqs: [
            { question: "How to check Patna High Court case status?", answer: "Use token number, case type, or advocate name on patnahighcourt.gov.in." }
          ]
        },

        // WEST BENGAL
        {
          stateId: getStateId('west-bengal'),
          name: "High Court at Calcutta",
          slug: "calcutta-high-court",
          courtType: "High Court",
          city: "Kolkata",
          address: "3, 1st Floor, Esplanade Row West, B.B.D. Bagh, Kolkata, West Bengal - 700001",
          jurisdiction: "State of West Bengal and Union Territory of Andaman and Nicobar Islands",
          description: "The oldest High Court in India, established under the High Courts Act 1861 with Circuit Bench at Jalpaiguri and Port Blair.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 11,
          metaTitle: "Calcutta High Court Kolkata - Oldest High Court in India",
          metaDescription: "Calcutta High Court official portal for cause list, order, and judgment search.",
          canonical: "https://advocateonrecordtushargarg.com/courts/west-bengal/calcutta-high-court",
          image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://calcuttahighcourt.gov.in",
          caseStatusUrl: "https://calcuttahighcourt.gov.in/casestatus",
          judgmentsUrl: "https://calcuttahighcourt.gov.in/judgements",
          causeListUrl: "https://calcuttahighcourt.gov.in/causelist",
          recruitmentUrl: "https://calcuttahighcourt.gov.in/recruitment",
          rulesUrl: "https://calcuttahighcourt.gov.in",
          contactInfo: { phone: "+91 33 22487801", email: "rgcalcuttahc@nic.in" },
          workingHours: "Monday to Friday: 10:30 AM - 4:30 PM",
          postalDetails: "The Registrar General, High Court at Calcutta, 3 Esplanade Row West, Kolkata - 700001",
          history: "Established on July 1, 1862, designed in Neo-Gothic style based on the Cloth Hall in Ypres, Belgium.",
          judges: [
            { name: "Hon'ble The Chief Justice of Calcutta", designation: "Chief Justice", bench: "Court Room 1", profileUrl: "#" }
          ],
          services: [
            { title: "Calcutta HC e-Court Portal", link: "https://calcuttahighcourt.gov.in", iconType: "Globe" }
          ],
          practiceAreas: ["Admiralty Jurisdiction", "Constitutional Writs", "Intellectual Property", "Commercial Suits"],
          faqs: [
            { question: "Is Calcutta High Court the oldest High Court in India?", answer: "Yes, established on 1st July 1862." }
          ]
        },

        // KARNATAKA
        {
          stateId: getStateId('karnataka'),
          name: "High Court of Karnataka",
          slug: "karnataka-high-court",
          courtType: "High Court",
          city: "Bengaluru",
          address: "Attara Kacheri, Ambedkar Veedhi, Opp. Vidhana Soudha, Bengaluru - 560001",
          jurisdiction: "State of Karnataka",
          description: "High Court housed in historic Attara Kacheri with Benches at Dharwad and Kalaburagi.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 12,
          metaTitle: "Karnataka High Court Bengaluru - Official Information",
          metaDescription: "Karnataka High Court cause lists, judgments, and online case tracking.",
          canonical: "https://advocateonrecordtushargarg.com/courts/karnataka/karnataka-high-court",
          image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://karnatakahighcourt.kar.nic.in",
          caseStatusUrl: "https://karnatakahighcourt.kar.nic.in/casestatus.php",
          judgmentsUrl: "https://karnatakahighcourt.kar.nic.in/judgments.php",
          causeListUrl: "https://karnatakahighcourt.kar.nic.in/causelist.php",
          recruitmentUrl: "https://karnatakahighcourt.kar.nic.in/recruitment.php",
          rulesUrl: "https://karnatakahighcourt.kar.nic.in",
          contactInfo: { phone: "+91 80 22954864", email: "rghck-kar@nic.in" },
          workingHours: "Monday to Friday: 10:30 AM - 4:45 PM",
          postalDetails: "Registrar General, High Court of Karnataka, Attara Kacheri, Bengaluru - 560001",
          history: "Housed in Attara Kacheri (18 Offices building) constructed during the reign of Tipu Sultan and Tipu's successors.",
          judges: [
            { name: "Hon'ble The Chief Justice of Karnataka", designation: "Chief Justice", bench: "Court Hall 1", profileUrl: "#" }
          ],
          services: [
            { title: "Karnataka HC Online Case Status", link: "https://karnatakahighcourt.kar.nic.in", iconType: "Globe" }
          ],
          practiceAreas: ["IT & Technology Disputes", "Constitutional Law", "Company Matters", "Land Revenue"],
          faqs: [
            { question: "Where are Karnataka High Court circuit benches?", answer: "At Dharwad and Kalaburagi." }
          ]
        },

        // TAMIL NADU
        {
          stateId: getStateId('tamil-nadu'),
          name: "High Court of Judicature at Madras",
          slug: "madras-high-court",
          courtType: "High Court",
          city: "Chennai",
          address: "High Court Campus, Parrys, George Town, Chennai, Tamil Nadu - 600104",
          jurisdiction: "State of Tamil Nadu and Union Territory of Puducherry",
          description: "Chartered High Court established in 1862 with a Permanent Bench at Madurai.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 13,
          metaTitle: "Madras High Court Chennai & Madurai Bench Portal",
          metaDescription: "Madras High Court cause list, judgments, orders, and e-filing.",
          canonical: "https://advocateonrecordtushargarg.com/courts/tamil-nadu/madras-high-court",
          image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://hcmadras.tn.gov.in",
          caseStatusUrl: "https://hcmadras.tn.gov.in/casestatus",
          judgmentsUrl: "https://hcmadras.tn.gov.in/judgements",
          causeListUrl: "https://hcmadras.tn.gov.in/causelist",
          recruitmentUrl: "https://mhc.tn.gov.in/recruitment",
          rulesUrl: "https://hcmadras.tn.gov.in",
          contactInfo: { phone: "+91 44 25301349", email: "hcmadras@tn.gov.in" },
          workingHours: "Monday to Friday: 10:30 AM - 4:30 PM",
          postalDetails: "The Registrar General, High Court of Madras, Parrys, Chennai - 600104",
          history: "Established on June 26, 1862 by Letters Patent granted by Queen Victoria.",
          judges: [
            { name: "Hon'ble The Chief Justice of Madras", designation: "Chief Justice", bench: "Court Hall 1", profileUrl: "#" }
          ],
          services: [
            { title: "Madras High Court e-Filing", link: "https://mhc.tn.gov.in", iconType: "Globe" }
          ],
          practiceAreas: ["Indo-Saracenic Architecture", "Constitutional Writs", "Admiralty", "Arbitration"],
          faqs: [
            { question: "Does Madras High Court have jurisdiction over Puducherry?", answer: "Yes, Puducherry is under Madras High Court jurisdiction." }
          ]
        },

        // TELANGANA
        {
          stateId: getStateId('telangana'),
          name: "High Court for the State of Telangana",
          slug: "telangana-high-court",
          courtType: "High Court",
          city: "Hyderabad",
          address: "Near Govt. City College, High Court Road, Madina, Hyderabad - 500066",
          jurisdiction: "State of Telangana",
          description: "High Court exercising jurisdiction over the state of Telangana situated on the banks of Musi River.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 14,
          metaTitle: "Telangana High Court Hyderabad - Case Status & Orders",
          metaDescription: "Telangana High Court Hyderabad official portal for cause lists and judgments.",
          canonical: "https://advocateonrecordtushargarg.com/courts/telangana/telangana-high-court",
          image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://tshc.gov.in",
          caseStatusUrl: "https://tshc.gov.in/casestatus",
          judgmentsUrl: "https://tshc.gov.in/judgements",
          causeListUrl: "https://tshc.gov.in/causelist",
          recruitmentUrl: "https://tshc.gov.in/recruitment",
          rulesUrl: "https://tshc.gov.in",
          contactInfo: { phone: "+91 40 23446166", email: "tshc-hyd@gov.in" },
          workingHours: "Monday to Friday: 10:15 AM - 4:30 PM",
          postalDetails: "Registrar General, High Court for Telangana, High Court Road, Hyderabad - 500066",
          history: "Constructed in 1919 by the 7th Nizam Mir Osman Ali Khan in Indo-Saracenic style.",
          judges: [
            { name: "Hon'ble The Chief Justice of Telangana", designation: "Chief Justice", bench: "Court Hall 1", profileUrl: "#" }
          ],
          services: [
            { title: "Telangana High Court e-Services", link: "https://tshc.gov.in", iconType: "Globe" }
          ],
          practiceAreas: ["Constitutional Writs", "IT & Cyber Law", "Commercial Disputes", "Service Matters"],
          faqs: [
            { question: "Where is Telangana High Court located?", answer: "At Madina, near Govt City College on Musi River bank, Hyderabad." }
          ]
        },

        // KERALA
        {
          stateId: getStateId('kerala'),
          name: "High Court of Kerala",
          slug: "kerala-high-court",
          courtType: "High Court",
          city: "Ernakulam",
          address: "High Court Road, Marine Drive, Ernakulam, Kochi, Kerala - 682031",
          jurisdiction: "State of Kerala and Union Territory of Lakshadweep",
          description: "High Court exercising jurisdiction over Kerala and Lakshadweep Islands.",
          featured: true,
          status: "PUBLISHED",
          displayOrder: 15,
          metaTitle: "Kerala High Court Ernakulam - Case Status & Judgments",
          metaDescription: "Kerala High Court cause lists, judgments, and e-filing status.",
          canonical: "https://advocateonrecordtushargarg.com/courts/kerala/kerala-high-court",
          image: "https://images.unsplash.com/photo-1505664159871-9ca1920f01a4?q=80&w=800&auto=format&fit=crop",
          officialWebsite: "https://hckerala.gov.in",
          caseStatusUrl: "https://hckerala.gov.in/casestatus",
          judgmentsUrl: "https://hckerala.gov.in/judgements",
          causeListUrl: "https://hckerala.gov.in/causelist",
          recruitmentUrl: "https://hckerala.gov.in/recruitment",
          rulesUrl: "https://hckerala.gov.in",
          contactInfo: { phone: "+91 484 2562553", email: "hckerala@nic.in" },
          workingHours: "Monday to Friday: 10:00 AM - 4:30 PM",
          postalDetails: "Registrar General, High Court of Kerala, Marine Drive, Kochi - 682031",
          history: "Established in November 1956 under the States Reorganisation Act.",
          judges: [
            { name: "Hon'ble The Chief Justice of Kerala", designation: "Chief Justice", bench: "Court Hall 1A", profileUrl: "#" }
          ],
          services: [
            { title: "Kerala High Court Paperless Court Portal", link: "https://hckerala.gov.in", iconType: "Globe" }
          ],
          practiceAreas: ["Constitutional Writs", "Maritime & Environmental Law", "Land & Revenue", "Service Appeals"],
          faqs: [
            { question: "Does Kerala High Court have paperless courts?", answer: "Yes, Kerala High Court is a pioneer in digital paperless courtrooms." }
          ]
        }
      ];

      for (const courtObj of defaultCourts) {
        const exists = await this.courtModel.findOne({ slug: courtObj.slug }).exec();
        if (!exists) {
          await this.courtModel.create(courtObj);
          console.log(`Seeded court: ${courtObj.name}`);
        } else {
          await this.courtModel.updateOne({ slug: courtObj.slug }, courtObj).exec();
        }
      }
    }
  }

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
    
    if (court.stateId.toString() !== stateId.toString()) {
      return null;
    }

    const judgments = await this.judgmentModel.find({ courtId: court._id }).sort({ date: -1 }).exec();

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

  async update(id: string, updateData: any) {
    return this.courtModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async findAllJudgments() {
    let judgments = await this.judgmentModel.find().populate('courtId', 'name').sort({ date: -1 }).exec();
    
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

  async createJudgment(data: any) {
    const newJudgment = new this.judgmentModel(data);
    return newJudgment.save();
  }

  async updateJudgment(id: string, data: any) {
    return this.judgmentModel.findByIdAndUpdate(id, data, { new: true }).exec();
  }

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
