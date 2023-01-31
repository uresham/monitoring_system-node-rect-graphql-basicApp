const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const voteSchema = new Schema({

   contestant: { type: Schema.Types.ObjectId, ref: 'Contestant' },

   votedAt: String

});

module.exports = mongoose.model('Vote', voteSchema);
