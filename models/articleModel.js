const connection = require('../db/connection');

exports.fetchArticleById = (req) => {
  //console.log('in the model');
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

exports.amendArticleById = (req) => {
  //console.log('in the model');

  return this.fetchArticleById(req).then((article) => {
    console.log(Object.keys(req.body).length);
    if (!Object.keys(req.body).length) {
      return article;
    } else if (Object.keys(req.body).includes('inc_votes')) {
      const oldVotes = +article.votes;
      const voteChange = +req.body.inc_votes;
      const newVote = oldVotes + voteChange;
      article.votes = newVote.toString();
      return article;
    } else if (!Object.keys(req.body).includes('inc_votes')) {
      return Promise.reject({
        status: 400
      });
    }
  });
};
