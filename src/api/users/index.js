export default (Sequelize, DataTypes) => {
  const Users = Sequelize.define('Users', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    passwordHash: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    passwordSalt: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: DataTypes.STRING,
  });

  Users.associate = (models) => {
    Users.Posts = models.Users.hasMany(models.Posts, {
      foreignKey: 'ownerId',
    });
  };
  return Users;
};
