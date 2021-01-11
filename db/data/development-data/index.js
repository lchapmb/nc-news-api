const articles = require('./articles');
const comments = require('./comments');
const topics = require('./topics');
const users = require('./users');

module.exports = {
  articleData: articles,
  commentData: comments,
  topicData: topics,
  userData: users
};
