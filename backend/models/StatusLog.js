const mongoose = require("mongoose");

const statusLogSchema = new mongoose.Schema({
  siteId: { type: mongoose.Schema.Types.ObjectId, ref: "Site" },
  status: { type: String, enum: ["UP", "DOWN"], required: true },
  responseTime: Number, // em ms
  checkedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StatusLog", statusLogSchema);
