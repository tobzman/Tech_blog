const express = require("express");
const router = express.Router();
const db = require("../models");
const withAuth = require("../utils/auth");

// Route: GET /
// Homepage displaying existing blog posts
router.get("/", async (req, res) => {
  try {
    const postData = await db.Post.findAll({
      include: [{ model: db.User }, { model: db.Comment }],
      order: [["createdAt", "DESC"]],
    });

    res.render("homepage", { posts: postData, user: req.user });
  } catch (err) {
    console.error("Error getting posts:", err);
    res.status(500).json({ message: "Error getting posts" });
  }
});

// Route: GET /login
// Display the login page
router.get("/login", (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard"); // Redirect to dashboard if user is already logged in
  }
  res.render("login");
});

// Route: GET /signup
// Display the sign-up page
router.get("/signup", (req, res) => {
  if (req.user) {
    return res.redirect("/dashboard"); // Redirect to dashboard if user is already logged in
  }
  res.render("signup");
});

// Route: GET /dashboard
// User dashboard displaying their blog posts
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const userPosts = await db.Post.findAll({
      where: { UserId: req.user.id },
      order: [["createdAt", "DESC"]],
    });

    res.render("dashboard", { userPosts, user: req.user });
  } catch (err) {
    console.error("Error getting user posts:", err);
    res.status(500).json({ message: "Error getting user posts" });
  }
});

// ... Other authentication-related routes ...

module.exports = router;
