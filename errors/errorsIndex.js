exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === '22P02') {
    // 	22P02 = invalid_text_representation
    res.status(400).send({ msg: 'Invalid id' });
  }
  if (err.code === '23503') {
    // 23503 = foreign_key_violation
    res.status(400).send({ msg: 'Invalid username' });
  }
};

exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Server error, see log' });
};
