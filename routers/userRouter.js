const express = require('express');
const usersRouter = require('express').Router();
const { getUserById } = require('../controllers/usersController');

usersRouter.route('/:username').get(getUserById);
usersRouter.route('/').get((req, res) => {
  console.log('all ok from /api/users');
  res.status(200).send('all ok from /api/users');
});

module.exports = usersRouter;
