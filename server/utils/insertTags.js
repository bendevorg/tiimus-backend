const validator = require('./validator');

module.exports = (modelToInsert, tags) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmptyArray(tags)) {
      tags = [];
    } else if (!validator.isValidUuidArray(tags)) {
      return resolve();
    }
    modelToInsert
      .setTags(tags)
      .then(tagsInserted => {
        return resolve(tagsInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
