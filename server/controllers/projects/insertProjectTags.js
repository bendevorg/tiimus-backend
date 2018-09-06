module.exports = (project, tags) => {
  return new Promise((resolve, reject) => {
    project
      .addTags(tags)
      .then(tagInsert => {
        return resolve(tagInsert);
      })
      .catch(err => {
        return reject(err);
      });
  });
};
