const URL_PREFIX = '/';
const faker = require('faker');

module.exports = {
  users: {
    validUser: {
      header: {
        'content-type': 'application/json'
      }
    },
    noSessionUser: {
      header: {
        'content-type': 'application/json'
      }
    },
    invalidSessionUser: {
      header: {
        'content-type': 'application/json',
        cookie: 'session=blablablabalbalbalblabla'
      }
    }
  },
  urls: {
    retrieveUrl: () => URL_PREFIX,
    signUp: () => URL_PREFIX + 'auth/sign_up',
    signIn: () => URL_PREFIX + 'auth/sign_in',
    signOut: () => URL_PREFIX + 'auth/sign_out',
    userInfo: () => URL_PREFIX + 'user/info',
    retrieveSkills: () => URL_PREFIX + 'skill',
    newSkill: () => URL_PREFIX + 'skill/new'
  },
  posts: {
    newUser: {
      valid: {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      },
      validNotRegistered: {
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
    },
    newSkill: {
      valid: {
        name: faker.name.findName()
      },
      invalid: {
        name: 9001
      }
    }
  }
};
