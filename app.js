const express = require('express');
const apiRouter = require('./routers/apiRouter');
const app = express();
const {
  customErrorHandler,
  psqlErrorHandler
} = require('./errors/errorsIndex');

app.use(express.json());
app.use('/api', apiRouter);
app.use(customErrorHandler);
app.use(psqlErrorHandler);

module.exports = app;
