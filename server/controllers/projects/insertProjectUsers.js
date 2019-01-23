const validator = require('../../utils/validator');

module.exports = (project, users, role, accepted) => {
  return new Promise((resolve, reject) => {
    if (!validator.isValidArray(users)) return resolve([]);
    if (!validator.isValidString(role)) return resolve([]);
    if (!validator.isValidBoolean(accepted)) return resolve([]);
    project
      .addUsers(users, { through: { role, accepted } })
      .then(insertedUsers => {
        return resolve(insertedUsers);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
