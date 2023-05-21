const express = require("express");
const app = express();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config({ path: "./config.env" });
const studentRouter = require("./router/students");
require("./db/conn");
const Student = require("./models/students.js");
const Signup = require("./models/signup");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(studentRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// const createToken = async () => {
//   jwt.sign({}, "");
// };

// cerateToken();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
