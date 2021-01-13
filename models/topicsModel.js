const connection = require('../db/connection')


exports.fetchAllTopics = () => {
  console.log('in controller')
  return connection.select('*')
  .from('topics')
}