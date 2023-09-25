const router = require("express").Router();
const { Comment, User, Blog } = require(`../../models`);
const withAuth = require("../../utils/auth");

// Route: GET /comments
// Get all comments with associated user and blog information
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      include: [{ model: User, attributes: ["username"] }, { model: Blog }],
    });

    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route: POST /comments
// Create a new comment
router.post("/", withAuth, async (req, res) => {
  const { comment, id } = req.body;
  if (!(id || comment)) {
    return res.status(400).json({ message: "Error with comment" });
  }

  try {
    const userData = await User.findOne({
      where: { username: req.session.username },
      attributes: ["id"],
    });

    const { id: userId } = userData.get({ plain: true });

    const createComment = await Comment.create({
      comment: comment,
      user_id: userId,
      blog_id: id,
    });

    res.status(200).json(createComment);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
