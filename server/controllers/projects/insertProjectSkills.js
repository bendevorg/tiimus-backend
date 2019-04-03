const validator = require('../../utils/validator');

module.exports = (project, skills) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidUuidArray(skills)) {
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
