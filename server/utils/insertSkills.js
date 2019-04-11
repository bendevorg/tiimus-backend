const validator = require('./validator');

module.exports = (modelToInsert, skills) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmptyArray(skills)) {
      skills = [];
    } else if (!validator.isValidUuidArray(skills)) {
      return resolve();
    }
    modelToInsert
      .setSkills(skills)
      .then(skillsInserted => {
        return resolve(skillsInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
