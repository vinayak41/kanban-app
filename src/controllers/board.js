const Board = require("../models/board");

const createBoard = async (req, res, next) => {
  try {
    const newBoard = new Board({
      title: req.body.title,
      background: req.body.background,
      createdBy: req.userId,
    });
    const savedBoard = await newBoard.save();
    return res.status(200).json(savedBoard);
  } catch (error) {
    next(error);
  }
};

const getBoards = async (req, res, next) => {
  try {
    const boards = await Board.find({});
    return res.status(200).json(boards);
  } catch (error) {
    console.log(error)
  }
}

module.exports = { createBoard, getBoards };
