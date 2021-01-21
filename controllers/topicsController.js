const { fetchAllTopics, addTopic } = require('../models/topicsModel');

exports.getAllTopics = (req, res, next) => {
  fetchAllTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

exports.postTopic = (req, res, next) => {
  const topic = req.body;
  addTopic(topic)
    .then((topic) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
