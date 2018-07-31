const chai = require('chai');
const supertest = require('supertest');
const constants = require('../utils/constants');

const expect = chai.expect;
const app =
  process.env.NODE_ENV == 'production'
    ? require('../../tools/serverProduction')
    : require('../../tools/serverDevelopment');
const api = supertest(app);

module.exports = describe('Retrieve technologies use cases', () => {
  it('Retrieve technologies invalid skill id', done => {
    api
      .get(constants.urls.retrieveTechnologies('a'))
      .set(constants.users.validUser.header)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(400);
          done();
        }
      });
  });

  it('Retrieve technologies valid skill id', done => {
    api
      .get(constants.urls.retrieveTechnologies(constants.posts.newSkill.valid.id))
      .set(constants.users.validUser.header)
      .end((err, res) => {
        if (err) done(err);
        else {
          expect(res.status, 'Status').to.equal(200);
          expect(res.body)
            .to.have.property('msg')
            .to.be.an('array');
          done();
        }
      });
  });
});
