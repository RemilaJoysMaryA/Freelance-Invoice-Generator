const express = require("express");
const Client = require("../models/Client"); // must match filename exactly
const router = express.Router();

// CREATE
router.post("/", async (req, res) => {
  try {
    const client = new Client(req.body);
    await client.save();
    res.status(201).json(client);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add client" });
  }
});

// READ
router.get("/", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch clients" });
  }
});

// UPDATE
router.put("/:id", async (req, res) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update client" });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.json({ message: "Client deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete client" });
  }
});

module.exports = router;
