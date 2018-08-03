module.exports = (sequelize, DataTypes) => {
  let ProjectsTags = sequelize.define('projects_tags', {});
  return ProjectsTags;
};
