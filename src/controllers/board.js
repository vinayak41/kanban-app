const { isValidObjectId } = require("mongoose");
const Board = require("../models/board");
const ObjectId = require("mongoose").Types.ObjectId;

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
    console.log(error);
  }
};

const getBoard = async (req, res, next) => {
  try {
    if (!isValidObjectId(req.params.boardId)) {
      return res.status(400).json({ error: "invalid id" });
    }
    const board = await Board.findById(ObjectId(req.params.boardId)).populate({
      path: "lists",
      populate: { path: "cards" },
    });
    if (board) {
      return res.json(board);
    }
    return res.status(400).json({ error: "board not found" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBoard, getBoards, getBoard };
