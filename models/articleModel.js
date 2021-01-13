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
    });
};
