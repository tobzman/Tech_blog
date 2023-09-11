const router = require("express").Router();
const { Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Route: GET /posts
// Get all blog posts with comments
router.get("/", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [{ model: Comment }],
    });

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route: PUT /posts/:id
// Update a specific blog post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const newData = {
      title: req.body.title,
      body: req.body.body,
    };

    const updatedPost = await Post.update(newData, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Route: GET /posts/:id
// Get details of a specific blog post with comments
router.get("/:id", withAuth, async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Post.findByPk(postId, {
      include: [{ model: Comment }],
    });

    if (!postData) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
