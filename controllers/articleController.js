const {
  fetchArticleById,
  amendArticleById
} = require('../models/articleModel');

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req)
    .then((article) => {
      //console.log('in the controller');
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  amendArticleById(req)
    .then((article) => {
      //console.log('in the controller');
      res.status(201).send({ article });
    })
    .catch(next);
};
