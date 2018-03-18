export default (Sequelize, DataTypes) => {
  const Posts = Sequelize.define('Posts', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    views: DataTypes.INTEGER,
  });
  Posts.associate = (models) => {
    models.Posts.belongsTo(models.Users, {
      as: 'owner',
      onDelete: 'Cascade',
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Posts;
};
