const jwt = require("jsonwebtoken");

//handle unknown endpoint
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

// error handler
const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(409).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }
  next(error);
};

// require login
const requireLogin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(400).json({ error: "Signin required" });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(400).json({ error: "Invalid token" });
    if (decoded) {
      req.userId = decoded.userId;
      next();
    }
  });
};

module.exports = { errorHandler, unknownEndpoint, requireLogin };
