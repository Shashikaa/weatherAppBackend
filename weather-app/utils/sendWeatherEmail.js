const nodemailer = require('nodemailer');
const { getWeatherData } = require('../services/weatherService');
require('dotenv').config();

// Function to send weather email
const sendWeatherEmail = async (email, location) => {
  try {
    // Fetch weather data from OpenWeatherMap API
    const weatherData = await getWeatherData(location);

    if (!weatherData) {
      throw new Error('Failed to fetch weather data');
    }

    // Create email transport using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Define email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Weather Update',
      html: `
        <h1>Weather Update</h1>
        <p>Location: ${location}</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
        <p>Temperature: ${weatherData.main.temp}°C</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Weather email sent successfully to:', email);
  } catch (error) {
    console.error('Error sending weather email:', error.message);
    throw new Error('Failed to send weather email');
  }
};

module.exports = sendWeatherEmail;
