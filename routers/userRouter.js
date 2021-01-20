const express = require('express');
const usersRouter = require('express').Router();
const { getUserByUsername } = require('../controllers/usersController');
const { send405Error } = require('../errors/errorsIndex');

usersRouter.route('/:username').get(getUserByUsername).all(send405Error);
usersRouter.route('/').get((req, res) => {
  console.log('all ok from /api/users');
  res.status(200).send('all ok from /api/users');
});

module.exports = usersRouter;
