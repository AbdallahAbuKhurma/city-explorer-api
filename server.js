const express = require('express');
const weather = require('./assets/weather.json');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();


const app = express();

const PORT = process.env.PORT || 3001;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/weather', (req, res) => {

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

});

class Weather {
  constructor(data) {
    this.date = data.valid_date;
    this.description = data.weather.description;
  }
}

app.listen(PORT);
