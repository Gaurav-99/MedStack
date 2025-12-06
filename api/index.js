const app = require('../server/src/app');
const connectDB = require('../server/src/config/db');

connectDB();

module.exports = app;
