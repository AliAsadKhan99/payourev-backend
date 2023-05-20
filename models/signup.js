const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const signupScehma = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already exists"],
    validate: {
      validator: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email");
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
  },
  confirmpassword: {
    type: String,
  },
  passport: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  dob: {
    type: String,
  },
});

signupScehma.pre("save", async function (next) {
  if (this.isModified("password")) {
    // console.log(`Before hashing actual password was: ${this.password}`);
    this.password = await bcrypt.hash(this.password, 10);
    // console.log(`After hashing my password was: ${this.password}`);
    this.confirmpassword = undefined;
  }
  next();
});

const Signup = new mongoose.model("Signup", signupScehma);

module.exports = Signup;
