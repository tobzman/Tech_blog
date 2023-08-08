const express = require("express");
const router = express.Router();
const db = require("../models");

// Route: POST /commands
// Create a new command
router.post("/commands", async (req, res) => {
  try {
    const newCommand = await db.Command.create({
      ...req.body,
    });

    res.status(201).json(newCommand);
  } catch (err) {
    console.error("Error creating command:", err);
    res.status(500).json({ message: "Error creating command" });
  }
});

// Route: GET /commands/:id
// Get details of a specific command
router.get("/commands/:id", async (req, res) => {
  try {
    const commandId = req.params.id;
    const command = await db.Command.findByPk(commandId);

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    res.json(command);
  } catch (err) {
    console.error("Error retrieving command:", err);
    res.status(500).json({ message: "Error retrieving command" });
  }
});

// Route: PUT /commands/:id
// Update a command
router.put("/commands/:id", async (req, res) => {
  try {
    const commandId = req.params.id;
    const updatedData = req.body;

    const command = await db.Command.findByPk(commandId);

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    await command.update(updatedData);

    res.json({ message: "Command updated successfully" });
  } catch (err) {
    console.error("Error updating command:", err);
    res.status(500).json({ message: "Error updating command" });
  }
});

// Route: DELETE /commands/:id
// Delete a command
router.delete("/commands/:id", async (req, res) => {
  try {
    const commandId = req.params.id;

    const command = await db.Command.findByPk(commandId);

    if (!command) {
      return res.status(404).json({ message: "Command not found" });
    }

    await command.destroy();

    res.json({ message: "Command deleted successfully" });
  } catch (err) {
    console.error("Error deleting command:", err);
    res.status(500).json({ message: "Error deleting command" });
  }
});

module.exports = router;
