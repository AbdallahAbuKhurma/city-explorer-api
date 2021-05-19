const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const superagent = require('superagent');
require('dotenv').config();

let cache = require('./cache');

class Movie {
  constructor(movies) {
    this.imageUrl = `https://image.tmdb.org/t/p/w500${movies.poster_path}`;
    this.title = movies.original_title;
    this.description = movies.overview;
    this.avgVotes = movies.average_votes;
    this.totalVotes = movies.total_votes;
    this.popularity = movies.popularity;
    this.released = movies.released_on;

  }
}

const getMoviesData = (req, res) => {

  try {
    const queryVal = req.query.searchQuery;
    const moviesUrlData = `https://api.themoviedb.org/3/search/movie`;

    const queryParameters = {
      api_key: MOVIE_API_KEY,
      query: req.query.searchQuery
    };

    if (cache[queryVal] !== undefined) {
      res.send(cache[queryVal]);

    } else {

      superagent.get(moviesUrlData).query(queryParameters).then(moviesData => {
        const moviesArray = moviesData.body.results.map(value => new Movie(value));

        cache[queryVal] = moviesArray;

        res.send(moviesArray);
      }).catch(console.error);

    }
  } catch (error) {
    res.send(error);
  }
};


module.exports = getMoviesData;
