exports.customErrorHandler = (err, req, res, next) => {
  if (err.status) res.status(err.status).send({ msg: err.msg });
  else next(err);
};

exports.psqlErrorHandler = (err, req, res, next) => {
  if (err.code === '22P02') {
    // 	22P02 = invalid_text_representation
    res.status(400).send({ msg: 'Invalid article_id' });
  }
};
