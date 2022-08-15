const cors = require("cors");
const express = require("express");
const logger = require("morgan");

require("dotenv").config();

const routes = require("./routes/api");

const app = express();

const formatLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/api/heroes", routes.heroes);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json(message);
});

module.exports = app;
