const formatTimestamp = (data) => {
  const finalArr = [];

  if (data.length) {
    data.forEach((element) => {
      const elementCopy = { ...element };
      const newDate = new Date(elementCopy.created_at);
      elementCopy.created_at = newDate;
      finalArr.push(elementCopy);
    });
  }
  return finalArr;
};

const createLookup = (array) => {
  const lookup = {};
  if (array.length) {
    array.forEach((item) => {
      lookup[item.title] = item.article_id;
    });
  }
  return lookup;
};

const formatComment = (data, lookup) => {
  const item = formatTimestamp(data);
  if (item.length) {
    item.forEach((comment) => {
      comment.author = comment.created_by;
      delete comment.created_by;
      comment.article_id = lookup[comment.belongs_to];
      delete comment.belongs_to;
    });
  }
  return item;
};

module.exports = { formatTimestamp, formatComment, createLookup };
