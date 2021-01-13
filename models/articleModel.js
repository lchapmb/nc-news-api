const connection = require('../db/connection');

exports.fetchArticleById = (req) => {
  //console.log('in the model');
  const articleId = req.params.article_id;

  return connection
    .select('articles.*')
    .from('articles')
    .leftJoin('comments', 'articles.article_id', '=', 'comments.article_id')
    .count('comment_id AS comment_count')
    .where('articles.article_id', '=', articleId)
    .groupBy('articles.article_id')
    .then((article) => {
      const newArticle = { ...article[0] };
      return newArticle;
    });
};
