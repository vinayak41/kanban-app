const express = require("express");
const router = express.Router();
const { createBoard, getBoards } = require("../controllers/board");
const { requireLogin } = require("../utils/middlewares");

router.post("/", requireLogin, createBoard);
router.get("/", requireLogin, getBoards);

module.exports = router;
