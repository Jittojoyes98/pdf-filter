const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const path = require("path");

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server has started on port ${PORT}`)
);

app.get("/", (req, res) => {
  res.send("Hiii");
});
