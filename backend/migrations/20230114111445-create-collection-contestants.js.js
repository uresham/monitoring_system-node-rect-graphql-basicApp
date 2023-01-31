const {
  database,
  config,
} = require('migrate-mongo');

const dbMigrateConfig = require('../migrate-mongo-config');
config.set(dbMigrateConfig);

module.exports = {
  async up() {
    const { db } = await database.connect();

    return await db.createCollection('contestants', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: [ 'name', 'id' ],
          properties: {
            name: {
              bsonType: 'string',
            },
            id: {
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

    return await db.collection('contestants').drop()
  }
};
