const mongoose = require('mongoose');
const CONFIG = require('./config');
 
mongoose.connect(`mongodb://${CONFIG.db_host}:${CONFIG.db_port}/${CONFIG.db}`,
{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
 
mongoose.connection.on("error", console.error.bind(console, "connection error: "));
mongoose.connection.once('open', () => {
 
   console.log('connected to database');
 
});

module.exports = mongoose.connection;