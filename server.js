const express = require("express")
const mongoose = require("mongoose")
const port = process.env.PORT || 5000;

require("dotenv").config();


const app = express();

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