const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contestantSchema = new Schema({

   name: String,
   id: String

});

module.exports = mongoose.model('Contestant', contestantSchema);
