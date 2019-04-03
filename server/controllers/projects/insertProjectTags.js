const validator = require('../../utils/validator');

module.exports = (project, tags) => {
  return new Promise((resolve, reject) => {
    console.log('tags :', tags);
    if (!validator.isValidArray(tags)) {
      return resolve([]);
    }
    project
      .setTags(tags)
      .then(tagInserted => {
        return resolve(tagInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
