exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === '22P02') {
    // 	22P02 = invalid_text_representation
    res.status(400).send({ msg: 'Invalid id' });
  } else if (err.code === '23503') {
    // 23503 = foreign_key_violation
    res.status(400).send({ msg: 'Invalid entry in submitted field' });
  } else if (err.code === '23502') {
    // 23502 = not_null_violation
    res.status(400).send({ msg: 'Missing mandatory field' });
  } else if (err.code === '23505') {
    // 23505 = unique_violation
    res.status(400).send({
      msg: `Submitted field must contain unique information: ${err.detail}`
    });
  } else if (err.code === '42703') {
    // 42703 = 	undefined_column
    res.status(400).send({ msg: `Invalid or missing field in request` });
  } else {
    console.log(err.code);
  }
};

exports.handleServerError = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Server error, see log' });
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};
