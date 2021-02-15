const express = require('express');
const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const usersRouter = require('./userRouter');
const { send405Error } = require('../errors/errorsIndex');
const endpoints = require('../endpoints.json');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', usersRouter);

apiRouter
  .get('/', (req, res) => {
    res.status(200).send(endpoints);
  })
  .all('/', send405Error);

module.exports = apiRouter;
