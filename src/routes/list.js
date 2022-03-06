const express = require("express");
const { createList, updateList } = require("../controllers/list");
const { requireLogin } = require("../utils/middlewares");
const router = express.Router();

router.post("/", requireLogin, createList);
router.patch("/:listId", requireLogin, updateList)

module.exports = router