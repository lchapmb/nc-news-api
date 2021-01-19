const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api', () => {
  it('GET 200', () => {
    return request(app).get('/api').expect(200);
  });
  //JSON describing all the available endpoints on your API
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

  describe('/articles', () => {
    describe('GET', () => {
      it('GET 200', () => {
        return request(app).get('/api/articles').expect(200);
      });
      it('GET 200 - returns an object with a key of articles and an array of articles', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles.length).toBe(12);
          });
      });
      it('GET 200 - each object in the articles array has keys of author, title, article_id, topic, created_at, votes, comment_count', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(Object.keys(body.articles[0]).sort()).toEqual(
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
    });
  });

  describe('/articles/:article_id', () => {
    describe('GET', () => {
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
    });

    describe('PATCH', () => {
      it('PATCH 200', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200);
      });
      it('PATCH 200 - responds with patched article object when given parameter to alter vote { inc_votes: newVote }', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 1 })
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).toEqual(101);
          });
      });
      it('PATCH 200 - responds with patched article object when given parameter to alter vote { inc_votes: newVote } whose value is negative', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: -1 })
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).toEqual(99);
          });
      });
      it('PATCH 200 - responds with patched article object when no inc_votes passed', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({})
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).toEqual(100);
          });
      });
      it('PATCH 404  - responds with error message when attempting to make request to incorrect article_id', () => {
        return request(app)
          .patch('/api/articles/1000')
          .send({ inc_votes: -1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Article_id not found');
          });
      });
      it('PATCH 400  - responds with error message when attempting to make request to article_id which is not a number', () => {
        return request(app)
          .patch('/api/articles/not_an_id')
          .send({ inc_votes: -1 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
    });
    // the test block below is not finished, function not finished
    describe('DELETE', () => {
      it('DELETE 204', () => {
        return request(app).delete('/api/articles/1').expect(204);
      });
    });
  });

  // the test block below is not finished, function not finished
  describe.skip('/articles/:article_id/comments', () => {
    describe('POST', () => {
      it('POST 201', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'icellusedkars', body: 'generic comment' })
          .expect(201);
      });
      it('POST 201 - returns a comment object when passed an object with keys of username and body', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'icellusedkars', body: 'generic comment' })
          .expect(201)
          .then((res) => {
            expect(res.body.comment.author).toEqual('icellusedkars');
            expect(res.body.comment.body).toEqual('generic comment');
          });
      });
      it('POST 201 - returns a comment object with keys comment_id, author, article_id, votes, created_at, and body', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'icellusedkars', body: 'generic comment' })
          .expect(201)
          .then((res) => {
            expect(Object.keys(res.body.comment).sort()).toEqual(
              [
                'comment_id',
                'author',
                'article_id',
                'votes',
                'created_at',
                'body'
              ].sort()
            );
          });
      });
      it('POST 404 - when passed an incorrect article_id ', () => {
        return request(app)
          .post('/api/articles/999/comments')
          .send({ username: 'icellusedkars', body: 'generic comment' })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Article_id not found');
          });
      });
      it('POST 400 - when passed an article_id which is not a number ', () => {
        return request(app)
          .post('/api/articles/not-a-number/comments')
          .send({ username: 'icellusedkars', body: 'generic comment' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
      it('POST 400 - when passed an invalid username ', () => {
        return request(app)
          .post('/api/articles/not-a-number/comments')
          .send({ username: 'isellusedcars', body: 'generic comment' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
      // incorrect username
      // no body
    });
    // the test block below is not finished, function not finished
    describe('GET', () => {
      it('GET 200', () => {
        return request(app).get('/api/articles/1/comments').expect(200);
      });
      it('GET 200 - returns an object with a key of comments and a value of an array of comments when given a valid article_id', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).toBe(13);
          });
      });
      it.skip('GET 400 - returns message "Invalid article_id" when passed an article_id which is not a number', () => {
        return request(app)
          .get('/api/articles/185/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid article_id');
          });
      });
      // invalid article_id
      // not an article_id
    });
  });
});
