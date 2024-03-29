const express = require('express');
const app = express();
const routes = require('./routes/routes');
const connectDB = require('./config/db');

app.use(express.json());

connectDB();

app.use('/api', routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
