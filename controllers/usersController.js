const { fetchUserById } = require('../models/usersModel');

exports.getUserById = (req, res, next) => {
  fetchUserById(req)
    .then((user) => {
      console.log('in the controller');
      res.status(200).send({ user });
    })
    .catch(next);
};
