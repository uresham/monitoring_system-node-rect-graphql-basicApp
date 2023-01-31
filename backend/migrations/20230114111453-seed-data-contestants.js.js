const {
  database,
  config
} = require('migrate-mongo');

const dbMigrateConfig = require('../migrate-mongo-config');
config.set(dbMigrateConfig);

module.exports = {
  async up() {
    const { db } = await database.connect();

    return await db.collection('contestants').insertMany([
      {
        name: 'Max',
        id: 'MV33'
      },
      {
        name: 'Vettle',
        id: 'VX42'
      },
      {
        name: 'Daniel',
        id: 'DS67'
      },
      {
        name: 'Levis',
        id: 'LY12'
      },
    ], {})
  },

  async down() {
    const { db } = await database.connect();

    return await db.collection('contestants').deleteMany({})
  }
};
