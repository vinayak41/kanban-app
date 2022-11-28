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

boardSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Board", boardSchema);
