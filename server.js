const express = require("express")
const mongoose = require("mongoose")
const api = require("./api");
const port = process.env.PORT || 5000;

require("dotenv").config();

const app = express();
app.use(express.json())

//CORS handling
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:19006/");
  res.header({
    "Access-Control-Allow-Origin": req.headers.origin,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS",
    "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
  });
  next();
});

app.use(api)

//Start server
app.listen(port, () =>
  console.log("Express server up and running on port:", port)
);

//Connect to database
const options = { useUnifiedTopology: true, useNewUrlParser: true };
mongoose.connect(process.env.MONGO_URI, options, () => {
  console.log("Connected to database");
});

module.exports = app;