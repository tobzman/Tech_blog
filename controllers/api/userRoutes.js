const router = require("express").Router();
const { User, Blog } = require("../../models");
const withAuth = require('../../utils/auth'); // Adjust the path as needed

router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll({
      include: [{ model: Blog }],
    });

    const data = userData.map((user) => {
      return user.get({ plain: true });
    });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

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
      res.status(201).redirect("/");
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(403).json({ message: "You are not logged in" }); // Use 403 Forbidden for unauthorized access
  }
});

router.post("/idle", (req, res) => {
  if (req.session.idle) return;
  req.session.save(() => {
    req.session.idle = true;
    res.status(200).json({ message: "Session is now idle" });
  });
});

router.get("/idle", (req, res) => {
  if (req.session.idle) {
    res.status(401).json({ message: "Session is idle. Please relogin" }); // Use 401 Unauthorized for idle sessions
  } else {
    res.status(200).json({ message: "Session is active" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const existingUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.username = req.body.username;
      res.status(201).redirect("/");
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findOne({
      where: {
        username: req.session.username,
      },
      include: [{ model: Blog }],
    });

    if (!userData) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const user = userData.get({ plain: true });

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.put("/profile", withAuth, async (req, res) => {
  try {
    const updatedUserData = await User.update(
      {
        email: req.body.email,
        // Add other fields you want to update
      },
      {
        where: {
          username: req.session.username,
        },
      }
    );

    if (updatedUserData[0] === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User profile updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
