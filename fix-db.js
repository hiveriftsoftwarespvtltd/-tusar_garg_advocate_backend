const mongoose = require('mongoose');

mongoose.connect('mongodb://rs5045280:xbpneTRReMJD9LAc@ac-qpd9k1n-shard-00-00.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-01.sbbouj5.mongodb.net:27017,ac-qpd9k1n-shard-00-02.sbbouj5.mongodb.net:27017/tusar-garg-advocate?ssl=true&replicaSet=atlas-45jbz5-shard-0&authSource=admin&retryWrites=true&w=majority')
  .then(async () => {
    const courts = await mongoose.connection.collection('courts').find({}).toArray();
    let updated = 0;
    for(const c of courts) {
      if(typeof c.stateId === 'object' && c.stateId && c.stateId._id) {
        await mongoose.connection.collection('courts').updateOne({ _id: c._id }, { $set: { stateId: new mongoose.Types.ObjectId(c.stateId._id) }});
        updated++;
      } else if(typeof c.stateId === 'string') {
        await mongoose.connection.collection('courts').updateOne({ _id: c._id }, { $set: { stateId: new mongoose.Types.ObjectId(c.stateId) }});
        updated++;
      }
    }
    console.log(`Fixed ${updated} courts.`);
    process.exit(0);
  });
