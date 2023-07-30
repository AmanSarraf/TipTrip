const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");

const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const config = require("./utils/config");

mongoose.set("strictQuery", false);
mongoose.set("bufferTimeoutMS", 30000);

logger.info("connecting to", config.MONGODB_URI);

// Connecting to data base
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(cors());
app.use(express.static("build"));
app.use(express.json());

// Use controllers router here

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
