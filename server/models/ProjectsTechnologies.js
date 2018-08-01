module.exports = (sequelize, DataTypes) => {
  let ProjectsTechnologies = sequelize.define('projects_technologies', {});
  return ProjectsTechnologies;
};
