const {
  fetchArticleById,
  amendArticleById,
  removeArticleById,
  addCommentByArticleId,
  fetchCommentsByArticle,
  fetchAllArticles
} = require('../models/articleModel');

exports.getArticleById = (req, res, next) => {
  fetchArticleById(req)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.patchArticleById = (req, res, next) => {
  const inc_votes = req.body.inc_votes;
  const id = req.params.article_id;
  amendArticleById(id, inc_votes)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const comment = req.body;
  const id = req.params.article_id;

  addCommentByArticleId(id, comment)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const id = req.params.article_id;
  console.log('in controller');

  removeArticleById(id)
    .then((id) => {
      res.status(204).end();
    })
    .catch(next);
};

exports.getCommentsByArticle = (req, res, next) => {
  const id = req.params.article_id;
  fetchCommentsByArticle(id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch(next);
};

exports.getAllArticles = (req, res, next) => {
  fetchAllArticles()
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch(next);
};
