const express = require('express');
const topicsRouter = require('express').Router();
const { getAllTopics } = require('../controllers/topicsController');
const { send405Error } = require('../errors/errorsIndex');

topicsRouter.route('/').get(getAllTopics).all(send405Error);
topicsRouter.route('/').get((req, res) => {
  res.status(200).send('all ok from /api/topics');
});

module.exports = topicsRouter;
