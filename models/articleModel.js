const connection = require('../db/connection');

exports.fetchArticleById = (req) => {
  const articleId = req.params.article_id;

  if (/\D/.test(articleId)) {
    return Promise.reject({
      status: 400,
      msg: 'Not a valid article_id'
    });
  } else {
    return connection
      .select('articles.*')
      .from('articles')
      .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
      .count('comment_id AS comment_count')
      .where('articles.article_id', '=', articleId)
      .groupBy('articles.article_id')
      .then((article) => {
        const newArticle = { ...article[0] };
        if (!Object.keys(newArticle).length) {
          return Promise.reject({
            status: 404,
            msg: 'Article_id not found'
          });
        } else {
          return newArticle;
        }
      });
  }
};

exports.fetchAllArticles = () => {
  return connection
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .count('comment_id AS comment_count')
    .groupBy('articles.article_id')
    .then((articles) => {
      return articles;
    });
};

exports.amendArticleById = (id, inc_votes = 0) => {
  return connection
    .from('articles')
    .where('article_id', '=', id)
    .increment('votes', inc_votes)
    .returning('*')
    .then((article) => {
      if (!article.length) {
        return Promise.reject({
          status: 404,
          msg: 'Article_id not found'
        });
      }
      return article[0];
    });
};

exports.removeArticleById = (id) => {
  console.log('in model');
  return connection.from('articles').where('article_id', '=', id).del();
  // .then(() => {
  //   // something
  // });
};

exports.addCommentByArticleId = (id, comment) => {
  const commentObj = {};
  commentObj.author = comment.username;
  commentObj.body = comment.body;
  commentObj.article_id = id;

  return connection
    .select('*')
    .from('articles')
    .where('article_id', '=', id)
    .then((article) => {
      if (!article.length) {
        return Promise.reject({
          status: 404,
          msg: 'Article_id not found'
        });
      } else {
        return connection.insert(commentObj).into('comments').returning('*');
      }
    })
    .then((comment) => {
      return comment[0];
    });
};

exports.fetchCommentsByArticle = (id) => {
  return connection
    .select('*')
    .from('comments')
    .where('article_id', '=', id)
    .then((comments) => {
      return comments;
    });
};
