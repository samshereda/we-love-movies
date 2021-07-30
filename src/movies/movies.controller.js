const service = require('./movies.service.js');
const reviewService = require('../reviews/reviews.service.js');
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');

async function movieExists(req, res, next) {
  const { movieId } = req.params;
  const movie = await service.read(movieId);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  return next({ status: 404, message: `Movie cannot be found.` });
}

async function list(req, res, next) {
  const { is_showing } = req.query;
  res.json({ data: await service.list(is_showing) });
}

function read(req, res, next) {
  const { movie } = res.locals;
  res.json({ data: movie });
}

async function readReviews(req, res, next) {
  const { movieId } = req.params;
  const data = await reviewService.listByMovie(movieId);
  for (review of data) {
    review.critic = await reviewService.readCritic(review.critic_id);
  }
  res.json({ data });
}

async function readTheaters(req, res, next) {
  const { movieId } = req.params;
  const theaters = await service.readTheaters(movieId);
  res.json({ data: theaters });
}

module.exports = {
  read: [asyncErrorBoundary(movieExists), read],
  list: asyncErrorBoundary(list),
  readReviews: asyncErrorBoundary(readReviews),
  readTheaters: asyncErrorBoundary(readTheaters),
};
