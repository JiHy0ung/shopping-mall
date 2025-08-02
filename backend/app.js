const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const indexRouter = require("./routes/index");
const app = express();
require("dotenv").config();

app.use(cors());
// ???
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api", indexRouter); // /api로 시작하는 주소는 indexRouter로 보냄.

// const mongoURI = process.env.LOCAL_DB_ADDRESS;
const mongoURI = process.env.MONGODB_URI_PROD;

console.log("mongoUri", mongoURI);

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => console.log("mongoose connected"))
  .catch((err) => console.error("DB connection Failed", err));

app.listen(process.env.PORT || 5555, () => {
  console.log("server on");
});
