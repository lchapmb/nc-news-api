const { TestScheduler } = require('jest');
const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('/api', () => {
  describe('GET', () => {
    it('GET 200', () => {
      return request(app).get('/api').expect(200);
    });
    it('GET 200 - returns an object with a key of endpoints', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body)).toEqual(['endpoints']);
        });
    });
    it('GET 200 - returns an object with an array of objects whose keys are route and availableMethods', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(Object.keys(body.endpoints[0])).toEqual([
            'route',
            'availableMethods'
          ]);
        });
    });
    it('GET 200 - returns a key of endpoints with a value of array containing objects for each route', () => {
      return request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body.endpoints.length).toBe(6);
        });
    });
  });

  describe('INVALID METHODS', () => {
    test('status:405', () => {
      const invalidMethods = ['patch', 'put', 'delete', 'post'];
      const methodPromises = invalidMethods.map((method) => {
        return request(app)
          [method]('/api')
          .expect(405)
          .then(({ body: { msg } }) => {
            expect(msg).toBe('method not allowed');
          });
      });
      return Promise.all(methodPromises);
    });
  });

  describe('/topics', () => {
    describe('GET', () => {
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
            expect(Object.keys(body.topics[0])).toEqual([
              'slug',
              'description'
            ]);
          });
      });
    });

    describe('POST', () => {
      it('POST 201', () => {
        return request(app)
          .post('/api/topics')
          .send({
            description: "It's a brand new topic!",
            slug: 'nouveau'
          })
          .expect(201);
      });
      it('POST 201 - returns an object with a key of topic, which has value of the topic object containing keys of slug and description', () => {
        return request(app)
          .post('/api/topics')
          .send({
            description: "It's a brand new topic!",
            slug: 'nouveau'
          })
          .expect(201)
          .then(({ body }) => {
            expect(Object.keys(body)).toEqual(['topic']);
            expect(Object.keys(body.topic).sort()).toEqual(
              ['description', 'slug'].sort()
            );
          });
      });
      it('POST 400 - when passed a topic slug which already exists', () => {
        return request(app)
          .post('/api/topics')
          .send({
            description: "It's a brand new topic!",
            slug: 'cats'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe(
              'Submitted field must contain unique information: Key (slug)=(cats) already exists.'
            );
          });
      });
      it('POST 400 - when passed a topic description which already exists', () => {
        return request(app)
          .post('/api/topics')
          .send({
            description: 'Not dogs',
            slug: 'notCats'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe(
              'Submitted field must contain unique information: Key (description)=(Not dogs) already exists.'
            );
          });
      });
      it('POST 400 - when passed an object which is missing description key', () => {
        return request(app)
          .post('/api/articles')
          .send({
            slug: 'nouveau'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid or missing field in request');
          });
      });
      it('POST 400 - when passed an object which is missing slug key', () => {
        return request(app)
          .post('/api/articles')
          .send({
            description: 'Another manic Monday'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid or missing field in request');
          });
      });
    });

    describe('INVALID METHODS', () => {
      test('status:405', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]('/api/topics')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });

  describe('/users/:username', () => {
    describe('GET', () => {
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

    describe('INVALID METHODS', () => {
      test('status:405', () => {
        const invalidMethods = ['patch', 'put', 'delete', 'post'];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]('/api/users/icsellusedcars')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
        return Promise.all(methodPromises);
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

      describe('Queries', () => {
        it('GET 200 - returned articles may be filtered by topic', () => {
          return request(app)
            .get('/api/articles/?topic=cats')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles[0].topic).toBe('cats');
            });
        });
        it('GET 400 - when passed a topic which does not exist', () => {
          return request(app)
            .get('/api/articles/?topic=unicorns')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Invalid or missing field in request');
            });
        });

        it('GET 200 - returned articles are sorted by created_at by default', () => {
          return request(app)
            .get('/api/articles')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).toBeSortedBy('created_at');
            });
        });
        it('GET 200 - returned articles may be ordered by other columns when passed a valid column as a url to sort_by', () => {
          return request(app)
            .get('/api/articles/?sort_by=votes')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).toBeSortedBy('votes');
            });
        });
        it('GET 200 - returned articles may be ordered asc or desc', () => {
          return request(app)
            .get('/api/articles/?order=desc')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).toBeSortedBy('created_at', {
                descending: true
              });
            });
        });
        it('GET 200 - returned articles may be sorted by a valid column and ordered asc or desc', () => {
          return request(app)
            .get('/api/articles/?sort_by=votes&order=desc')
            .expect(200)
            .then(({ body }) => {
              expect(body.articles).toBeSortedBy('votes', {
                descending: true
              });
            });
        });
        it('GET 400 - when given an invalid column to sort by', () => {
          return request(app)
            .get('/api/articles/1/comments?sort_by=imagination')
            .expect(400)
            .then(({ body }) => {
              expect(body.msg).toBe('Invalid or missing field in request');
            });
        });
      });
    });

    describe('POST', () => {
      it('POST 201', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Why my app is the best',
            topic: 'paper',
            author: 'lurker',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(201);
      });
      it('POST 201 - returns an object with a key of article and a value containing the post article as an object', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Why my app is the best',
            topic: 'paper',
            author: 'lurker',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(201)
          .then(({ body }) => {
            expect(Object.keys(body)).toEqual(['article']);
          });
      });
      it('POST 201 - returns an object with a key of article and a value containing the post article as an object with the expected keys', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Why my app is the best',
            topic: 'paper',
            author: 'lurker',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(201)
          .then(({ body }) => {
            expect(Object.keys(body.article).sort()).toEqual(
              [
                'author',
                'title',
                'article_id',
                'body',
                'topic',
                'created_at',
                'votes'
              ].sort()
            );
          });
      });
      it('POST 201 - returned object contains title, topic, body, and author', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Why my app is the best',
            topic: 'paper',
            author: 'lurker',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(201)
          .then(({ body }) => {
            expect(body.article.title).toEqual('Why my app is the best');
            expect(body.article.topic).toEqual('paper');
            expect(body.article.author).toEqual('lurker');
            expect(body.article.body).toEqual(
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
            );
          });
      });
      it('POST 400 - when passed an invalid username as an author', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Why my app is the best',
            topic: 'paper',
            author: 'someguy',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid entry in submitted field');
          });
      });
      it('POST 400 - when passed an invalid topic', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Why my app is the best',
            topic: 'lalalala',
            author: 'lurker',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid entry in submitted field');
          });
      });
      it('POST 400 - when passed no content in title', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: '',
            topic: 'lalalala',
            author: 'lurker',
            body:
              'As a pro lurker, I have seen many an app. As such, I can assure that my app is better than yours'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid entry in submitted field');
          });
      });
      it('POST 400 - when passed no content in body', () => {
        return request(app)
          .post('/api/articles')
          .send({
            title: 'Some title',
            topic: 'lalalala',
            author: 'lurker',
            body: 'This is a body'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid entry in submitted field');
          });
      });
      it('POST 400 - when passed an object which is missing a key', () => {
        return request(app)
          .post('/api/articles')
          .send({
            topic: 'lalalala',
            author: 'lurker',
            body: 'This is a body'
          })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Missing mandatory field');
          });
      });
    });

    describe('INVALID METHODS', () => {
      test('status:405', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]('/api/articles')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
        return Promise.all(methodPromises);
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
      it('PATCH 200 - responds with updated article object when given parameter to alter vote { inc_votes: newVote } whose value is negative', () => {
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

    describe('DELETE', () => {
      it('DELETE 204', () => {
        return request(app).delete('/api/articles/1').expect(204);
      });
      it('DELETE 404 - returns 404 when given an article id which does not exist, gives message "Article_id not found"', () => {
        return request(app)
          .delete('/api/articles/99')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Article_id not found');
          });
      });
      it('DELETE 400 - when given an article_id in an invalid format (ie not a number), gives message "Invalid id"', () => {
        return request(app)
          .delete('/api/articles/not-a-number')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
    });

    describe('INVALID METHODS', () => {
      test('status:405', () => {
        const invalidMethods = ['put', 'post'];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]('/api/articles/1')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });

  describe.only('/articles/:article_id/comments', () => {
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
          .then(({ body }) => {
            expect(body.comment.author).toEqual('icellusedkars');
            expect(body.comment.body).toEqual('generic comment');
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
          .post('/api/articles/1/comments')
          .send({ username: 'isellusedcars', body: 'generic comment' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid entry in submitted field');
          });
      });
      it('POST 400 - when passed no body', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'icellusedkars' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Missing mandatory field');
          });
      });
      it('POST 400 - when passed no username', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ body: 'generic comment' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Missing mandatory field');
          });
      });
    });

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
      it('GET 200 - returns no content when passed a valid article with no comments', () => {
        return request(app)
          .get('/api/articles/4/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments.length).toBe(0);
          });
      });
      it('GET 200 - returned comment objects have keys of comment_id, votes, created_at, author, and body', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(Object.keys(body.comments[0]).sort()).toEqual(
              ['comment_id', 'votes', 'created_at', 'author', 'body'].sort()
            );
          });
      });
      it('GET 200 - returned comments are sorted by created_at by default', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy('created_at');
          });
      });
      it('GET 200 - returned comments may be ordered by other columns when passed a valid column as a url sort_by', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=votes')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy('votes');
          });
      });
      it('GET 200 - returned comments may be ordered asc or desc', () => {
        return request(app)
          .get('/api/articles/1/comments?order=desc')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy('created_at', {
              descending: true
            });
          });
      });
      it('GET 200 - returned comments may be sorted by a valid column and ordered asc or desc', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=votes&order=desc')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).toBeSortedBy('votes', {
              descending: true
            });
          });
      });
      it('GET 400 - returns message "Invalid id" when passed an article_id which is not a number', () => {
        return request(app)
          .get('/api/articles/kevin/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
      it('GET 404 - when passed an incorrect article_id', () => {
        return request(app)
          .get('/api/articles/185/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('Article_id not found');
          });
      });
      it('GET 400 - when given an invalid column to sort by', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=imagination')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid or missing field in request');
          });
      });
    });

    describe('DELETE', () => {
      it('DELETE 204', () => {
        return request(app).delete('/api/articles/1/comments/12').expect(204);
      });
      it('DELETE 404 - returns 404 when given a comment id which does not exist, gives message "ID not found"', () => {
        return request(app)
          .delete('/api/articles/1/comments/200')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('ID not found');
          });
      });
      it('DELETE 404 - returns 404 when given an article id which does not exist, gives message "ID not found"', () => {
        return request(app)
          .delete('/api/articles/70/comments/1')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).toBe('ID not found');
          });
      });
      it('DELETE 400 - when given an article_id in an invalid format (ie not a number), gives message "Invalid id"', () => {
        return request(app)
          .delete('/api/articles/not-a-number/comments/1')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
      it('DELETE 400 - when given a comment_id in an invalid format (ie not a number), gives message "Invalid id"', () => {
        return request(app)
          .delete('/api/articles/1/comments/scoop')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).toBe('Invalid id');
          });
      });
    });

    describe('INVALID METHODS', () => {
      test('status:405', () => {
        const invalidMethods = ['put', 'patch'];
        const methodPromises = invalidMethods.map((method) => {
          return request(app)
            [method]('/api/articles/1/comments')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).toBe('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
});
