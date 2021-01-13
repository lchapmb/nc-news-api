const connection = require('../db/connection');

exports.fetchAllTopics = () => {
  return connection
    .select('*')
    .from('topics')
    .then((results) => {
      return { topics: results };
    });
};
