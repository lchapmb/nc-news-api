const connection = require('../db/connection');

exports.fetchUserById = (req) => {
  console.log('in the model');
  const username = req.params.username;

  return connection
    .select('*')
    .from('users')
    .where('username', '=', username)
    .then((user) => {
      console.log(user);
      return user;
    });
};
