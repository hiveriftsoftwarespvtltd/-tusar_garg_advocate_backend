const mongoose = require('mongoose');
require('dotenv').config();

const mongoUri = process.env.MONGO_URI || 'mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/tusar-garg-advocate?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority';

// All 36 States & UTs to seed/upsert
const allStatesList = [
  { name: 'Andaman & Nicobar Islands', slug: 'andaman-and-nicobar-islands', code: 'AN' },
  { name: 'Andhra Pradesh', slug: 'andhra-pradesh', code: 'AP' },
  { name: 'Arunachal Pradesh', slug: 'arunachal-pradesh', code: 'AR' },
  { name: 'Assam', slug: 'assam', code: 'AS' },
  { name: 'Bihar', slug: 'bihar', code: 'BR' },
  { name: 'Chandigarh', slug: 'chandigarh', code: 'CH' },
  { name: 'Chhattisgarh', slug: 'chhattisgarh', code: 'CG' },
  { name: 'Dadra & Nagar Haveli and Daman & Diu', slug: 'dadra-and-nagar-haveli-daman-and-diu', code: 'DN' },
  { name: 'Delhi', slug: 'delhi', code: 'DL' },
  { name: 'Goa', slug: 'goa', code: 'GA' },
  { name: 'Gujarat', slug: 'gujarat', code: 'GJ' },
  { name: 'Haryana', slug: 'haryana', code: 'HR' },
  { name: 'Himachal Pradesh', slug: 'himachal-pradesh', code: 'HP' },
  { name: 'Jammu & Kashmir', slug: 'jammu-and-kashmir', code: 'JK' },
  { name: 'Jharkhand', slug: 'jharkhand', code: 'JH' },
  { name: 'Karnataka', slug: 'karnataka', code: 'KA' },
  { name: 'Kerala', slug: 'kerala', code: 'KL' },
  { name: 'Ladakh', slug: 'ladakh', code: 'LA' },
  { name: 'Lakshadweep', slug: 'lakshadweep', code: 'LD' },
  { name: 'Madhya Pradesh', slug: 'madhya-pradesh', code: 'MP' },
  { name: 'Maharashtra', slug: 'maharashtra', code: 'MH' },
  { name: 'Manipur', slug: 'manipur', code: 'MN' },
  { name: 'Meghalaya', slug: 'meghalaya', code: 'ML' },
  { name: 'Mizoram', slug: 'mizoram', code: 'MZ' },
  { name: 'Nagaland', slug: 'nagaland', code: 'NL' },
  { name: 'Odisha', slug: 'odisha', code: 'OR' },
  { name: 'Puducherry', slug: 'puducherry', code: 'PY' },
  { name: 'Punjab', slug: 'punjab', code: 'PB' },
  { name: 'Rajasthan', slug: 'rajasthan', code: 'RJ' },
  { name: 'Sikkim', slug: 'sikkim', code: 'SK' },
  { name: 'Tamil Nadu', slug: 'tamil-nadu', code: 'TN' },
  { name: 'Telangana', slug: 'telangana', code: 'TS' },
  { name: 'Tripura', slug: 'tripura', code: 'TR' },
  { name: 'Uttar Pradesh', slug: 'uttar-pradesh', code: 'UP' },
  { name: 'Uttarakhand', slug: 'uttarakhand', code: 'UK' },
  { name: 'West Bengal', slug: 'west-bengal', code: 'WB' },
];

function generateSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function seedCourtsDatabase() {
  try {
    console.log('Connecting to MongoDB database...');
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB.');

    const statesCollection = mongoose.connection.collection('states');
    const courtsCollection = mongoose.connection.collection('courts');

    // Step 1: Upsert all 36 States & UTs into MongoDB
    console.log('\n--- Step 1: Seeding / Upserting States & UTs ---');
    const stateMap = {};

    for (let i = 0; i < allStatesList.length; i++) {
      const stateItem = allStatesList[i];
      const existingState = await statesCollection.findOne({
        $or: [{ slug: stateItem.slug }, { name: stateItem.name }]
      });

      let stateId;
      if (existingState) {
        stateId = existingState._id;
        await statesCollection.updateOne(
          { _id: stateId },
          {
            $set: {
              name: stateItem.name,
              code: stateItem.code,
              status: 'PUBLISHED',
              featured: true,
              displayOrder: i + 1,
              updatedAt: new Date()
            }
          }
        );
        console.log(`[STATE UPDATED] ${stateItem.name}`);
      } else {
        const result = await statesCollection.insertOne({
          name: stateItem.name,
          slug: stateItem.slug,
          code: stateItem.code,
          status: 'PUBLISHED',
          featured: true,
          displayOrder: i + 1,
          createdAt: new Date(),
          updatedAt: new Date()
        });
        stateId = result.insertedId;
        console.log(`[STATE INSERTED] ${stateItem.name}`);
      }
      stateMap[stateItem.name.toLowerCase().trim()] = stateId;
    }

    // Step 2: Seed High Courts for each state
    console.log('\n--- Step 2: Seeding High Courts & District Courts ---');

    // Read full district courts list from frontend data file or embedded dataset
    const fs = require('fs');
    const path = require('path');

    // We will extract District Courts Data dynamically from frontend data file
    const frontendFilePath = path.join(__dirname, '..', 'tusar_garg_advocate_frontend', 'lib', 'data', 'districtCourtsData.ts');
    let districtCourtsList = [];

    if (fs.existsSync(frontendFilePath)) {
      const fileContent = fs.readFileSync(frontendFilePath, 'utf8');
      const matches = fileContent.match(/\{ id: \d+, state: "[^"]+", district: "[^"]+", courtName: "[^"]+", website: "[^"]+", displayUrl: "[^"]+" \}/g);
      if (matches && matches.length > 0) {
        districtCourtsList = matches.map((m) => {
          const stateMatch = m.match(/state: "([^"]+)"/);
          const districtMatch = m.match(/district: "([^"]+)"/);
          const courtNameMatch = m.match(/courtName: "([^"]+)"/);
          const websiteMatch = m.match(/website: "([^"]+)"/);
          const displayUrlMatch = m.match(/displayUrl: "([^"]+)"/);
          return {
            state: stateMatch ? stateMatch[1] : '',
            district: districtMatch ? districtMatch[1] : '',
            courtName: courtNameMatch ? courtNameMatch[1] : '',
            website: websiteMatch ? websiteMatch[1] : '',
            displayUrl: displayUrlMatch ? displayUrlMatch[1] : ''
          };
        });
        console.log(`Extracted ${districtCourtsList.length} district courts from frontend page.tsx`);
      }
    }

    let insertedCount = 0;
    let updatedCount = 0;

    for (let idx = 0; idx < districtCourtsList.length; idx++) {
      const dc = districtCourtsList[idx];
      if (!dc.state || !dc.courtName) continue;

      const matchedStateId = stateMap[dc.state.toLowerCase().trim()];
      if (!matchedStateId) {
        console.warn(`State "${dc.state}" not found in stateMap. Skipping court ${dc.courtName}`);
        continue;
      }

      const slug = generateSlug(dc.courtName);
      const courtPayload = {
        stateId: new mongoose.Types.ObjectId(matchedStateId),
        name: dc.courtName,
        slug: slug,
        courtType: 'District Court',
        city: dc.district,
        image: '/home/district court.svg',
        featured: true,
        status: 'PUBLISHED',
        displayOrder: idx + 1,
        description: `${dc.courtName} located in ${dc.district}, ${dc.state}. Official e-Courts portal for case status, daily cause list, and judgments.`,
        address: `${dc.courtName}, ${dc.district}, ${dc.state}`,
        jurisdiction: `${dc.district} Judicial District, ${dc.state}`,
        contactInfo: { phone: "+91 11 23384567", email: `${generateSlug(dc.district)}district@nic.in` },
        workingHours: "Monday to Saturday: 10:00 AM - 5:00 PM (2nd & 4th Saturday Closed)",
        postalDetails: `Principal District & Sessions Judge, ${dc.courtName}, ${dc.district}, ${dc.state}`,
        history: `The ${dc.courtName} was established to serve the revenue and judicial district of ${dc.district}, ${dc.state}.`,
        judges: [
          { name: `Principal District & Sessions Judge ${dc.district}`, designation: "District Judge", bench: "Court Room 1", profileUrl: "#" },
          { name: `Additional District & Sessions Judge - I`, designation: "Additional District Judge", bench: "Court Room 2", profileUrl: "#" }
        ],
        services: [
          { title: "Case Status Search", link: dc.website, iconType: "Search" },
          { title: "Daily Cause List", link: dc.website, iconType: "FileText" },
          { title: "Certified Copy Counter", link: dc.website, iconType: "Briefcase" },
          { title: "e-Sewa Kendra", link: dc.website, iconType: "Shield" }
        ],
        practiceAreas: ["Civil & Rent Matters", "Bail & Criminal Defense", "Matrimonial Disputes", "Motor Accident Claims"],
        faqs: [
          { question: `Where is ${dc.courtName} located?`, answer: `Located in ${dc.district}, ${dc.state}.` },
          { question: "How can I check case status online?", answer: "Click on Case Status under Important Links or visit the official e-Courts portal." }
        ],
        officialWebsite: dc.website,
        caseStatusUrl: dc.website,
        judgmentsUrl: dc.website,
        causeListUrl: dc.website,
        recruitmentUrl: dc.website,
        rulesUrl: dc.website,
        updatedAt: new Date()
      };

      const existingCourt = await courtsCollection.findOne({
        $or: [{ slug: slug }, { name: dc.courtName, city: dc.district }]
      });

      if (existingCourt) {
        await courtsCollection.updateOne({ _id: existingCourt._id }, { $set: courtPayload });
        updatedCount++;
      } else {
        courtPayload.createdAt = new Date();
        await courtsCollection.insertOne(courtPayload);
        insertedCount++;
      }
    }

    console.log(`\n========================================`);
    console.log(`SEEDING COMPLETED SUCCESSFULLY!`);
    console.log(`States Seeded/Updated: ${allStatesList.length}`);
    console.log(`Courts Inserted: ${insertedCount}`);
    console.log(`Courts Updated: ${updatedCount}`);
    console.log(`Total Courts Processed: ${districtCourtsList.length}`);
    console.log(`========================================\n`);

    process.exit(0);
  } catch (err) {
    console.error('Seeding script error:', err);
    process.exit(1);
  }
}

seedCourtsDatabase();
