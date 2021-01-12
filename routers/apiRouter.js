const express = require('express');
const apiRouter = require('express').Router();
const topicsRouter = require('./topicsRouter') 
const articleRouter = require('./articleRouter')
const commentRouter = require('./commentRouter')
const userRouter = require('./userRouter')

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);
apiRouter.use('/user', userRouter);

module.exports = apiRouter;