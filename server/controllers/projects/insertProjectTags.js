const validator = require('../../utils/validator');

module.exports = (project, tags) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidArray(tags)) {
      return resolve([]);
    }
    console.log(tags);
    project
      .addTags(tags)
      .then(tagInserted => {
        return resolve(tagInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
