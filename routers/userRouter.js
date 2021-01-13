const express = require('express');
const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/usersController');

usersRouter.route('/:username').get(getUserByUsername);
usersRouter.route('/').get((req, res) => {
  console.log('all ok from /api/users');
  res.status(200).send('all ok from /api/users');
});

module.exports = usersRouter;
