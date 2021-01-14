const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api', () => {
  describe('/topics', () => {
    it('GET 200', () => {
      return request(app).get('/api/topics').expect(200);
    });
    it('GET 200 - returns an object with key of topics and an array of topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(body.topics.length).toBe(3);
        });
    });
    it('GET 200 - each returned object in the array has a key of slug and a key of description', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body.topics[0])).toEqual(['slug', 'description']);
        });
    });
  });

  describe('/users/:username', () => {
    it('GET 200', () => {
      return request(app).get('/api/users/icellusedkars').expect(200);
    });
    it('GET 200 - returns an object with key of user and a value containing the user object', () => {
      return request(app)
        .get('/api/users/icellusedkars')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body)).toEqual(['user']);
        });
    });
    it('GET 200 - returns an object with key of user and a value containing the user object with keys of username, avatar_url, and name', () => {
      return request(app)
        .get('/api/users/icellusedkars')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body.user)).toEqual([
            'username',
            'avatar_url',
            'name'
          ]);
        });
    });
    it('GET 404 for an invalid username - msg sent "Invalid username"', () => {
      return request(app)
        .get('/api/users/icsellusedcars')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Invalid username');
        });
    });
  });

  describe('/articles/:article_id', () => {
    it('GET 200', () => {
      return request(app).get('/api/articles/1').expect(200);
    });
    it('GET 200 - returns an object with a key of article and a value containing the article object', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body)).toEqual(['article']);
        });
    });
    it('GET 200 - returns an object with a key of article with a value of an object containing expected keys', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body.article).sort()).toEqual(
            [
              'author',
              'title',
              'article_id',
              'body',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            ].sort()
          );
        });
    });
    it('GET 200 - returned article object has a key of comment_count with the number of associated comments as the value', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then(({ body }) => {
          expect(body.article.comment_count).toEqual('13');
        });
    });
    it('GET 404 - when given an article_id which is not present, gives message "Article_id not found"', () => {
      return request(app)
        .get('/api/articles/99')
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe('Article_id not found');
        });
    });
    it('GET 400 - when given an article_id in an invalid format (ie not a number), gives message "Not a valid article_id"', () => {
      return request(app)
        .get('/api/articles/not-a-number')
        .expect(400)
        .then(({ body }) => {
          expect(body.msg).toBe('Not a valid article_id');
        });
    });
    it('PATCH 201 - responds with unpatched article object when given no parameters', () => {
      return request(app)
        .patch('/api/articles/1')
        .send({})
        .expect(201)
        .then((res) => {
          expect(res.body.article).toEqual({
            article_id: 1,
            title: 'Living in the shadow of a great man',
            body: 'I find this existence challenging',
            votes: '100',
            topic: 'mitch',
            author: 'butter_bridge',
            created_at: '2018-11-15T12:21:54.171Z',
            comment_count: '13'
          });
        });
    });
  });
});