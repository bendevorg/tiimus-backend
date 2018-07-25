const URL_PREFIX = '/';

module.exports = {
  users: {
    validUser: {
      header: {
        'content-type': 'application/json'
      }
    }
  },
  urls: {
    retrieveUrl: () => URL_PREFIX
  },
  register: {}
};
