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
    it.only('GET 200', () => {
      return request(app).get('/api/users/icellusedkars').expect(200);
    });
    // check format of return data/object
  });
});
