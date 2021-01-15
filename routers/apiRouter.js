const express = require('express');
const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const usersRouter = require('./userRouter');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', usersRouter);

apiRouter.get('/', (req, res) => {
  res.status(200).send('api route');
});

module.exports = apiRouter;
