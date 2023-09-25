const router = require("express").Router();
const { Blog, User } = require(`../../models`);
const idleAuth = require("../../utils/idle");

// Route: GET /blogs
// Get all blog posts with user information
router.get(`/`, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [{ model: User }],
    });

    res.status(200).json(blogData);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route: POST /blogs
// Create a new blog post
router.post(`/`, idleAuth, async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res
      .status(400)
      .json({ message: `Please fill out the title and content` });
  }
  try {
    const user = await User.findOne({
      where: {
        username: req.session.username,
      },
    });
    const { id } = user.get({ plain: true });
    const createdBlog = await Blog.create({
      title: title,
      content: content,
      user_id: id,
    });
    res.status(200).json(createdBlog);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Route: POST /blogs/edit
// Edit an existing blog post
router.post(`/edit`, idleAuth, async (req, res) => {
  const { title, content, id } = req.body;
  if (!(title || content || id))
    return res.status(400).json({ message: `Please fill out all fields` });

  try {
    const updateBlog = await Blog.update(
      { title: title, content: content },
      { where: { id: id } }
    );

    res.status(200).json(updateBlog);
  } catch (error) {
    res.status(400).json(error);
  }
});

// Route: DELETE /blogs/:id
// Delete a specific blog post
router.delete(`/:id`, idleAuth, async (req, res) => {
  try {
    const deletedBlog = await Blog.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
