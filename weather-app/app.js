const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const helmet = require('helmet'); // Optional, for security


const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'https://weathermeapp.netlify.app', 
}));
app.use(express.json());
app.use(helmet()); // Optional, for security headers


// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Example route

// Routes
const weatherRoutes = require('./routes/weatherRoutes'); // Adjust path as needed
app.use('/api/weather', weatherRoutes);

// Scheduler
require('./tasks/weatherScheduler'); // Adjust path as needed

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
