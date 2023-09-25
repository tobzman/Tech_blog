const router = require("express").Router();
const { User, Blog } = require("../../models");

// Route: GET /users
// Get all users with associated blogs
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      subQuery: false,
      include: [{ model: Blog }],
    });

    const data = userData.map((user) => {
      return user.get({ plain: true });
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Route: POST /users
// Create a new user
router.post("/", async (req, res) => {
  try {
    const dbUserData = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      res.status(200).redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Route: POST /users/login
// Login
router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password. Please try again!" });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.idle = false;
      req.session.username = req.body.username;
      res.status(200).redirect("/");
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

// Route: POST /users/logout
// Logout
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Route: POST /users/idle
// Set user session to idle
router.post("/idle", (req, res) => {
  if (req.session.idle) return;
  req.session.save(() => {
    req.session.idle = true;
    res.redirect("back");
  });
});

// Route: GET /users/idle
// Check if the user session is idle
router.get("/idle", (req, res) => {
  if (req.session.idle) {
    res.status(200).json({ message: "relogin" });
  }
  res.status(200).json({ message: "Allowed to post" });
});

module.exports = router;
