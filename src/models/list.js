const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  index: {type: Number, required: true},
  cards: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}],
});

module.exports = mongoose.model("List", listSchema);