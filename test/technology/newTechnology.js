const chai = require('chai');
const supertest = require('supertest');
const constants = require('../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../tools/serverProduction')
    : require('../../tools/serverDevelopment');
const api = supertest(app);

module.exports = describe('New technology use cases', () => {
  it('New invalid skillId technology', done => {
    api
      .post(constants.urls.newTechnology('a'))
      .set(constants.users.validUser.header)
      .send(constants.posts.newTechnology.valid)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('New invalid technology', done => {
    api
      .post(constants.urls.newTechnology(constants.posts.newSkill.valid.id))
      .set(constants.users.validUser.header)
      .send(constants.posts.newTechnology.invalid)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('New valid technology', done => {
    api
      .post(constants.urls.newTechnology(constants.posts.newSkill.valid.id))
      .set(constants.users.validUser.header)
      .send(constants.posts.newTechnology.valid)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(200);
          expect(res.body.msg).to.have.property('id');
          constants.posts.newTechnology.valid.id = res.body.msg.id;
          done();
        }
      });
  });
});
