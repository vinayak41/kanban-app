const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/utils/config");
const { errorHandler, unknownEndpoint } = require("./src/utils/middlewares");
const cors = require("cors");
const app = express();
const usersRouter = require("./src/routes/user");
const boardRouter = require("./src/routes/board");
const listRouter = require("./src/routes/list");
const cardRouter = require("./src/routes/card");

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/api/users", usersRouter);
app.use("/api/boards", boardRouter);
app.use("/api/lists", listRouter);
app.use("/api/cards", cardRouter);

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(config.PORT, () => {
  console.log(`Server running on port number ${config.PORT}`);
});
