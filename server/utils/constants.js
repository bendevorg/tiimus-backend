/**
 * All project constants
 * @module utils/constants
 */
module.exports = {
  messages: {
    info: {
      USER_CREATED: 'User created.',
      USER_LOGGED: 'User logged.',
      USER_LOGGED_OUT: 'User logged out.'
    },
    error: {
      INVALID_EMAIL: 'E-mail not valid.',
      INVALID_PASSWORD: 'Password not valid.',
      INVALID_NAME: 'Name not valid.',
      INVALID_DESCRIPTION: 'Description not valid',
      INVALID_USER: 'This user/password does not correspond to a valid user.',
      INVALID_LOGIN: 'You have to be logged in to access this feature.',
      EMAIL_IN_USE: 'This email is already being used',
      INVALID_SKILL_ID: 'Skill id not valid.',
      UNEXPECTED_RUNNING: 'An error ocurred while processing your request. Please try again.',
      UNEXPECTED_DB: 'An error ocurred while accessing our database. Please try again.'
    }
  },
  regex: {
    integer: /^-?\d+$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i
  },
  values: {
    PASSWORD_ENCRYPT_KEY: process.env.PASSWORD_ENCRYPT_KEY,
    USER_DATA_ENCRYPT_KEY: process.env.USER_DATA_ENCRYPT_KEY,
    TOKEN_ENCRYPT_KEY: process.env.TOKEN_ENCRYPT_KEY,
    TOKEN_EXPIRATION_IN_SECONDS: 60 * 60 * 24 * 30
  }
};
