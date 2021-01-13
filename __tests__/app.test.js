const request = require('supertest');
const app = require('../app');
const connection = require('../db/connection');

beforeEach(() => connection.seed.run());
afterAll(() => connection.destroy());

describe('./api', () => {
  describe('/topics', () => {
    it('GET 200', () => {
      return request(app).get('/api/topics').expect(200);
    });
    it('GET 200 - returns an object with key of topics and an array of topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then(({ body }) => {
          console.log(body.topics.topics);
          expect(body.topics.topics.length).toBe(3);
        });
    });
  });
});
