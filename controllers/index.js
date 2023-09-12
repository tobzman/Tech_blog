const express = require("express");

const router = express.Router();

// Import route modules
const homeRoutes = require("./homeRoutes");
const apiRoutes = require("./api");
// Import other route modules as needed

// Mount route modules
router.use("/", homeRoutes);
router.use("/api", apiRoutes);
// Mount other route modules as needed

module.exports = router;
