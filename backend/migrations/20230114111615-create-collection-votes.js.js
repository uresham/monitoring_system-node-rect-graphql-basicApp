const {
  database,
  config,
} = require('migrate-mongo');

const dbMigrateConfig = require('../migrate-mongo-config');
config.set(dbMigrateConfig);

module.exports = {
  async up() {
    const { db } = await database.connect();

    return await db.createCollection('votes', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'contestant', 'votedAt' ],
          properties: {
            contestant: {
              bsonType: 'objectId',
            },
            votedAt: {
              bsonType: 'string',
            }
          },
        },
      },
      validationLevel: 'strict',
      validationAction: 'error',
    })
  },

  async down() {
    const { db } = await database.connect();

    return await db.collection('votes').drop()
  }
};