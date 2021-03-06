const List = require("../models/list");
const Board = require("../models/board");
const mongoose = require("mongoose");

const createList = async (req, res, next) => {
  try {
    const newList = new List({
      title: req.body.title,
      position: req.body.position,
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

const updateList = async (req, res, next) => {
  const listId = req.params.listId;
  const { position, title } = req.body;
  try {
    let newList;
    if (position) {
      newList = await List.findByIdAndUpdate(
        listId,
        { $set: { position } },
        { new: true }
      );
    }

    if (title) {
      newList = await List.findByIdAndUpdate(
        listId,
        { $set: { title } },
        { new: true }
      );
    }
    res.json({ newList });
  } catch (error) {
    next(error);
  }
};

module.exports = { createList, updateList };
