const mongoose = require('mongoose');
require('dotenv').config();

async function testFindBySlug() {
  const uri = process.env.MONGO_URI;
  await mongoose.connect(uri);
  const db = mongoose.connection.db;

  const stateId = new mongoose.Types.ObjectId('6a9bc4017cc78a184095aaef');
  const slug = 'north-and-middle-andaman';

  const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9]/g, '');
  const stateCourts = await db.collection('courts').find({ stateId: stateId }).toArray();

  const matched = stateCourts.find(c => {
    const cSlug = (c.slug || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cName = (c.name || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    const cCity = (c.city || '').toLowerCase().replace(/[^a-z0-9]/g, '');
    return cSlug === cleanSlug ||
      cName === cleanSlug ||
      cSlug.includes(cleanSlug) ||
      cleanSlug.includes(cSlug) ||
      cCity === cleanSlug ||
      cName.includes(cleanSlug);
  });

  console.log('Matched court:', matched ? matched.name + ' | slug: ' + matched.slug : 'NONE');
  process.exit(0);
}

testFindBySlug();
