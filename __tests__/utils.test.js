const { formatArticle } = require('../db/utils/data-manipulation.js');

describe('formatArticle', () => {
  it('returns an empty object when passed an empty array', () => {
    expect(formatArticle([])).toEqual({});
  });
});
