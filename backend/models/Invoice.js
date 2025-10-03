const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema({
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
  items: [
    {
      description: { type: String, required: true },
      qty: { type: Number, required: true },
      rate: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ["paid", "unpaid"], default: "unpaid" },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Invoice", invoiceSchema);
