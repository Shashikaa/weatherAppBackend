const cron = require('node-cron');
const User = require('../models/user');
const sendWeatherEmail = require('../utils/sendWeatherEmail');

// Schedule task to run at 6:00 AM every day
cron.schedule('0 6 * * *', async () => {
  try {
    console.log('Running daily weather report task at 6:00 AM');

    // Fetch all users from the database
    const users = await User.find({});

    // Send weather email to each user
    for (const user of users) {
      await sendWeatherEmail(user.email, user.location);
    }

    console.log('Weather reports sent successfully');
  } catch (error) {
    console.error('Error sending daily weather report:', error.message);
  }
});
