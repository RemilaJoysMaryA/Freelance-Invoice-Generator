const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();


const clientRoutes = require("./routes/clients");
const invoiceRoutes = require("./routes/invoices");

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URI = process.env.MONGO_URI;

// MongoDB connection
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("error", (err) => console.error("MongoDB connection error:", err));
mongoose.connection.once("open", () => console.log("✅ MongoDB connected"));

// Routes
app.use("/api/clients", clientRoutes);
app.use("/api/invoices", invoiceRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
