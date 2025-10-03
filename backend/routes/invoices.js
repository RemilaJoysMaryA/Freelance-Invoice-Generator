const express = require("express");
const Invoice = require("../models/Invoice");
const router = express.Router();

// CREATE Invoice
router.post("/", async (req, res) => {
  try {
    const invoice = new Invoice(req.body);
    await invoice.save();
    res.status(201).json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create invoice", error: err });
  }
});

// READ all invoices
router.get("/", async (req, res) => {
  try {
    const invoices = await Invoice.find().populate("clientId", "name email"); // populate name & email
    res.json(invoices);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// READ single invoice
router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("clientId");
    res.json(invoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Invoice not found", error: err });
  }
});

// UPDATE invoice
router.put("/:id", async (req, res) => {
  try {
    const updated = await Invoice.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update invoice", error: err });
  }
});

// DELETE invoice
router.delete("/:id", async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id);
    res.json({ message: "Invoice deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete invoice", error: err });
  }
});

module.exports = router;
