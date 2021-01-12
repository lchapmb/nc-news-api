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
  return formatTimestamp(data);
};

module.exports = { formatTimestamp, formatComment };
