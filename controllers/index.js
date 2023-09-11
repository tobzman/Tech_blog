const express = require("express");

const router = express.Router();

// Import route modules
const homeRoutes = require("./api/userRoutes");
const postRoutes = require("./api/postRoutes");
// Import other route modules as needed

// Mount route modules
router.use("/", homeRoutes);
router.use("/posts", postRoutes);
// Mount other route modules as needed

module.exports = router;
