const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Example route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
const weatherRoutes = require('./routes/weatherRoutes');
app.use('/api/weather', weatherRoutes);

// Scheduler
require('./tasks/weatherScheduler');  // Add this line to include the scheduler

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
