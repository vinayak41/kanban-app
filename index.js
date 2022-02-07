const express = require("express");
const mongoose = require("mongoose");
const config = require("./src/utils/config");
const { errorHandler, unknownEndpoint } = require("./src/utils/middlewares");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));

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

app.listen(config.PORT, () => {
  console.log(`Server running on port number ${config.PORT}`);
});