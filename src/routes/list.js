const express = require("express");
const { createList } = require("../controllers/list");
const router = express.Router();

router.post("/", createList)

module.exports = router