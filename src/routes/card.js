const express = require("express");
const { createCard } = require("../controllers/card");
const { requireLogin } = require("../utils/middlewares");
const router = express.Router();

router.post("/", requireLogin, createCard);

module.exports = router;