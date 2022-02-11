const mongoose = require("mongoose");

const boardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  background: {
    type: Object,
  },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: "List" }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Board", boardSchema);
