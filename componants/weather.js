const weather = require('../assets/weather.json');
const superagent = require('superagent');
require('dotenv').config();

let cache = require('./cache');

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;


const getweatherData = ('/weather', (req, res) => {

  try {
    const key = 'weather-' + req.query.lat + req.query.lon;
    const parameterts = {
      key: WEATHER_BIT_KEY,
      lat: req.query.lat,
      lon: req.query.lon
    };

    if (cache[key]) {
      res.send(cache[key]);

    } else {

      const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;

      superagent.get(weatherBitUrl).query(parameterts).then(weatherBitData => {
        const dataArray = weatherBitData.body.data.map(data => new Weather(data));
        cache[key] = dataArray;
        res.send(dataArray);

      });
    }

  } catch (error) {
    const dataArray = weather.data.map(data => new Weather(data));
    res.send(dataArray);
  }

});


class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = getweatherData;
