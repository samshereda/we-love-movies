const service = require('./theaters.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const reduceProperties = require('../utils/reduce-properties');

const reduceTheaterAndMovies = reduceProperties('theater_id', {
  movie_id: ['movies', null, 'movie_id'],
  title: ['movies', null, 'title'],
  rating: ['movies', null, 'rating'],
  runtime_in_minutes: ['movies', null, 'runtime_in_minutes'],
  description: ['movies', null, 'description'],
  image_url: ['movies', null, 'image_url'],
});

async function list(req, res, next) {
  const data = reduceTheaterAndMovies(await service.list());
  res.json({ data });
}

module.exports = {
  list: asyncErrorBoundary(list),
};
