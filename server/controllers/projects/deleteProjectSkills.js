module.exports = (projectSkillsModel, project) => {
  return new Promise((resolve, reject) => {
    projectSkillsModel
      .destroy({
        where: {
          projectId: project.id
        }
      })
      .then(() => {
        return resolve();
      })
      .catch(err => {
        return reject(err);
      });
  });
};
