module.exports = (project, tags) => {
  return new Promise((resolve, reject) => {
    project
      .addTags(tags)
      .then(tagInserted => {
        return resolve(tagInserted);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
