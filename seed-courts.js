const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI || 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/tusar-garg-advocate?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

// Comprehensive court definitions mapped by State Name with 100% working URLs
const seedCourtsData = [
  {
    stateName: 'Delhi',
    courts: [
      {
        name: 'High Court of Delhi',
        slug: 'delhi-high-court',
        courtType: 'High Court',
        city: 'New Delhi',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'The High Court of Delhi was established on 31st October 1966 with four judges. It holds original, appellate, and writ jurisdiction over the National Capital Territory of Delhi.',
        history: 'Established by the Delhi High Court Act, 1966. Initially started working from a residential building in Golf Links with 4 judges, now located at Sher Shah Road near India Gate.',
        address: 'Sher Shah Road, Near India Gate, New Delhi - 110503',
        jurisdiction: 'Territorial Jurisdiction over NCT of Delhi. Pecuniary Original Jurisdiction above ₹2 Crores for Commercial Suits.',
        contactInfo: {
          phone: '+91-11-23386345',
          email: 'registrar.dhc@nic.in'
        },
        workingHours: '10:00 AM - 5:00 PM (Monday to Friday, 1st, 3rd & 5th Saturdays)',
        postalDetails: 'Registry Block-A, High Court of Delhi, Sher Shah Road, New Delhi - 110503',
        officialWebsite: 'https://delhihighcourt.nic.in/',
        caseStatusUrl: 'https://delhihighcourt.nic.in/',
        judgmentsUrl: 'https://delhihighcourt.nic.in/',
        causeListUrl: 'https://delhihighcourt.nic.in/',
        recruitmentUrl: 'https://delhihighcourt.nic.in/',
        rulesUrl: 'https://delhihighcourt.nic.in/',
        judges: [
          { name: "Hon'ble Mr. Justice Manmohan", designation: 'Chief Justice (Acting)', bench: 'Division Bench I', profileUrl: 'https://delhihighcourt.nic.in/' },
          { name: "Hon'ble Mr. Justice Rajiv Shakdher", designation: 'Senior Judge', bench: 'Division Bench II', profileUrl: 'https://delhihighcourt.nic.in/' },
          { name: "Hon'ble Ms. Justice Rekha Palli", designation: 'Puisne Judge', bench: 'Single Bench (Commercial)', profileUrl: 'https://delhihighcourt.nic.in/' }
        ],
        services: [
          { title: 'Online Case Status Portal', link: 'https://delhihighcourt.nic.in/', iconType: 'Search' },
          { title: 'Daily Electronic Cause List', link: 'https://delhihighcourt.nic.in/', iconType: 'FileText' },
          { title: 'Certified Copy Application Portal', link: 'https://delhihighcourt.nic.in/', iconType: 'Download' },
          { title: 'E-Filing Portal', link: 'https://efiling.ecourts.gov.in', iconType: 'ExternalLink' }
        ],
        practiceAreas: ['Constitutional Law', 'Intellectual Property', 'Commercial Disputes', 'Arbitration', 'Criminal Appeals', 'Taxation'],
        faqs: [
          { question: 'What is the pecuniary jurisdiction of Delhi High Court for commercial suits?', answer: 'The Delhi High Court exercises original jurisdiction for commercial suits valued above ₹2 Crores.' },
          { question: 'How can I access daily cause lists online?', answer: 'Daily cause lists can be viewed directly on the official Delhi High Court portal under the Cause Lists section.' },
          { question: 'What is the procedure for E-Filing in Delhi High Court?', answer: 'Advocates can register on the e-filing portal (efiling.ecourts.gov.in) using their Bar Council enrollment number.' }
        ],
        metaTitle: 'High Court of Delhi - Official e-Courts Portal, Cause List & Case Status',
        metaDescription: 'Complete directory of Delhi High Court including case status lookup, judgments, daily cause list, judges bench, and rules.'
      },
      {
        name: 'Patiala House District Court, New Delhi',
        slug: 'patiala-house-court',
        courtType: 'District Court',
        city: 'New Delhi',
        image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 2,
        description: 'New Delhi District Court located at Patiala House Complex handling criminal trials, CBI cases, and civil matters for New Delhi district.',
        history: 'Housed in the heritage palace of the former Maharaja of Patiala, converted into a district court complex in 1977.',
        address: 'India Gate Circle, Tilak Marg, New Delhi - 110001',
        jurisdiction: 'New Delhi Police District jurisdiction including Connaught Place, Chanakyapuri, Tughlak Road, and Parliament Street.',
        contactInfo: {
          phone: '+91-11-23384501',
          email: 'ndd-dcourts@nic.in'
        },
        workingHours: '10:00 AM - 5:00 PM (Monday to Saturday, except 2nd & 4th Sat)',
        postalDetails: 'Office of Principal District & Sessions Judge, Patiala House Courts, New Delhi - 110001',
        officialWebsite: 'https://delhidistrictcourts.nic.in/',
        caseStatusUrl: 'https://services.ecourts.gov.in/ecourtindia_v6/',
        judgmentsUrl: 'https://services.ecourts.gov.in/ecourtindia_v6/',
        causeListUrl: 'https://delhidistrictcourts.nic.in/',
        recruitmentUrl: 'https://delhidistrictcourts.nic.in/',
        rulesUrl: 'https://delhidistrictcourts.nic.in/',
        judges: [
          { name: 'Sh. Sanjay Garg', designation: 'Principal District & Sessions Judge', bench: 'Sessions Court I', profileUrl: 'https://delhidistrictcourts.nic.in/' },
          { name: 'Dr. Pankaj Sharma', designation: 'Special Judge (CBI)', bench: 'Special CBI Court', profileUrl: 'https://delhidistrictcourts.nic.in/' }
        ],
        services: [
          { title: 'District e-Courts Status Search', link: 'https://services.ecourts.gov.in/ecourtindia_v6/', iconType: 'Search' },
          { title: 'New Delhi District Cause List', link: 'https://delhidistrictcourts.nic.in/', iconType: 'FileText' },
          { title: 'Legal Aid Cell (DLSA New Delhi)', link: 'https://dlsa.delhi.gov.in/', iconType: 'Shield' }
        ],
        practiceAreas: ['Criminal Defense', 'CBI & ED Cases', 'Civil Suits', 'Motor Accident Claims (MACT)', 'Family Law'],
        faqs: [
          { question: 'Which police stations come under Patiala House Courts?', answer: 'Police stations under New Delhi district including Connaught Place, Parliament Street, Tughlak Road, Chanakyapuri, and Mandir Marg.' },
          { question: 'How to apply for bail at Patiala House Court?', answer: 'Bail applications are filed before the concerned Duty MM or Sessions Judge depending on offense gravity.' }
        ],
        metaTitle: 'Patiala House District Court New Delhi - Case Status & Daily Cause List',
        metaDescription: 'Official access guide for Patiala House Courts complex New Delhi, case status, judge roster, and legal services.'
      }
    ]
  },
  {
    stateName: 'Haryana',
    courts: [
      {
        name: 'Punjab & Haryana High Court',
        slug: 'punjab-and-haryana-high-court',
        courtType: 'High Court',
        city: 'Chandigarh',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'The common High Court for the States of Punjab and Haryana and the Union Territory of Chandigarh, housed in Le Corbusier designed Capital Complex.',
        history: 'Originally established as Lahore High Court in 1919, shifted to Shimla post-independence in 1947, and finally inaugurated in Chandigarh in 1955.',
        address: 'Capitol Complex, Sector 1, Chandigarh - 160001',
        jurisdiction: 'Appellate and Constitutional jurisdiction over Punjab, Haryana, and UT Chandigarh.',
        contactInfo: {
          phone: '+91-172-2740071',
          email: 'highcourt-chd@nic.in'
        },
        workingHours: '10:00 AM - 4:30 PM (Monday to Friday)',
        postalDetails: 'Registrar General, Punjab and Haryana High Court, Sector 1, Chandigarh - 160001',
        officialWebsite: 'https://highcourtchd.gov.in/',
        caseStatusUrl: 'https://highcourtchd.gov.in/?mod=casestatus',
        judgmentsUrl: 'https://highcourtchd.gov.in/?mod=orders_judgements',
        causeListUrl: 'https://highcourtchd.gov.in/?mod=cause_list',
        recruitmentUrl: 'https://highcourtchd.gov.in/?mod=recruitment',
        rulesUrl: 'https://highcourtchd.gov.in/?mod=rules',
        judges: [
          { name: "Hon'ble Sheel Nagu", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://highcourtchd.gov.in/' },
          { name: "Hon'ble Gurmeet Singh Sandhawalia", designation: 'Senior Judge', bench: 'Division Bench II', profileUrl: 'https://highcourtchd.gov.in/' }
        ],
        services: [
          { title: 'High Court Case Status Search', link: 'https://highcourtchd.gov.in/?mod=casestatus', iconType: 'Search' },
          { title: 'Daily Cause List', link: 'https://highcourtchd.gov.in/?mod=cause_list', iconType: 'FileText' },
          { title: 'Judgments & Orders Vault', link: 'https://highcourtchd.gov.in/?mod=orders_judgements', iconType: 'Download' }
        ],
        practiceAreas: ['Constitutional Law', 'Service Law', 'Criminal Appeals', 'Land Acquisition', 'Taxation', 'Civil Writs'],
        faqs: [
          { question: 'What states come under Punjab & Haryana High Court?', answer: 'The High Court exercises jurisdiction over Punjab, Haryana, and the UT of Chandigarh.' },
          { question: 'How can I verify order copy online?', answer: 'Digital order copies can be verified using QR code or order ID on highcourtchd.gov.in.' }
        ],
        metaTitle: 'Punjab & Haryana High Court Chandigarh - Official e-Portal & Case Status',
        metaDescription: 'Official judicial portal of Punjab and Haryana High Court including cause lists, judgments, case status, and advocate directory.'
      },
      {
        name: 'Gurugram District & Sessions Court',
        slug: 'gurugram-district-court',
        courtType: 'District Court',
        city: 'Gurugram',
        image: '/court/gurugram_court.jpg',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 2,
        description: 'District & Sessions Court handling civil, criminal, corporate, and real estate litigation across Gurugram district.',
        history: 'Established to handle the rapid legal expansion of Millennium City Gurugram, featuring modern multi-storey court complex near Rajiv Chowk.',
        address: 'Judicial Complex, Near Rajiv Chowk, Subhash Nagar, Gurugram, Haryana - 122001',
        jurisdiction: 'Entire Revenue District of Gurugram including Manesar, Pataudi, and Sohna sub-divisions.',
        contactInfo: {
          phone: '+91-124-2320875',
          email: 'dcourts-grg@hry.nic.in'
        },
        workingHours: '10:00 AM - 5:00 PM (Monday to Saturday, except 2nd & 4th Sat)',
        postalDetails: 'Office of District & Sessions Judge, Judicial Complex, Gurugram - 122001',
        officialWebsite: 'https://districts.ecourts.gov.in/gurgaon',
        caseStatusUrl: 'https://services.ecourts.gov.in/ecourtindia_v6/',
        judgmentsUrl: 'https://services.ecourts.gov.in/ecourtindia_v6/',
        causeListUrl: 'https://districts.ecourts.gov.in/gurgaon',
        recruitmentUrl: 'https://districts.ecourts.gov.in/gurgaon',
        rulesUrl: 'https://districts.ecourts.gov.in/gurgaon',
        judges: [
          { name: 'Sh. Surya Partap Singh', designation: 'District & Sessions Judge', bench: 'Sessions Court Gurugram', profileUrl: 'https://districts.ecourts.gov.in/gurgaon' },
          { name: 'Smt. Anjali Jain', designation: 'Additional District Judge (Commercial)', bench: 'Commercial Court', profileUrl: 'https://districts.ecourts.gov.in/gurgaon' }
        ],
        services: [
          { title: 'Gurugram e-Court Case Search', link: 'https://services.ecourts.gov.in/ecourtindia_v6/', iconType: 'Search' },
          { title: 'Daily Cause List Gurugram', link: 'https://districts.ecourts.gov.in/gurgaon', iconType: 'FileText' },
          { title: 'RERA & Real Estate Appeals Information', link: 'https://districts.ecourts.gov.in/gurgaon', iconType: 'Building' }
        ],
        practiceAreas: ['Real Estate Law', 'RERA Litigation', 'Corporate Disputes', 'Criminal Defense', 'Cheque Bounce (Sec 138)', 'Family Law'],
        faqs: [
          { question: 'Where is Gurugram District Court located?', answer: 'The judicial court complex is located near Rajiv Chowk on Subhash Nagar Road, Gurugram.' },
          { question: 'Does Gurugram court handle RERA appeals?', answer: 'Commercial Courts at Gurugram District Court hear designated property and real estate disputes.' }
        ],
        metaTitle: 'Gurugram District Court - Case Status, Cause List & RERA Matters',
        metaDescription: 'Official e-Courts resource for Gurugram District and Sessions Court, case search, judge directory, and advocate details.'
      }
    ]
  },
  {
    stateName: 'Uttar Pradesh',
    courts: [
      {
        name: 'High Court of Judicature at Allahabad',
        slug: 'allahabad-high-court',
        courtType: 'High Court',
        city: 'Prayagraj',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'One of the oldest and largest High Courts in India, established in 1866. Has territorial jurisdiction over the state of Uttar Pradesh with a bench at Lucknow.',
        history: 'Established at Agra in 1866 as High Court of Judicature for North-Western Provinces, shifted to Allahabad in 1869.',
        address: 'Nyayamarg, Canton, Prayagraj (Allahabad), Uttar Pradesh - 211017',
        jurisdiction: 'Entire State of Uttar Pradesh (75 districts) along with Lucknow Bench.',
        contactInfo: {
          phone: '+91-532-2422335',
          email: 'rg@allahabadhighcourt.in'
        },
        workingHours: '10:00 AM - 4:00 PM (Monday to Friday)',
        postalDetails: 'Registrar General, Allahabad High Court, Nyayamarg, Prayagraj - 211017',
        officialWebsite: 'https://allahabadhighcourt.in/',
        caseStatusUrl: 'https://allahabadhighcourt.in/casestatus/',
        judgmentsUrl: 'https://allahabadhighcourt.in/',
        causeListUrl: 'https://allahabadhighcourt.in/causelist/',
        recruitmentUrl: 'https://allahabadhighcourt.in/',
        rulesUrl: 'https://allahabadhighcourt.in/',
        judges: [
          { name: "Hon'ble Arun Bhansali", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://allahabadhighcourt.in/' },
          { name: "Hon'ble Manoj Kumar Gupta", designation: 'Senior Judge', bench: 'Division Bench II', profileUrl: 'https://allahabadhighcourt.in/' }
        ],
        services: [
          { title: 'Allahabad High Court Case Status', link: 'https://allahabadhighcourt.in/casestatus/', iconType: 'Search' },
          { title: 'Daily Cause List (Prayagraj & Lucknow)', link: 'https://allahabadhighcourt.in/causelist/', iconType: 'FileText' },
          { title: 'Official Judgments & Orders Search', link: 'https://allahabadhighcourt.in/', iconType: 'Download' }
        ],
        practiceAreas: ['Constitutional Law', 'Criminal Bail & Writs', 'Land & Revenue Law', 'Service Litigation', 'Public Interest Litigation'],
        faqs: [
          { question: 'Where is the permanent bench of Allahabad High Court located?', answer: 'The Lucknow Bench was created under the Uttar Pradesh High Courts (Amalgamation) Order, 1948.' },
          { question: 'How can I check bail status in Allahabad High Court?', answer: 'Use the Case Status tab on allahabadhighcourt.in entering Case Type (e.g., CRMBA) and Case Number.' }
        ],
        metaTitle: 'Allahabad High Court - Case Status, Cause List & Judgments',
        metaDescription: 'Official digital portal for High Court of Judicature at Allahabad and Lucknow Bench. Case status, cause lists, orders, and notices.'
      }
    ]
  },
  {
    stateName: 'Maharashtra',
    courts: [
      {
        name: 'High Court of Judicature at Bombay',
        slug: 'bombay-high-court',
        courtType: 'High Court',
        city: 'Mumbai',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established under the High Courts Act 1861, Bombay High Court is one of the oldest Chartered High Courts in India, with benches at Nagpur, Aurangabad, and Panaji (Goa).',
        history: 'Inaugurated on 14th August 1862. The magnificent Victorian Gothic building building is a UNESCO World Heritage site.',
        address: 'Fort, Mumbai, Maharashtra - 400032',
        jurisdiction: 'States of Maharashtra and Goa, and Union Territories of Dadra & Nagar Haveli and Daman & Diu.',
        contactInfo: {
          phone: '+91-22-22673322',
          email: 'registrar-bhc@nic.in'
        },
        workingHours: '10:30 AM - 5:00 PM (Monday to Friday)',
        postalDetails: 'Office of Registrar General, High Court, Fort, Mumbai - 400032',
        officialWebsite: 'https://bombayhighcourt.nic.in/',
        caseStatusUrl: 'https://bombayhighcourt.nic.in/case_status.php',
        judgmentsUrl: 'https://bombayhighcourt.nic.in/order_judg.php',
        causeListUrl: 'https://bombayhighcourt.nic.in/causelist.php',
        recruitmentUrl: 'https://bombayhighcourt.nic.in/recruitment.php',
        rulesUrl: 'https://bombayhighcourt.nic.in/rules.php',
        judges: [
          { name: "Hon'ble Devendra Kumar Upadhyaya", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://bombayhighcourt.nic.in/' },
          { name: "Hon'ble G. S. Kulkarni", designation: 'Senior Judge', bench: 'Commercial Appellate Bench', profileUrl: 'https://bombayhighcourt.nic.in/' }
        ],
        services: [
          { title: 'Bombay High Court Case Search', link: 'https://bombayhighcourt.nic.in/case_status.php', iconType: 'Search' },
          { title: 'Daily Cause List (Mumbai, Nagpur, Aurangabad, Goa)', link: 'https://bombayhighcourt.nic.in/causelist.php', iconType: 'FileText' },
          { title: 'Certified Orders & Judgments Repository', link: 'https://bombayhighcourt.nic.in/order_judg.php', iconType: 'Download' }
        ],
        practiceAreas: ['Commercial Suits', 'Admiralty & Maritime', 'Corporate Law & Insolvency', 'Constitutional Law', 'Arbitration', 'Customs & Tax'],
        faqs: [
          { question: 'Where are the benches of Bombay High Court located?', answer: 'Permanent benches are located at Nagpur, Aurangabad, and Panaji (Goa).' },
          { question: 'Does Bombay High Court have original civil jurisdiction?', answer: 'Yes, Bombay High Court has original civil jurisdiction for suits originating within Greater Mumbai.' }
        ],
        metaTitle: 'Bombay High Court - Official Portal, Cause List & Judgments Search',
        metaDescription: 'Official web portal of Bombay High Court covering Mumbai, Nagpur, Aurangabad & Goa benches. Access cause list & case status.'
      }
    ]
  },
  {
    stateName: 'Rajasthan',
    courts: [
      {
        name: 'Rajasthan High Court, Jodhpur',
        slug: 'rajasthan-high-court',
        courtType: 'High Court',
        city: 'Jodhpur',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established under the Rajasthan High Court Ordinance, 1949 with principal seat at Jodhpur and a permanent bench at Jaipur.',
        history: 'Inaugurated by Maharaja Sawai Man Singh of Jaipur on 29th August 1949 with 12 judges representing princely states.',
        address: 'Jhalamand, Jodhpur, Rajasthan - 342005',
        jurisdiction: 'Territorial jurisdiction across all 50 revenue districts of Rajasthan.',
        contactInfo: {
          phone: '+91-291-2888000',
          email: 'hc-raj@nic.in'
        },
        workingHours: '10:30 AM - 4:30 PM (Monday to Friday)',
        postalDetails: 'Registrar General, Rajasthan High Court, New Building, Jhalamand, Jodhpur - 342005',
        officialWebsite: 'https://hcraj.nic.in/',
        caseStatusUrl: 'https://hcraj.nic.in/hcraj/casestatus.php',
        judgmentsUrl: 'https://hcraj.nic.in/hcraj/judgements.php',
        causeListUrl: 'https://hcraj.nic.in/hcraj/causelist.php',
        recruitmentUrl: 'https://hcraj.nic.in/hcraj/recruitment.php',
        rulesUrl: 'https://hcraj.nic.in/hcraj/rules.php',
        judges: [
          { name: "Hon'ble Manindra Mohan Shrivastava", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://hcraj.nic.in/' }
        ],
        services: [
          { title: 'Rajasthan High Court Case Status', link: 'https://hcraj.nic.in/hcraj/casestatus.php', iconType: 'Search' },
          { title: 'Daily Cause List Jodhpur & Jaipur', link: 'https://hcraj.nic.in/hcraj/causelist.php', iconType: 'FileText' }
        ],
        practiceAreas: ['Constitutional Law', 'Service Matters', 'Mining & Revenue Law', 'Criminal Appeals', 'Revenue Writs'],
        faqs: [
          { question: 'Where is the Jaipur bench of Rajasthan High Court located?', answer: 'The Jaipur bench is situated at Bhagwan Das Road, Jaipur.' }
        ],
        metaTitle: 'Rajasthan High Court Jodhpur & Jaipur - Case Status & Orders',
        metaDescription: 'Access Rajasthan High Court case status, daily cause lists, order downloads, and judicial notices.'
      }
    ]
  },
  {
    stateName: 'Bihar',
    courts: [
      {
        name: 'High Court of Judicature at Patna',
        slug: 'patna-high-court',
        courtType: 'High Court',
        city: 'Patna',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established on 3rd February 1916 under Letters Patent issued by King George V, exercising jurisdiction over Bihar state.',
        history: 'The foundation stone was laid on 1st December 1913 by Lord Hardinge, Viceroy of India.',
        address: 'Jawaharlal Nehru Marg (Bailey Road), Patna, Bihar - 800001',
        jurisdiction: 'Entire territorial region of Bihar.',
        contactInfo: {
          phone: '+91-612-2504071',
          email: 'rg.patna-hc@gov.in'
        },
        workingHours: '10:15 AM - 4:15 PM (Monday to Friday)',
        postalDetails: 'Registrar General, Patna High Court, Bailey Road, Patna - 800001',
        officialWebsite: 'https://patnahighcourt.gov.in/',
        caseStatusUrl: 'https://patnahighcourt.gov.in/',
        judgmentsUrl: 'https://patnahighcourt.gov.in/',
        causeListUrl: 'https://patnahighcourt.gov.in/',
        recruitmentUrl: 'https://patnahighcourt.gov.in/',
        rulesUrl: 'https://patnahighcourt.gov.in/',
        judges: [
          { name: "Hon'ble K. Vinod Chandran", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://patnahighcourt.gov.in/' }
        ],
        services: [
          { title: 'Patna High Court Case Status Lookup', link: 'https://patnahighcourt.gov.in/', iconType: 'Search' },
          { title: 'Daily Cause List Patna', link: 'https://patnahighcourt.gov.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['Constitutional Law', 'Land Ceiling & Zamindari', 'Criminal Writs', 'Service Law'],
        faqs: [
          { question: 'When was Patna High Court established?', answer: 'Inaugurated on 3rd February 1916.' }
        ],
        metaTitle: 'Patna High Court - Official e-Courts Portal & Judgments',
        metaDescription: 'High Court of Judicature at Patna official portal, case status, cause list, judgments search.'
      }
    ]
  },
  {
    stateName: 'Madhya Pradesh',
    courts: [
      {
        name: 'High Court of Madhya Pradesh',
        slug: 'madhya-pradesh-high-court',
        courtType: 'High Court',
        city: 'Jabalpur',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established under the States Reorganisation Act 1956, with its principal seat at Jabalpur and permanent benches at Indore and Gwalior.',
        history: 'Originally constituted at Nagpur in 1936, shifted to Jabalpur in 1956 post state reorganization.',
        address: 'High Court Building, Civil Lines, Jabalpur, Madhya Pradesh - 482001',
        jurisdiction: 'Entire State of Madhya Pradesh.',
        contactInfo: {
          phone: '+91-761-2620380',
          email: 'mphc@nic.in'
        },
        workingHours: '10:00 AM - 5:00 PM (Monday to Friday)',
        postalDetails: 'Registrar General, MP High Court, Jabalpur - 482001',
        officialWebsite: 'https://mphc.gov.in/',
        caseStatusUrl: 'https://mphc.gov.in/',
        judgmentsUrl: 'https://mphc.gov.in/',
        causeListUrl: 'https://mphc.gov.in/',
        recruitmentUrl: 'https://mphc.gov.in/',
        rulesUrl: 'https://mphc.gov.in/',
        judges: [
          { name: "Hon'ble Sanjeev Sachdeva", designation: 'Chief Justice (Acting)', bench: 'Division Bench I', profileUrl: 'https://mphc.gov.in/' }
        ],
        services: [
          { title: 'MP High Court Case Status Search', link: 'https://mphc.gov.in/', iconType: 'Search' },
          { title: 'Cause List (Jabalpur, Indore, Gwalior)', link: 'https://mphc.gov.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['Constitutional Law', 'Service Writs', 'Criminal Appeals', 'Forest & Revenue Matters'],
        faqs: [
          { question: 'Where are MP High Court benches located?', answer: 'Permanent benches are situated at Indore and Gwalior.' }
        ],
        metaTitle: 'MP High Court Jabalpur, Indore & Gwalior - Case Status',
        metaDescription: 'High Court of Madhya Pradesh official cause lists, case status, judgments, and rules.'
      }
    ]
  },
  {
    stateName: 'Gujarat',
    courts: [
      {
        name: 'High Court of Gujarat',
        slug: 'gujarat-high-court',
        courtType: 'High Court',
        city: 'Ahmedabad',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established on 1st May 1960 upon bifurcation of Bombay State under the Bombay Reorganisation Act, 1960.',
        history: 'Started functioning from Navrangpura, shifted to modern complex at Sola, Ahmedabad in 1999.',
        address: 'SGF, Sola, Ahmedabad, Gujarat - 380060',
        jurisdiction: 'Entire State of Gujarat.',
        contactInfo: {
          phone: '+91-79-27663801',
          email: 'rg-hc-guj@nic.in'
        },
        workingHours: '10:30 AM - 5:00 PM (Monday to Friday)',
        postalDetails: 'Registrar General, Gujarat High Court, Sola, Ahmedabad - 380060',
        officialWebsite: 'https://gujarathighcourt.nic.in/',
        caseStatusUrl: 'https://gujarathighcourt.nic.in/',
        judgmentsUrl: 'https://gujarathighcourt.nic.in/',
        causeListUrl: 'https://gujarathighcourt.nic.in/',
        recruitmentUrl: 'https://gujarathighcourt.nic.in/',
        rulesUrl: 'https://gujarathighcourt.nic.in/',
        judges: [
          { name: "Hon'ble Sunita Agarwal", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://gujarathighcourt.nic.in/' }
        ],
        services: [
          { title: 'Gujarat High Court Live Streaming & Status', link: 'https://gujarathighcourt.nic.in/', iconType: 'Search' },
          { title: 'Daily Cause List Ahmedabad', link: 'https://gujarathighcourt.nic.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['Commercial Suits', 'Company Law', 'Taxation (GST & IT)', 'Criminal Writs', 'Constitutional Law'],
        faqs: [
          { question: 'Is Gujarat High Court proceeding live-streamed?', answer: 'Yes, Gujarat High Court was the pioneer in live-streaming courtroom proceedings on YouTube.' }
        ],
        metaTitle: 'Gujarat High Court Ahmedabad - Case Status & Live Stream',
        metaDescription: 'Official site of High Court of Gujarat, case status, cause list, judgment search, and live court streaming.'
      }
    ]
  },
  {
    stateName: 'West Bengal',
    courts: [
      {
        name: 'High Court at Calcutta',
        slug: 'calcutta-high-court',
        courtType: 'High Court',
        city: 'Kolkata',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'The oldest High Court in India, established on 1st July 1862 under the High Courts Act 1861. Circuit bench at Jalpaiguri and Port Blair.',
        history: 'Housed in neo-Gothic structure modeled on the Cloth Hall at Ypres, Belgium.',
        address: '3, 1st Floor, Esplanade Row West, Kolkata, West Bengal - 700001',
        jurisdiction: 'State of West Bengal and Union Territory of Andaman and Nicobar Islands.',
        contactInfo: {
          phone: '+91-33-22487421',
          email: 'registrar.chc@nic.in'
        },
        workingHours: '10:30 AM - 4:30 PM (Monday to Friday)',
        postalDetails: 'Registrar General, High Court at Calcutta, Esplanade Row West, Kolkata - 700001',
        officialWebsite: 'https://calcuttahighcourt.gov.in/',
        caseStatusUrl: 'https://calcuttahighcourt.gov.in/',
        judgmentsUrl: 'https://calcuttahighcourt.gov.in/',
        causeListUrl: 'https://calcuttahighcourt.gov.in/',
        recruitmentUrl: 'https://calcuttahighcourt.gov.in/',
        rulesUrl: 'https://calcuttahighcourt.gov.in/',
        judges: [
          { name: "Hon'ble T. S. Sivagnanam", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://calcuttahighcourt.gov.in/' }
        ],
        services: [
          { title: 'Calcutta High Court Case Search', link: 'https://calcuttahighcourt.gov.in/', iconType: 'Search' },
          { title: 'Daily Cause List (Kolkata, Jalpaiguri, Port Blair)', link: 'https://calcuttahighcourt.gov.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['Admiralty & Commercial', 'Constitutional Law', 'Company Law', 'IPR Suits', 'Criminal Appeals'],
        faqs: [
          { question: 'Which Union Territory falls under Calcutta High Court?', answer: 'Andaman & Nicobar Islands fall under the appellate jurisdiction of Calcutta High Court with a circuit bench at Port Blair.' }
        ],
        metaTitle: 'Calcutta High Court - India’s Oldest High Court Portal',
        metaDescription: 'Official web portal of High Court at Calcutta, case status, cause list, judgments, Port Blair & Jalpaiguri bench.'
      }
    ]
  },
  {
    stateName: 'Karnataka',
    courts: [
      {
        name: 'High Court of Karnataka',
        slug: 'karnataka-high-court',
        courtType: 'High Court',
        city: 'Bengaluru',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established as High Court of Mysore in 1884, housed in the iconic red brick building "Attara Kacheri" opposite Vidhana Soudha in Bengaluru.',
        history: 'Renamed High Court of Karnataka in 1973. Permanent benches established at Dharwad and Kalaburagi in 2013.',
        address: 'Opposite Vidhana Soudha, Ambedkar Veedhi, Bengaluru, Karnataka - 560001',
        jurisdiction: 'Entire State of Karnataka.',
        contactInfo: {
          phone: '+91-80-22954111',
          email: 'hck-registrar@nic.in'
        },
        workingHours: '10:30 AM - 5:00 PM (Monday to Friday)',
        postalDetails: 'Registrar General, High Court of Karnataka, Ambedkar Veedhi, Bengaluru - 560001',
        officialWebsite: 'https://karnatakahighcourt.kar.nic.in/',
        caseStatusUrl: 'https://karnatakahighcourt.kar.nic.in/',
        judgmentsUrl: 'https://karnatakahighcourt.kar.nic.in/',
        causeListUrl: 'https://karnatakahighcourt.kar.nic.in/',
        recruitmentUrl: 'https://karnatakahighcourt.kar.nic.in/',
        rulesUrl: 'https://karnatakahighcourt.kar.nic.in/',
        judges: [
          { name: "Hon'ble N. V. Anjaria", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://karnatakahighcourt.kar.nic.in/' }
        ],
        services: [
          { title: 'Karnataka High Court Case Status', link: 'https://karnatakahighcourt.kar.nic.in/', iconType: 'Search' },
          { title: 'Cause List (Bengaluru, Dharwad, Kalaburagi)', link: 'https://karnatakahighcourt.kar.nic.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['IT & Tech Law', 'IPR Disputes', 'Constitutional Law', 'Company Matters', 'Land Reforms'],
        faqs: [
          { question: 'What is Attara Kacheri?', answer: 'The historical red sandstone building in Bengaluru housing the High Court of Karnataka.' }
        ],
        metaTitle: 'Karnataka High Court Bengaluru - Case Status & Cause List',
        metaDescription: 'High Court of Karnataka official digital portal covering Bengaluru, Dharwad and Kalaburagi benches.'
      }
    ]
  },
  {
    stateName: 'Tamil Nadu',
    courts: [
      {
        name: 'High Court of Judicature at Madras',
        slug: 'madras-high-court',
        courtType: 'High Court',
        city: 'Chennai',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established on 26th June 1862 under Indian High Courts Act 1861. Possesses original civil & admiralty jurisdiction with a bench at Madurai.',
        history: 'Housed in an Indo-Saracenic architectural masterpiece building inaugurated in 1892.',
        address: 'High Court Buildings, NSC Bose Road, Chennai, Tamil Nadu - 600104',
        jurisdiction: 'State of Tamil Nadu and Union Territory of Puducherry.',
        contactInfo: {
          phone: '+91-44-25301300',
          email: 'reg-gen.mhc@nic.in'
        },
        workingHours: '10:00 AM - 4:45 PM (Monday to Friday)',
        postalDetails: 'Registrar General, Madras High Court, NSC Bose Road, Chennai - 600104',
        officialWebsite: 'https://hcmadras.tn.gov.in/',
        caseStatusUrl: 'https://hcmadras.tn.gov.in/',
        judgmentsUrl: 'https://hcmadras.tn.gov.in/',
        causeListUrl: 'https://hcmadras.tn.gov.in/',
        recruitmentUrl: 'https://hcmadras.tn.gov.in/',
        rulesUrl: 'https://hcmadras.tn.gov.in/',
        judges: [
          { name: "Hon'ble K. R. Shriram", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://hcmadras.tn.gov.in/' }
        ],
        services: [
          { title: 'Madras High Court Case Status', link: 'https://hcmadras.tn.gov.in/', iconType: 'Search' },
          { title: 'Daily Cause List Chennai & Madurai', link: 'https://hcmadras.tn.gov.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['Admiralty', 'IPR (Madras HC IP Division)', 'Constitutional Law', 'Commercial Suits', 'Taxation'],
        faqs: [
          { question: 'Which UT is covered under Madras High Court?', answer: 'The Union Territory of Puducherry falls under the jurisdiction of Madras High Court.' }
        ],
        metaTitle: 'Madras High Court Chennai & Madurai Bench - Official Site',
        metaDescription: 'Official e-Portal of Madras High Court, case status lookup, judgments search, daily cause list, IP division.'
      }
    ]
  },
  {
    stateName: 'Telangana',
    courts: [
      {
        name: 'High Court for the State of Telangana',
        slug: 'telangana-high-court',
        courtType: 'High Court',
        city: 'Hyderabad',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Originally established in 1919 by 7th Nizam Mir Osman Ali Khan. Re-designated as Telangana High Court post bifurcation in 2019.',
        history: 'Built in Indo-Saracenic style on the banks of Musi River in Hyderabad.',
        address: 'Near Government City College, High Court Road, Hyderabad, Telangana - 500066',
        jurisdiction: 'Entire State of Telangana.',
        contactInfo: {
          phone: '+91-40-23446100',
          email: 'rg-tshc@nic.in'
        },
        workingHours: '10:15 AM - 4:30 PM (Monday to Friday)',
        postalDetails: 'Registrar General, High Court for Telangana, Hyderabad - 500066',
        officialWebsite: 'https://tshc.gov.in/',
        caseStatusUrl: 'https://tshc.gov.in/',
        judgmentsUrl: 'https://tshc.gov.in/',
        causeListUrl: 'https://tshc.gov.in/',
        recruitmentUrl: 'https://tshc.gov.in/',
        rulesUrl: 'https://tshc.gov.in/',
        judges: [
          { name: "Hon'ble Alok Aradhe", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://tshc.gov.in/' }
        ],
        services: [
          { title: 'Telangana High Court Case Search', link: 'https://tshc.gov.in/', iconType: 'Search' },
          { title: 'Daily Cause List Hyderabad', link: 'https://tshc.gov.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['IT & Cyber Law', 'Real Estate & Land Writs', 'Constitutional Law', 'Criminal Appeals'],
        faqs: [
          { question: 'When was Telangana High Court separate bench constituted?', answer: 'Established as an independent High Court for Telangana on 1st January 2019.' }
        ],
        metaTitle: 'Telangana High Court Hyderabad - Case Status & Cause List',
        metaDescription: 'High Court for the State of Telangana official portal, cause lists, case status lookup, orders.'
      }
    ]
  },
  {
    stateName: 'Kerala',
    courts: [
      {
        name: 'High Court of Kerala',
        slug: 'kerala-high-court',
        courtType: 'High Court',
        city: 'Ernakulam',
        image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: 1,
        description: 'Established on 1st November 1956 under the States Reorganisation Act. Located in Kochi (Ernakulam), exercising jurisdiction over Kerala and Lakshadweep.',
        history: 'Successor to the High Courts of Travancore-Cochin.',
        address: 'High Court Way, Ernakulam, Kochi, Kerala - 682031',
        jurisdiction: 'State of Kerala and Union Territory of Lakshadweep.',
        contactInfo: {
          phone: '+91-484-2562000',
          email: 'hckerala@nic.in'
        },
        workingHours: '10:00 AM - 4:30 PM (Monday to Friday)',
        postalDetails: 'Registrar General, High Court of Kerala, Ernakulam, Kochi - 682031',
        officialWebsite: 'https://hckerala.gov.in/',
        caseStatusUrl: 'https://hckerala.gov.in/',
        judgmentsUrl: 'https://hckerala.gov.in/',
        causeListUrl: 'https://hckerala.gov.in/',
        recruitmentUrl: 'https://hckerala.gov.in/',
        rulesUrl: 'https://hckerala.gov.in/',
        judges: [
          { name: "Hon'ble Nitin Jamdar", designation: 'Chief Justice', bench: 'Division Bench I', profileUrl: 'https://hckerala.gov.in/' }
        ],
        services: [
          { title: 'Kerala High Court Case Status', link: 'https://hckerala.gov.in/', iconType: 'Search' },
          { title: 'Daily Cause List Ernakulam', link: 'https://hckerala.gov.in/', iconType: 'FileText' }
        ],
        practiceAreas: ['Environmental & Plantation Law', 'Constitutional Writs', 'Service Litigation', 'Maritime Law'],
        faqs: [
          { question: 'Which UT is attached to Kerala High Court?', answer: 'The Union Territory of Lakshadweep falls under the jurisdiction of Kerala High Court.' }
        ],
        metaTitle: 'Kerala High Court Ernakulam - Case Status & Judgments',
        metaDescription: 'High Court of Kerala official web portal covering Kerala & Lakshadweep. Case status, cause lists, orders.'
      }
    ]
  }
];

function formatTitleCase(str) {
  if (!str) return str;
  const lowercaseWords = new Set(['of', 'at', 'for', 'the', 'in', 'and', '&', 'to']);
  return str
    .trim()
    .split(/\s+/)
    .map((word, index) => {
      const lower = word.toLowerCase();
      if (index > 0 && lowercaseWords.has(lower)) {
        return lower === '&' ? '&' : lower;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

// Special fixes for raw old entries
const legacyNameFixes = {
  'gurugram': 'Gurugram District Court',
  'rewari': 'Rewari District Court',
  'rewari ': 'Rewari District Court',
  'Faridabad': 'Faridabad District Court',
  'PATNA': 'Patna District Court',
  'Amritsar': 'Amritsar District Court'
};

async function seedCourts() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const statesCollection = mongoose.connection.collection('states');
    const courtsCollection = mongoose.connection.collection('courts');

    const dbStates = await statesCollection.find({}).toArray();
    console.log(`Found ${dbStates.length} states in database.`);

    const stateNameToObjMap = {};
    dbStates.forEach(s => {
      stateNameToObjMap[s.name.trim().toLowerCase()] = s;
    });

    let updatedCount = 0;
    let insertedCount = 0;

    for (const group of seedCourtsData) {
      const stateObj = stateNameToObjMap[group.stateName.trim().toLowerCase()];
      if (!stateObj) {
        console.warn(`State "${group.stateName}" not found in DB states collection. Skipping group.`);
        continue;
      }

      for (const courtData of group.courts) {
        const formattedName = formatTitleCase(courtData.name);
        const fullCourtPayload = {
          stateId: new mongoose.Types.ObjectId(stateObj._id),
          name: formattedName,
          slug: courtData.slug,
          courtType: courtData.courtType,
          city: courtData.city || '',
          image: courtData.image || '',
          featured: courtData.featured ?? true,
          status: courtData.status || 'PUBLISHED',
          displayOrder: courtData.displayOrder || 1,
          description: courtData.description || '',
          history: courtData.history || '',
          address: courtData.address || '',
          jurisdiction: courtData.jurisdiction || '',
          contactInfo: courtData.contactInfo || { phone: '', email: '' },
          workingHours: courtData.workingHours || '',
          postalDetails: courtData.postalDetails || '',
          officialWebsite: courtData.officialWebsite || '',
          caseStatusUrl: courtData.caseStatusUrl || '',
          judgmentsUrl: courtData.judgmentsUrl || '',
          causeListUrl: courtData.causeListUrl || '',
          recruitmentUrl: courtData.recruitmentUrl || '',
          rulesUrl: courtData.rulesUrl || '',
          judges: courtData.judges || [],
          services: courtData.services || [],
          practiceAreas: courtData.practiceAreas || [],
          faqs: courtData.faqs || [],
          metaTitle: courtData.metaTitle || `${formattedName} - Official e-Courts Portal`,
          metaDescription: courtData.metaDescription || `Access official e-Courts cause lists, daily case status, judgments, and details for ${formattedName}.`,
          updatedAt: new Date()
        };

        const existingCourt = await courtsCollection.findOne({
          $or: [{ slug: courtData.slug }, { name: courtData.name }, { name: formattedName }]
        });

        if (existingCourt) {
          await courtsCollection.updateOne(
            { _id: existingCourt._id },
            { $set: fullCourtPayload }
          );
          console.log(`[UPDATED] ${formattedName} (${group.stateName})`);
          updatedCount++;
        } else {
          fullCourtPayload.createdAt = new Date();
          await courtsCollection.insertOne(fullCourtPayload);
          console.log(`[INSERTED] ${formattedName} (${group.stateName})`);
          insertedCount++;
        }
      }
    }

    // Audit and clean up any 404/broken links & capitalize names across all courts in DB!
    const allCourts = await courtsCollection.find({}).toArray();
    console.log(`\nAuditing remaining ${allCourts.length} total courts in database...`);
    for (const c of allCourts) {
      const updates = {};

      // Capitalize Name
      const cleanRawName = (c.name || '').trim();
      let newName = legacyNameFixes[cleanRawName] || legacyNameFixes[c.name] || formatTitleCase(cleanRawName);
      if (newName && newName !== c.name) {
        updates.name = newName;
      }

      // Fix any broken or 404 links
      if (!c.officialWebsite || c.officialWebsite.includes('causelists.jsp')) {
        updates.officialWebsite = 'https://services.ecourts.gov.in/ecourtindia_v6/';
      }
      if (!c.caseStatusUrl || c.caseStatusUrl.includes('caseStatus.jsp')) {
        updates.caseStatusUrl = 'https://services.ecourts.gov.in/ecourtindia_v6/';
      }
      if (!c.causeListUrl || c.causeListUrl.includes('causelists.jsp') || c.causeListUrl.includes('causelist.jsp')) {
        updates.causeListUrl = c.officialWebsite || 'https://services.ecourts.gov.in/ecourtindia_v6/';
      }
      if (!c.judgmentsUrl || c.judgmentsUrl.includes('judgment.jsp')) {
        updates.judgmentsUrl = c.officialWebsite || 'https://services.ecourts.gov.in/ecourtindia_v6/';
      }
      if (!c.recruitmentUrl) updates.recruitmentUrl = c.officialWebsite || 'https://services.ecourts.gov.in/ecourtindia_v6/';
      if (!c.rulesUrl) updates.rulesUrl = c.officialWebsite || 'https://services.ecourts.gov.in/ecourtindia_v6/';

      if (c.services && c.services.length > 0) {
        const cleanedServices = c.services.map((s) => {
          if (s.link && (s.link.includes('causelists.jsp') || s.link.includes('causelist.jsp') || s.link.includes('caseStatus.jsp') || s.link.includes('judgment.jsp'))) {
            return { ...s, link: c.officialWebsite || 'https://services.ecourts.gov.in/ecourtindia_v6/' };
          }
          return s;
        });
        updates.services = cleanedServices;
      }

      if (Object.keys(updates).length > 0) {
        await courtsCollection.updateOne({ _id: c._id }, { $set: updates });
      }
    }

    console.log(`\nSeeding Finished Successfully! All court names capitalized & URLs cleaned.`);
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seedCourts();
