module.exports = (project, skills) => {
  return new Promise((resolve, reject) => {
    project
      .addSkills(skills)
      .then(skillInserted => {
        return resolve(skillInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
