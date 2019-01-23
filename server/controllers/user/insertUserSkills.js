const validator = require('../../utils/validator');

module.exports = (user, skills) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidArray(skills)) {
      return resolve([]);
    }
    user
      .addSkills(skills)
      .then(skillInserted => {
        return resolve(skillInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
