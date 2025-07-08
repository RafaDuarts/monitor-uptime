const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  name: String,
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  lastStatus: {
    type: String,
    enum: ["UP", "DOWN"],
    default: "UP"
  }
});

module.exports = mongoose.model("Site", siteSchema);
