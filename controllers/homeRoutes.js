const router = require("express").Router();
const { Blog, User, Comment } = require("../models");
const sequelize = require("../config/connection");
const withAuth = require("../utils/auth");


router.get("/", withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
      order: sequelize.literal("updatedAt DESC"),
    });

    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    res.render("homepage", {
      blogs,
      user: req.session.username,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.get("/blog/:id", withAuth, async (req, res) => {
  try {
    const dbBlogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: [{ model: User, attributes: ["username"] }],
        },
      ],
      order: [[{ model: Comment, as: "comments" }, "updatedAt", "DESC"]],
    });

    const blog = await dbBlogData.get({ plain: true });

    const userBlogData = await User.findOne({
      attributes: ["username"],
      include: [{ model: Blog }],
      where: {
        username: blog.user.username,
      },
    });

    const { blogs: user } = userBlogData.get({ plain: true });
    const userBlogs = user.filter(({ id }) => blog.id != id);

    const { comments } = blog;
    const commentData = comments.map((comment) => comment);

    res.render("blog", {
      blog,
      userBlogs,
      commentData,
      user: req.session.username,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});



module.exports = router;
