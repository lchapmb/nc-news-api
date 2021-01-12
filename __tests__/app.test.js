const request = require('supertest');
const app = require('../app');
console.log(app);
describe('./api', () => {
  describe('/topics', () => {
    it('GET 200 - responds with an array of topics', () => {
      return request(app).get('/api/topics').expect(200);
      /*
        .then((topics) => {
          expect(topics.length).toBe(4);
        });
        */
    });
  });
});
