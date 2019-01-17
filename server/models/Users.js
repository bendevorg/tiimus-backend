module.exports = (sequelize, DataTypes) => {
  let Users = sequelize.define('users', {
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      notEmpty: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      notEmpty: false
    },
    lookingForProject: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      notEmpty: false,
      defaultValue: true
    },
    role: {
      type: DataTypes.ENUM('user', 'admin'),
      allowNull: true,
      notEmpty: false
    },
    avatar: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      defaultValue: 'http://www.sapnap.net/images/avatars/otter.png'
    }
  });

  Users.associate = models => {
    Users.belongsToMany(models.projects, {
      through: models.projects_users,
      onDelete: 'CASCADE'
    });
    Users.belongsToMany(models.skills, {
      through: models.user_skills,
      onDelete: 'CASCADE'
    });
  };

  return Users;
};
