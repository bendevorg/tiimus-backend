const validator = require('../../utils/validator');

module.exports = (project, skills) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidArray(skills)) {
      return resolve([]);
    }
    project
      .setSkills(skills)
      .then(skillInserted => {
        return resolve(skillInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
