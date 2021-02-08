const express = require('express');
const apiRouter = require('./routers/apiRouter');
const app = express();
const {
  customErrorHandler,
  psqlErrorHandler,
  handleServerError
} = require('./errors/errorsIndex');
const cors = require('cors')

app.use(cors());
app.use(express.json());
app.use('/api', apiRouter);
app.use(customErrorHandler);
app.use(psqlErrorHandler);
app.use(handleServerError);

module.exports = app;
