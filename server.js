const express = require('express');
const weatherHandler = require('./componants/weather');
const moviesHandler = require('./componants/movies');
const cors = require('cors');
require('dotenv').config();



const app = express();

const PORT = process.env.PORT || 3001;


app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/weather', weatherHandler);


app.get('/movies', moviesHandler);


app.listen(PORT);
