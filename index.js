const express = require('express');
const app = express();
const routes = require('./routes/routes');
const connectDB = require('./config/db');

// Middleware
app.use(express.json());

connectDB();

// Routes
app.use('/api', routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
