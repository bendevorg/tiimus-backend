const chai = require('chai');
const supertest = require('supertest');
const constants = require('../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../tools/serverProduction')
    : require('../../tools/serverDevelopment');
const api = supertest(app);

module.exports = describe('Get user info cases', () => {
  it('Get no session user info', done => {
    api
      .get(constants.urls.userInfo())
      .set(constants.users.noSessionUser.header)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(401);
          done();
        }
      });
  });

  it('Get invalid session user info', done => {
    api
      .get(constants.urls.userInfo())
      .set(constants.users.invalidSessionUser.header)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(401);
          done();
        }
      });
  });

  it('Get valid session user info', done => {
    api
      .get(constants.urls.userInfo())
      .set(constants.users.validUser.header)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(200);
          done();
        }
      });
  });
});
