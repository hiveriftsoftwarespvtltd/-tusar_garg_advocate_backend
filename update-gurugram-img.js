const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const courtsCollection = mongoose.connection.collection('courts');
  const res = await courtsCollection.updateMany(
    { name: /gurugram/i },
    { $set: { image: '/court/gurugram_court.jpg', ogImage: '/court/gurugram_court.jpg' } }
  );
  console.log('Updated:', res);
  const list = await courtsCollection.find({ name: /gurugram/i }).toArray();
  console.log(list.map(c => ({ name: c.name, slug: c.slug, image: c.image })));
  process.exit(0);
});
