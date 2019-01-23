const validator = require('../../utils/validator');

module.exports = (project, users, role) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidArray(users)) return resolve([]);
    if (!validator.isValidString(role)) return resolve([]);
    project
      .addUsers(users, { through: { role } })
      .then(insertedUsers => {
        return resolve(insertedUsers);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
