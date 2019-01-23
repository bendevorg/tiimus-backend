module.exports = (sequelize, DataTypes) => {
  let ProjectsUsers = sequelize.define('projects_users', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 'contributor'
    },
    accepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: true
    }
  });
  return ProjectsUsers;
};
