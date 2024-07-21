const axios = require('axios');

const getWeatherData = async (location) => {
  try {
    const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: location,
        appid: process.env.OPENWEATHERMAP_API_KEY,
        units: 'metric'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
};

module.exports = { getWeatherData };
