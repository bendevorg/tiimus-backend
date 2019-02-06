module.exports = (sequelize, DataTypes) => {
  let ProjectsUsers = sequelize.define('projects_users', {
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 'contributor'
    },
    ownerAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    },
    contributorAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notEmpty: true,
      defaultValue: false
    }
  });
  return ProjectsUsers;
};
