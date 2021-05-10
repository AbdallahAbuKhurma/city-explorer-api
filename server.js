const express = require('express');
const weather = require('./assets/weather.json');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();



const app = express();

const PORT = process.env.PORT || 3001;
const WEATHER_BIT_KEY = process.env.WEATHER_BIT_KEY;
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


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

class Movie {
  constructor(movies) {
    this.imageUrl = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    this.title = movies.original_title;
    this.description = movies.overview;
    this.avgVotes = movies.average_votes;
    this.totalVotes = movies.total_votes;
    this.popularity = movies.popularity;
  }
}

app.get('/movies', (req, res) => {

  try {
    let queryValue = req.query.searchQuery;
    const moviesUrlData = `https://api.themoviedb.org/3/search/movie`;

    const queryParameters = {
      api_key: MOVIE_API_KEY, query: req.query.searchQuery
    };


    superagent.get(moviesUrlData).query(queryParameters).then(moviesList => {
      if (queryValue !== undefined) {
        res.send(queryValue);
      } else {
        const moviesArr = moviesList.body.results.map(value => new Movie(value));
        queryValue = moviesArr;
        res.send(moviesArr);
      }
    });

  } catch (error) {
    res.send(error);
  }

});


app.listen(PORT);
