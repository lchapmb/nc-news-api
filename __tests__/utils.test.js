const {
  formatTimestamp,
  formatComment,
  createLookup
} = require('../db/utils/data-manipulation.js');

describe('formatTimestamp', () => {
  it('returns an empty array when passed an empty array', () => {
    expect(formatTimestamp([])).toEqual([]);
  });

  it('returns an object with timestamp formated to JS Date object', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389
      }
    ];
    const output = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: new Date('2016-08-18T12:07:52.389Z')
      }
    ];
    expect(formatTimestamp(input)).toEqual(output);
  });

  it('returns an array of objects with timestamp formated to JS Date object', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: 1500584273256
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: 1500659650346
      }
    ];
    const output = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: new Date('2016-08-18T12:07:52.389Z')
      },
      {
        title:
          "The Rise Of Thinking Machines: How IBM's Watson Takes On The World",
        topic: 'coding',
        author: 'jessjelly',
        body:
          'Many people know Watson as the IBM-developed cognitive super computer that won the Jeopardy! gameshow in 2011. In truth, Watson is not actually a computer but a set of algorithms and APIs, and since winning TV fame (and a $1 million prize) IBM has put it to use tackling tough problems in every industry from healthcare to finance. Most recently, IBM has announced several new partnerships which aim to take things even further, and put its cognitive capabilities to use solving a whole new range of problems around the world.',
        created_at: new Date('2017-07-20T20:57:53.256Z')
      },
      {
        title: '22 Amazing open source React projects',
        topic: 'coding',
        author: 'happyamy2016',
        body:
          'This is a collection of open source apps built with React.JS library. In this observation, we compared nearly 800 projects to pick the top 22. (React Native: 11, React: 11). To evaluate the quality, Mybridge AI considered a variety of factors to determine how useful the projects are for programmers. To give you an idea on the quality, the average number of Github stars from the 22 projects was 1,681.',
        created_at: new Date('2017-07-21T17:54:10.346Z')
      }
    ];
    expect(formatTimestamp(input)).toEqual(output);
  });

  it('returns an array of objects without mutating the original array', () => {
    const input = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389
      }
    ];
    const inputCopy = [
      {
        title: 'Running a Node App',
        topic: 'coding',
        author: 'jessjelly',
        body:
          'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
        created_at: 1471522072389
      }
    ];
    formatTimestamp(input);
    expect(input).toEqual(inputCopy);
  });
});

describe('formatComment', () => {
  it('returns an empty array when passed an empty array', () => {
    expect(formatComment([])).toEqual([]);
  });

  it('returns an array with object which has a timestamp formatted in created_at', () => {
    const input = [
      {
        belongs_to: 'Making sense of Redux',
        created_at: 1511354163389
      }
    ];
    const output = [
      {
        created_at: new Date('2017-11-22T12:36:03.389Z'),
        article_id: 1
      }
    ];
    const lookup = { 'Making sense of Redux': 1 };
    expect(formatComment(input, lookup)).toEqual(output);
  });

  it('Returns an array with an object where created by key is changed to author', () => {
    const input = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const lookup = { 'Making sense of Redux': 1 };
    const formattedOutput = formatComment(input, lookup);
    expect(formattedOutput[0].author).toEqual(input[0].created_by);
    expect(Object.keys(formattedOutput[0])).toContain('author');
    expect(Object.keys(formattedOutput[0])).not.toContain('created_by');
  });

  it('returns an array with an object where belongs to is replaced with article_id', () => {
    const input = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      }
    ];
    const lookup = { 'Making sense of Redux': 1 };
    const formattedOutput = formatComment(input, lookup);
    expect(formattedOutput[0].article_id).toEqual(1);
    expect(Object.keys(formattedOutput[0])).not.toContain('belongs_to');
  });

  it('returns an array of formatted objects when passed an array of multiple comment objects', () => {
    const input = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const output = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        author: 'grumpy19',
        votes: 7,
        created_at: new Date(1478813209256),
        article_id: 1
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        author: 'butter_bridge',
        votes: 14,
        created_at: new Date(1479818163389),
        article_id: 2
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        author: 'icellusedkars',
        votes: 100,
        created_at: new Date(1448282163389),
        article_id: 2
      }
    ];
    const lookup = {
      'Making sense of Redux': 1,
      'Living in the shadow of a great man': 2
    };
    const formattedOutput = formatComment(input, lookup);
    expect(formattedOutput).toEqual(output);
  });

  it('returns an array of objects without mutating the original array', () => {
    const input = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const inputCopy = [
      {
        body: 'Nobis consequatur animi. Ullam nobis quaerat voluptates veniam.',
        belongs_to: 'Making sense of Redux',
        created_by: 'grumpy19',
        votes: 7,
        created_at: 1478813209256
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389
      },
      {
        body:
          'Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy — onyou it works.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'icellusedkars',
        votes: 100,
        created_at: 1448282163389
      }
    ];
    const lookup = {
      'Making sense of Redux': 1,
      'Living in the shadow of a great man': 2
    };
    formatComment(input, lookup);
    expect(input).toEqual(inputCopy);
  });
});

describe('createLookup', () => {
  it('Returns an empty object when passed an empty array', () => {
    expect(createLookup([])).toEqual({});
  });
  it('Returns a lookup object when passed an array of a single item', () => {
    const input = [{ article_id: 1, title: 'hello' }];
    const output = { hello: 1 };
    expect(createLookup(input)).toEqual(output);
  });
  it('Returns a lookup object when passed multiple items', () => {
    const input = [
      { article_id: 1, title: 'hello' },
      { article_id: 2, title: 'go away' }
    ];
    const output = { hello: 1, 'go away': 2 };
    expect(createLookup(input)).toEqual(output);
  });
});
