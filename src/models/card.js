const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  position: { type: Number, required: true },
  list: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  description: { type: String },
});


cardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Card", cardSchema);
