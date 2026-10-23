const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  const courtsCollection = mongoose.connection.collection('courts');
  const res = await courtsCollection.updateMany(
    { name: /Andaman|Nicobar/i },
    { $set: { image: '/AndamanNicobarIslands.jpg', ogImage: '/AndamanNicobarIslands.jpg' } }
  );
  console.log('Updated:', res);
  const list = await courtsCollection.find({ name: /Andaman|Nicobar/i }).toArray();
  console.log(list.map(c => ({ name: c.name, slug: c.slug, image: c.image })));
  process.exit(0);
}).catch(err => {
  console.error(err);
  process.exit(1);
});
