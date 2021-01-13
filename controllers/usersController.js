const { fetchUserByUsername } = require('../models/usersModel');

exports.getUserByUsername = (req, res, next) => {
  fetchUserByUsername(req)
    .then((user) => {
      //console.log('in the controller');
      res.status(200).send({ user });
    })
    .catch(next);
};
