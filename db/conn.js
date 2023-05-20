const mongoose = require("mongoose");
const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection is successful with Mongodb");
  })
  .catch(() => {
    console.log("No Connection was established wtih MongoDb");
  });
