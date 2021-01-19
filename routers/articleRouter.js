const express = require('express');
const articleRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
  deleteArticleById,
  postCommentByArticleId,
  getCommentsByArticle,
  getAllArticles
} = require('../controllers/articleController');

articleRouter.route('/').get(getAllArticles);
articleRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById);
articleRouter
  .route('/:article_id/comments')
  .post(postCommentByArticleId)
  .get(getCommentsByArticle);

module.exports = articleRouter;
