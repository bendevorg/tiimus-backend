module.exports = (projectTagsModel, project) => {
  return new Promise((resolve, reject) => {
    projectTagsModel
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
