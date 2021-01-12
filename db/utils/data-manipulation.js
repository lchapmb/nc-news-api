// extract any functions you are using to manipulate your data, into this file

formatTimestamp = (data) => {
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

createLookup = (array) => {

  const lookup = {};
  if (array.length) {
    array.forEach((item) => {
      lookup[item.title] = item.article_id
    })
  }
  return lookup;
}

formatComment = (data, lookup) => {
  const item = formatTimestamp(data);
  if (item.length) {
    item[0].author = item[0].created_by;
    delete item[0].created_by;
    item[0].article_id = lookup[item[0].belongs_to]
    delete item[0].belongs_to;
  }
  return item;
};

module.exports = { formatTimestamp, formatComment, createLookup };
