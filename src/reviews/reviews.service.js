const knex = require('../db/connection');

function read(review_id) {
  return knex('reviews').select('*').where({ review_id }).first();
}

function update(updatedReview) {
  return knex('reviews')
    .select('*')
    .where({ review_id: updatedReview.review_id })
    .update(updatedReview, '*');
}

function destroy(review_id) {
  return knex('reviews').where({ review_id }).del();
}

function readCritic(critic_id) {
  return knex('critics')
    .select('organization_name', 'preferred_name', 'surname')
    .where({ critic_id })
    .first();
}

function listByMovie(movie_id) {
  return knex('reviews').where({ movie_id });
}

module.exports = {
  readCritic,
  read,
  update,
  delete: destroy,
  listByMovie,
};
