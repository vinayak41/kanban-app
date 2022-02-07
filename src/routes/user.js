const express = require("express")
const router = express.Router();
const {getUser, createUser, login} = require("../controllers/user");

router.post("/login", login)
router.get("/:id", getUser)
router.post("/register", createUser)

module.exports = router;