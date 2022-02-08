const User = require("../models/user");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = require("../utils/config");
const jwt = require("jsonwebtoken");
const { usernameRegExr } = require("../utils/helper");

const saltRounds = 10;

const getUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const createUser = async (req, res, next) => {
  const { username, password, email, fullname } = req.body;
  if (!usernameRegExr.test(username)) {
    return res.status(401).json({ message: "Invalid username" });
  }
  const user = await User.findOne({ username });
  if (user) {
    res.status(403).json({ message: "Unsername already in use" });
  } else if (await User.findOne({ email })) {
    res.status(403).json({ message: "Email already in use" });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const newUser = new User({
        username,
        password: hashedPassword,
        fullname,
        email,
      });
      const savedUser = await newUser.save();
      res.json(savedUser);
    } catch (error) {
      next(error);
    }
  }
};

const login = async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log({usernameOrEmail, password})
  try {
    const user = await User.findOne({
      $or: [
        {
          email: usernameOrEmail,
        },
        {
          username: usernameOrEmail,
        },
      ],
    });
    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch)
        return res.status(400).json({ message: "Incorrect password" });
      const token = await jwt.sign(
        { userId: user._id, username: user.username },
        JWT_SECRET
      );
      return res
        .status(200)
        .json({ token, message: "Signin successful", user });
    } else {
      return res.status(400).json({ message: "User does not exist" });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getUser, createUser, login };
