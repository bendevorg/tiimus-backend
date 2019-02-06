const validator = require('../../utils/validator');

module.exports = (project, users, role, ownerAccepted, contributorAccepted) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidArray(users)) return resolve([]);
    if (!validator.isValidString(role)) return resolve([]);
    if (!validator.isValidBoolean(ownerAccepted)) return resolve([]);
    if (!validator.isValidBoolean(contributorAccepted)) return resolve([]);
    project
      .addUsers(users, { through: { role, ownerAccepted, contributorAccepted } })
      .then(insertedUsers => {
        return resolve(insertedUsers);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
