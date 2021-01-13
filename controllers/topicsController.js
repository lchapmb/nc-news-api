const { fetchAllTopics } = require('../models/topicsModel');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics().then((topics) => {
    // console.log(topics);
    res.status(200).send({ topics });
  });
};
