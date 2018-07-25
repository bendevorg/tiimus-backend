const URL_PREFIX = '/';
const faker = require('faker');

module.exports = {
  users: {
    validUser: {
      header: {
        'content-type': 'application/json'
      }
    }
  },
  urls: {
    retrieveUrl: () => URL_PREFIX,
    signUp: () => URL_PREFIX + 'auth/sign_up'
  },
  posts: {
    newUser: {
      valid: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      invalidName: {
        name: '',
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      invalidEmail: {
        name: faker.name.findName(),
        email: '',
        password: faker.internet.password()
      },
      invalidPassword: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: ''
      }
    }
  }
};
