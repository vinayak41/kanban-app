const express = require("express");
const router = express.Router();
const { createBoard, getBoards, getBoard } = require("../controllers/board");
const { requireLogin } = require("../utils/middlewares");

router.post("/", requireLogin, createBoard);
router.get("/:boardId", requireLogin, getBoard);
router.get("/", requireLogin, getBoards);

module.exports = router;
