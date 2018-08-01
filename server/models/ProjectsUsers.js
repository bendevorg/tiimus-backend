module.exports = (sequelize, DataTypes) => {
  let ProjectsUsers = sequelize.define('projects_users', {});
  return ProjectsUsers;
};
