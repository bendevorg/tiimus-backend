const chai = require('chai');
const supertest = require('supertest');
const constants = require('../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../tools/serverProduction')
    : require('../../tools/serverDevelopment');
const api = supertest(app);

module.exports = describe('New tag use cases', () => {
  it('New invalid tag', done => {
    api
      .post(constants.urls.newTag())
      .set(constants.users.validUser.header)
      .send(constants.posts.newTag.invalid)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('New valid tag', done => {
    api
      .post(constants.urls.newTag())
      .set(constants.users.validUser.header)
      .send(constants.posts.newTag.valid)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(200);
          expect(res.body.msg).to.have.property('id');
          constants.posts.newTag.valid.id = res.body.msg.id;
          done();
        }
      });
  });
});
