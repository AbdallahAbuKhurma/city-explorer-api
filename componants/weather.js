const weather = require('../assets/weather.json');
const superagent = require('superagent');
require('dotenv').config();

const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

const handelWeather = (req, res) => {

  try {
    const weatherBitUrl = `https://api.weatherbit.io/v2.0/forecast/daily?Key=${WEATHER_BIT_KEY}&lat=${req.query.lat}&lon=${req.query.lon}`;
    console.log(req.query);
    superagent.get(weatherBitUrl).then(weatherBitData => {

      const dataArray = weatherBitData.body.data.map(data => new Weather(data));
      res.send(dataArray);
    });

  } catch (error) {

    const dataArray = weather.data.map(result => new Weather(result));
    res.send(dataArray);
  }
};


class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

module.exports = handelWeather;
