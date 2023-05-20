const mongoose = require("mongoose");
const validator = require("validator");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email id already exists"],
    validate: {
      validator: function (value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email Kootreya");
        }
      },
    },
  },
  phone: {
    type: Number,
    min: 10,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
});

// We will create a new collection using our model

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
