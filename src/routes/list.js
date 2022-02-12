const express = require("express");
const { createList } = require("../controllers/list");
const { requireLogin } = require("../utils/middlewares");
const router = express.Router();

router.post("/", requireLogin, createList)

module.exports = router