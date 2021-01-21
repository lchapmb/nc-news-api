const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  return connection
    .select('*')
    .from('topics')
    .then((topics) => {
      return topics;
    });
};

exports.addTopic = (topic) => {
  return connection
    .insert(topic)
    .into('topics')
    .returning('*')
    .then((topic) => {
      return topic[0];
    });
};
