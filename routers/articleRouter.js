const express = require('express');
const articleRouter = require('express').Router();
const { getArticleById } = require('../controllers/articleController');

articleRouter.route('/:article_id').get(getArticleById);

module.exports = articleRouter;
