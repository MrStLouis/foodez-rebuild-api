export default (Sequelize, DataTypes) => {
  const Posts = Sequelize.define('Posts', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: DataTypes.INTEGER,
  });
  Posts.associate = (models) => {
    Posts.Users = models.Posts.belongsTo(models.Users, {
      as: 'owner',
      onDelete: 'Cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Posts;
};
