const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  return connection
    .select('*')
    .from('topics')
    .then((topics) => {
      return topics;
    });
};
