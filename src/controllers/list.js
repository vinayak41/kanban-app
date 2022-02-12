const List = require("../models/list");
const Board = require("../models/board");
const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;

const createList = async (req, res, next) => {
  try {
    const newList = new List({
      title: req.body.title,
      index: req.body.index,
      board: req.body.boardId,
      createdBy: req.userId,
    });

    const savedList = await newList.save();
    await Board.findByIdAndUpdate(savedList.board, {
      $push: { lists: savedList._id },
    });
    return res.json(savedList);
  } catch (error) {
    next(error);
  }
};

module.exports = { createList };
