const mongoose = require("mongoose");

const siteSchema = new mongoose.Schema({
  name: String,
  url: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Site", siteSchema);
