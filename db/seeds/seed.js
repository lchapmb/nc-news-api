const {
  topicData,
  articleData,
  commentData,
  userData,
} = require('../data/index.js');

exports.seed = function (knex) {
  return knex.migrate
  .rollback()
  .then(() => {
    return knex.migrate.latest();
  })
  .then(() => {
    return knex('topics').insert(topicData).returning('*')
  })
};
