const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
require("dotenv").config();

app.use(cors());
// ???
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const mongoURI = process.env.LOCAL_DB_ADDRESS;

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.error("DB connection Failed", err));

app.listen(process.env.PORT || 5555, () => {
  console.log("server on");
});
