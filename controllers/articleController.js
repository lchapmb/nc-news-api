const {
  fetchArticleById,
  amendArticleById,
  removeArticleById,
  addCommentByArticleId
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
  const inc_votes = req.body.inc_votes;
  const id = req.params.article_id;
  amendArticleById(id, inc_votes)
    .then((article) => {
      //console.log('in the controller');
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.postCommentByArticleId = (req, res, next) => {
  const comment = req.body;
  const id = req.params.article_id;

  addCommentByArticleId(id, comment)
    .then((comment) => {
      console.log('in the controller');
      res.status(201).send({ comment });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const id = req.params.article_id;

  removeArticleById(id)
    .then(() => {
      res.status(204);
    })
    .catch(next);
};
