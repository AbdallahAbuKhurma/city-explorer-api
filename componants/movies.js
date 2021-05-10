const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
const superagent = require('superagent');
require('dotenv').config();


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

const handelMovies = (req, res) => {
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
};

module.exports = handelMovies;
