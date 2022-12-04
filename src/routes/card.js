const express = require("express");
const { createCard, updateCard, getCard } = require("../controllers/card");
const { requireLogin } = require("../utils/middlewares");
const router = express.Router();

router.post("/", requireLogin, createCard);
router.get("/:cardId", requireLogin, getCard);
router.patch("/:cardId", requireLogin, updateCard);

module.exports = router;
