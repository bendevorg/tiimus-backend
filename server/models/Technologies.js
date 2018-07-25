module.exports = (sequelize, DataTypes) => {
  let Technologies = sequelize.define('technologies', {
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

  Technologies.associate = models => {
    Technologies.belongsTo(models.skills, {
      foreignKey: 'skillId',
      onDelete: 'CASCADE'
    });
  };

  return Technologies;
};
