const {
  topicData,
  articleData,
  commentData,
  userData
} = require('../data/index.js');

const {
  formatTimestamp,
  formatComment,
  createLookup
} = require('../utils/data-manipulation');

exports.seed = function (knex) {
  return knex.migrate
    .rollback()
    .then(() => {
      return knex.migrate.latest();
    })
    .then(() => {
      return knex('topics').insert(topicData).returning('*');
    })
    .then(() => {
      return knex('users').insert(userData).returning('*');
    })
    .then(() => {
      const formattedArticleData = formatTimestamp(articleData);
      return knex('articles').insert(formattedArticleData).returning('*');
    })
    .then((articleDataForComments) => {
      const articleRefTable = createLookup(articleDataForComments);
      const formattedCommentData = formatComment(commentData, articleRefTable);
      return knex('comments').insert(formattedCommentData).returning('*');
    });
};
