const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Blog extends Model {}

Blog.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
      },
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "Blog",
  }
);

module.exports = Blog;
