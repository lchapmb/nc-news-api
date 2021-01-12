// extract any functions you are using to manipulate your data, into this file

exports.formatArticle = (data) => {
  const finalArr = [];

  if (data.length) {
    data.forEach((article) => {
      const articleCopy = { ...article };
      const newDate = new Date(articleCopy.created_at);
      articleCopy.created_at = newDate;
      finalArr.push(articleCopy);
    });
  }
  return finalArr;
};
