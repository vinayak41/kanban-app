const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  position: {type: Number, required: true},
  cards: [{type: mongoose.Schema.Types.ObjectId, ref: "Card"}],
  board: {type: mongoose.Schema.Types.ObjectId, ref: "Board"}
});

listSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("List", listSchema);
