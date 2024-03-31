const express = require('express');
const app = express();
const routes = require('./routes/routes');
const connectDB = require('./config/db');
require('dotenv').config();


app.use(express.json());

connectDB();

app.use('/api', routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
