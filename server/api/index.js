const app = require('../src/app');
const connectDB = require('../src/config/db');

// Connect to Database (Vercel functions are stateless, so we connect inside or ensure connection logic handles re-use)
// Mongoose.connect caches connection automatically.
connectDB();

module.exports = app;
