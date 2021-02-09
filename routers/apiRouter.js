const express = require('express');
const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter');
const articleRouter = require('./articleRouter');
const commentRouter = require('./commentRouter');
const usersRouter = require('./userRouter');
const { send405Error } = require('../errors/errorsIndex');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/users', usersRouter);

apiRouter
  .get('/', (req, res) => {
    res.status(200).send({
      endpoints: [
        { route: '/api', availableMethods: ['GET'] },
        { route: '/topics', availableMethods: ['GET', 'POST'] },
        { route: '/users/:username', availableMethods: ['GET'] },
        { route: '/articles', availableMethods: ['GET', 'POST'], avalableQueries: [{ query: 'topic', example: '/?topic=coding'}] },
        {
          route: '/articles/:article_id',
          availableMethods: ['GET', 'PATCH', 'DELETE']
        },
        {
          route: '/articles/:article_id/comments',
          availableMethods: ['GET', 'POST']
        }
      ]
    });
  })
  .all('/', send405Error);

module.exports = apiRouter;
