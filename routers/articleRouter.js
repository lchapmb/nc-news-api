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
articleRouter.route('/:article_id').get(getArticleById);
articleRouter.route('/:article_id').patch(patchArticleById);
articleRouter.route('/:article_id').delete(deleteArticleById);
articleRouter.route('/:article_id/comments').post(postCommentByArticleId);
articleRouter.route('/:article_id/comments').get(getCommentsByArticle);

module.exports = articleRouter;
