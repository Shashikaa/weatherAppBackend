const express = require('express');
const router = express.Router();
const sendWeatherEmail = require('../utils/sendWeatherEmail'); // Adjust the path as per your file structure
const User = require('../models/user');

// Route to register a user and send weather email
router.post('/register', async (req, res) => {
  const { email, location } = req.body;

  try {
    // Validate request data
    if (!email || !location) {
      return res.status(400).json({ message: 'Email and location are required' });
    }

    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Send the weather email
    try {
      await sendWeatherEmail(email, location);
    } catch (emailError) {
      console.error('Error sending weather email:', emailError.message);
      return res.status(500).json({ message: 'Failed to send weather email. Please try again.' });
    }

    // Save the user to the database
    const newUser = new User({ email, location });
    await newUser.save();

    res.status(200).json({ message: 'Registration successful! Weather updates will be sent to your email.' });
  } catch (error) {
    console.error('Error registering user:', error.message);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

module.exports = router;
