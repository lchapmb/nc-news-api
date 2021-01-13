const connection = require('../db/connection');

exports.fetchArticleById = (req) => {
  console.log('in the model');
  const articleId = req.params.article_id;

  return connection
    .select('*')
    .from('articles')
    .where('article_id', '=', articleId)
    .then((article) => {
      const newArticle = { ...article[0] };
      newArticle.comment_count = 0;
      console.log(newArticle);
      return newArticle;
    })
    .then((newArticle) => {
      newArticle.comment_count = 1;
      return newArticle;
    });
};

/*
countComments = (id) => {
  return connection
    .select('*')
    .from('comments')
    .where('article_id', '=', id)
    .then((comments) => {
      return comments.length;
    });
};
*/
