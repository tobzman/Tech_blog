const User = require("./User");
const BlogPost = require("./Blog");
const Comment = require("./Comment");

// Define associations between models
BlogPost.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(BlogPost, {
  foreignKey: "user_id",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(BlogPost, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

BlogPost.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});

module.exports = { User, BlogPost, Comment };
