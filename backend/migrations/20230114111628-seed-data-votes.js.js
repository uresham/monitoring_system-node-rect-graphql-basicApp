const {
  database,
  config
} = require('migrate-mongo');

const dbMigrateConfig = require('../migrate-mongo-config');
config.set(dbMigrateConfig);

module.exports = {
  async up() {
    const { db } = await database.connect();

    const contestants = await db.collection('contestants').find({}).toArray();
    let data = [];
    for (let i = 0; i < 20; i++) {
      let x = Math.floor((Math.random() * (contestants.length)));
      const contestantId = contestants[x]._id;
      const time = new Date().toISOString();
      data.push({
        contestant: contestantId,
        votedAt: time
      })
    }

    return await db.collection('votes').insertMany(data, {})
  },

  async down() {
    const { db } = await database.connect();

    return await db.collection('votes').deleteMany({})
  }
};

