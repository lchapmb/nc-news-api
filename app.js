const express = require('express');
const apiRouter = require('./routers/apiRouter');
const app = express();

app.use(express.JSON());
app.use('./api', apiRouter);

module.exports = app;
