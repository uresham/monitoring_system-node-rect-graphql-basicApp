require('dotenv').config();

const CONFIG = {};

CONFIG.db_host = process.env.DB_HOST || 'localhost';
CONFIG.db_port = process.env.DB_PORT || '27017';
CONFIG.db = process.env.DB || 'vote';

module.exports = CONFIG;