const knex = require('../db/connection');

function list(is_showing) {
  return knex('theaters as t')
    .join('movies_theaters', 't.theater_id', 'movies_theaters.theater_id')
    .join('movies as m', 'm.movie_id', 'movies_theaters.movie_id');

}

module.exports = {
  list,
};
