// extract any functions you are using to manipulate your data, into this file

exports.formatArticle = (data) => {
  //do stuff
  // date()

  const finalArr = [];

  if (data.length) {
    data.forEach((article) => {
      const newDate = new Date(article.created_at);
      article.created_at = newDate;
      finalArr.push(article);
    });
  }
  return finalArr;
};
