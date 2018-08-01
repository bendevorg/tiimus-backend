module.exports = (sequelize, DataTypes) => {
  let Projects = sequelize.define('projects', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  });

  Projects.associate = models => {
    Projects.belongsToMany(models.users, {
      through: models.projects_users,
      onDelete: 'CASCADE'
    });
    Projects.belongsToMany(models.skills, {
      through: models.projects_skills,
      onDelete: 'CASCADE'
    });
    Projects.belongsToMany(models.technologies, {
      through: models.projects_technologies,
      onDelete: 'CASCADE'
    });
  };

  return Projects;
};
