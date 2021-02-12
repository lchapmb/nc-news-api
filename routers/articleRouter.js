const express = require('express');
const articleRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById,
  deleteArticleById,
  postCommentByArticleId,
  getCommentsByArticle,
  getAllArticles,
  postArticle,
  deleteCommentById
} = require('../controllers/articleController');
const { send405Error } = require('../errors/errorsIndex');

articleRouter
  .route('/')
  .get(getAllArticles)
  .post(postArticle)
  .all(send405Error);
articleRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById)
  .delete(deleteArticleById)
  .all(send405Error);
articleRouter
  .route('/:article_id/comments')
  .post(postCommentByArticleId)
  .get(getCommentsByArticle)
  .all(send405Error);
articleRouter
  .route('/:article_id/comments/:comment_id')
  .delete(deleteCommentById)
  .all(send405Error);

module.exports = articleRouter;
