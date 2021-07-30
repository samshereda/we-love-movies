const knex = require('../db/connection');

function list(is_showing) {
  if (is_showing) {
    return knex('movies as m')
      .distinct('m.movie_id', 'm.title', 'm.rating', 'm.description')
      .join('movies_theaters', 'm.movie_id', 'movies_theaters.movie_id')
      .where('movies_theaters.is_showing', true);
  }

  return knex('movies');
}

function read(movie_id) {
  return knex('movies').where({ movie_id }).first();
}

function readReviews(movie_id) {
  return knex('reviews').where({ movie_id });
}

function readTheaters(movie_id) {
  return knex('theaters')
    .join(
      'movies_theaters',
      'theaters.theater_id',
      'movies_theaters.theater_id'
    )
    .where({ movie_id });
}

module.exports = {
  list,
  read,
  readReviews,
  readTheaters,
};
