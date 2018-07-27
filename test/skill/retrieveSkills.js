const chai = require('chai');
const supertest = require('supertest');
const constants = require('../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../tools/serverProduction')
    : require('../../tools/serverDevelopment');
const api = supertest(app);

module.exports = describe('Retrieve skills use cases', () => {
  it('Retrieve skills', done => {
    api
      .get(constants.urls.retrieveSkills())
      .set(constants.users.validUser.header)
      .end((err, res) => {
        if (err)
          done(err);
        else {
          expect(res.status, 'Status').to.equal(200);
          expect(res.body).to.have.property('msg').to.be.an('array');
          done();
        }
      });
  });
});