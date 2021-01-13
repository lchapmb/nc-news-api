const express = require('express');
const apiRouter = require('./routers/apiRouter');
const app = express();

app.use(express.json());
app.use('/api', apiRouter);
app.use((err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
});

module.exports = app;
