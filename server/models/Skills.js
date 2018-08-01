module.exports = (sequelize, DataTypes) => {
  let Skills = sequelize.define('skills', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true
    }
  });

  Skills.associate = models => {
    Skills.hasMany(models.technologies, {
      foreignKey: 'skillId',
      onDelete: 'CASCADE'
    });
    Skills.belongsToMany(models.projects, {
      through: models.projects_skills,
      onDelete: 'CASCADE'
    });
  };

  return Skills;
};
