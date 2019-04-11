/**
 * All project constants
 * @module utils/constants
 */
module.exports = {
  messages: {
    info: {
      USER_CREATED: 'User created.',
      USER_LOGGED: 'User logged.',
      USER_LOGGED_OUT: 'User logged out.',
      REQUEST_SENT: 'Request sent.'
    },
    error: {
      INVALID_EMAIL: 'E-mail not valid.',
      INVALID_PASSWORD: 'Password not valid.',
      INVALID_NAME: 'Name not valid.',
      INVALID_DESCRIPTION: 'Description not valid',
      INVALID_TAGS: 'Tags not valid.',
      INVALID_SKILLS: 'Skills not valid.',
      INVALID_USER: 'This user/password does not correspond to a valid user.',
      INVALID_LOGIN: 'You have to be logged in to access this feature.',
      INVALID_USERS: 'Users sent are not valid',
      EMAIL_IN_USE: 'This email is already being used',
      INVALID_PROJECT_ID: 'Project id not valid.',
      INVALID_SKILL_ID: 'Skill id not valid.',
      USER_ALREADY_JOINED:
        'One or more users sent has already joined the project.',
      NOT_OWNER: 'You have to be owner of this project to do this action.',
      USER_NOT_FOUND: 'This user id does not correspond to a valid user.',
      PROJECT_NOT_FOUND:
        'This project id does not correspond to a valid project.',
      UNEXPECTED_RUNNING:
        'An error ocurred while processing your request. Please try again.',
      UNEXPECTED_DB:
        'An error ocurred while accessing our database. Please try again.'
    }
  },
  regex: {
    integer: /^-?\d+$/,
    uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
    email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i,
    image: /\/(gif|jpg|jpeg|tiff|png)$/i
  },
  values: {
    PASSWORD_ENCRYPT_KEY: process.env.PASSWORD_ENCRYPT_KEY,
    USER_DATA_ENCRYPT_KEY: process.env.USER_DATA_ENCRYPT_KEY,
    TOKEN_ENCRYPT_KEY: process.env.TOKEN_ENCRYPT_KEY,
    TOKEN_EXPIRATION_IN_SECONDS: 60 * 60 * 24 * 30,
    STATIC_PATH: 'server/static',
    IMAGES_PATH: '/static/images/',
    PROJECT_IMAGE_PLACEHOLDER_PREFIX: 'project-placeholder-',
    PROJECT_IMAGE_PLACEHOLDER_SUFFIX: '.png',
    PROJECT_IMAGE_PLACEHOLDER_AMOUNT: 1,
    USER_IMAGE_PLACEHOLDER_PREFIX: 'user-placeholder-',
    USER_IMAGE_PLACEHOLDER_SUFFIX: '.png',
    USER_IMAGE_PLACEHOLDER_AMOUNT: 9
  },
  roles: {
    OWNER: 'owner',
    CONTRIBUTOR: 'contributor'
  }
};
