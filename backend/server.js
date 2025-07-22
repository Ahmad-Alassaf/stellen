const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const connectDataBase = require('./config/dataBaseConnection');
const { errorHandler } = require('./Middleware/errorMiddleware');

const port = process.env.PORT ||5000
const app = express();



// Connect to MongoDB
connectDataBase();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// API Routes
app.use('/api/user', require('./Routers/authRoute'));
app.use('/api/profile', require('./Routers/profileRoute'));
app.use('/api/jobs', require('./Routers/jobRoute'));
app.use('/api/feedbacks', require('./Routers/feedbackRoute'));
app.use('/api/categories', require('./Routers/categoryRoute'));
app.use('/api/comments', require('./Routers/commentRoute'));
app.use('/api/search', require('./Routers/searchRoute'));
app.use('/api/upload', require('./Routers/uploadRoutes'));

// Error Handler
app.use(errorHandler);

app.use(express.static(path.join(__dirname, "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
 
// Start server
app.listen(port, () => {
  console.log(`✅ Server running on port: ${port}`);
});
