const { fetchAllTopics } = require('../models/topicsModel')


exports.getAllTopics = (req, res, next) => {
  console.log('in getAllTopics')
  fetchAllTopics().then((topics) => {
    console.log('in FetchAllTopics')
    res.status(200).send(topics);
  })
}