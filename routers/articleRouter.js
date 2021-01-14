const express = require('express');
const articleRouter = require('express').Router();
const {
  getArticleById,
  patchArticleById
} = require('../controllers/articleController');

articleRouter.route('/:article_id').get(getArticleById);
articleRouter.route('/:article_id').patch(patchArticleById);

module.exports = articleRouter;
