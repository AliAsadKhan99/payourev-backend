const mongoose = require("mongoose");
const validator = require("validator");

const loginScehma = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already exists"],
  },
  password: {
    type: String,
    required: true,
  },
});

const Login = new mongoose.model("Login", loginScehma);

module.exports = Login;
