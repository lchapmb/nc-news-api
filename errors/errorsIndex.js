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
    res.status(400).send({ msg: 'Invalid entry in submitted field' });
  }
  if (err.code === '23502') {
    // 23502 = not_null_violation
    res.status(400).send({ msg: 'Missing mandatory field' });
  }
};

exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Server error, see log' });
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};
