const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes');
const connectDB = require('./config/db');
require('dotenv').config();

app.use(express.json());

// Enable CORS for all routes
app.use(cors());

// Connect to the database
connectDB();

// Use the routes defined in routes/routes.js
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
