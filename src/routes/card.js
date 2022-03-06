const express = require("express");
const { createCard, updateCard } = require("../controllers/card");
const { requireLogin } = require("../utils/middlewares");
const router = express.Router();

router.post("/", requireLogin, createCard);
router.patch("/:cardId", requireLogin, updateCard);

module.exports = router;