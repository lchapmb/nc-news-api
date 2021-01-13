const { fetchArticleById } = require('../models/articleModel');

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req)
    .then((article) => {
      console.log('in the controller');
      res.status(200).send({ article });
    })
    .catch(next);
};
