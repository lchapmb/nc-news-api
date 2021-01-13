const express = require('express');
const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topicsController');

//topicsRouter.get('/', getAllTopics)

topicsRouter.route('/').get(getAllTopics);
topicsRouter.route('/').get((req, res) => {
  res.status(200).send('all ok from /api/topics');
});

module.exports = topicsRouter;
