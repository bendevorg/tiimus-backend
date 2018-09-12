module.exports = (project, skills) => {
  return new Promise((resolve, reject) => {
    project
      .addSkills(skills)
      .then(skillInsert => {
        return resolve(skillInsert);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
