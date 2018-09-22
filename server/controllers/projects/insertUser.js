module.exports = (project, user, role) => {
  return new Promise((resolve, reject) => {
    project
      .addUser(user, { through: { role }})
      .then(userInserted => {
        return resolve(userInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
