const express = require('express');
const articleRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
  postCommentByArticleId
} = require('../controllers/articleController');

articleRouter.route('/:article_id').get(getArticleById);
articleRouter.route('/:article_id').patch(patchArticleById);
articleRouter.route('/:article_id/comments').post(postCommentByArticleId);

module.exports = articleRouter;
