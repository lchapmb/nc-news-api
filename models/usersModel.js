const connection = require('../db/connection');

exports.fetchUserByUsername = (req) => {
  //console.log('in the model');
  const username = req.params.username;

  return connection
    .select('*')
    .from('users')
    .where('username', '=', username)
    .then((user) => {
      if (!user.length) {
        return Promise.reject({
          status: 404,
          msg: 'Invalid username'
        });
      } else {
        return user[0];
      }
    });
};
