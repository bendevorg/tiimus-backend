module.exports = (sequelize, DataTypes) => {
  let Tags = sequelize.define('tags', {
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

  Tags.associate = models => {
    Tags.belongsToMany(models.projects, {
      through: models.projects_tags,
      onDelete: 'CASCADE'
    });
  };

  return Tags;
};
