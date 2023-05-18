const express = require("express");
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 4000;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
// with credentials
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// In your main server file (e.g., app.js or server.js)

app.use((req, res, next) => {
  console.log(`Request received: ${req.method} ${req.path}`);
  next();
});


//routes
const carsRoutes = require('./routes/carsRoutes');
app.use('/api', carsRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/api', authRoutes);

const imageRoutes = require('./routes/imageRoutes');
// Add the imageRoutes middleware after other middleware and before error handling
app.use('/api', imageRoutes);


// Connect to db and start server
const connectDb = require("./db");
connectDb().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});

module.exports = app;