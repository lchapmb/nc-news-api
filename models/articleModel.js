const connection = require('../db/connection');

exports.fetchArticleById = (req) => {
  console.log('in the model');
  const articleId = req.params.article_id;
  console.log(articleId);

  /*
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
    */
};
