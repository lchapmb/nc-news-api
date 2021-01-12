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

formatComment = (data) => {
  const item = formatTimestamp(data);
  if (item.length) {
    item[0].author = item[0].created_by;
    delete item[0].created_by;
  }

  console.log(item)
  return item;
};

module.exports = { formatTimestamp, formatComment };
