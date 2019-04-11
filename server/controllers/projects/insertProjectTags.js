const validator = require('../../utils/validator');

module.exports = (project, tags) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmptyArray(tags)) {
      tags = [];
    } else if (!validator.isValidUuidArray(tags)) {
      return resolve();
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
