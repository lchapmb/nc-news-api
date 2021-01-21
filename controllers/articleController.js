const {
  fetchArticleById,
  amendArticleById,
  removeArticleById,
  addCommentByArticleId,
  fetchCommentsByArticle,
  fetchAllArticles,
  addArticle
} = require('../models/articleModel');

exports.getArticleById = (req, res, next) => {
  const articleId = req.params.article_id;

  fetchArticleById(articleId)
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

  removeArticleById(id)
    .then((id) => {
      res.status(204).end();
    })
    .catch(next);
};

exports.getCommentsByArticle = (req, res, next) => {
  const id = req.params.article_id;
  const query = req.query;
  fetchCommentsByArticle(id, query)
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

exports.postArticle = (req, res, next) => {
  const newPost = req.body;
  addArticle(newPost)
    .then((article) => {
      res.status(201).send({ article });
    })
    .catch(next);
};
