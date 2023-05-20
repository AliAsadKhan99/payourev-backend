const express = require("express");
const bcrypt = require("bcrypt");
const Student = require("../models/students");
const Signup = require("../models/signup");
const router = new express.Router();

router.post("/students", async (req, res, next) => {
  try {
    const user = new Student(req.body);
    const createUser = await user.save();
    res.status(201).send(createUser);
  } catch (e) {
    res.status(400).send(e);
  }
});

// read the data of registered students
router.get("/students", async (req, res, next) => {
  try {
    const studentsData = await Student.find();
    res.send(studentsData);
  } catch (e) {
    res.send(e);
  }
});

// get individual student data using id
router.get("/students/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findById({ _id: _id });
    if (!studentData) {
      return res.status(404).send();
    } else {
      res.send(studentData);
    }
  } catch (e) {
    res.status(500).send(e);
  }
});

// delete the students by id
router.delete("/students/:id", async (req, res, next) => {
  try {
    const _id = req.params.id;
    const deleteStudent = await Student.findByIdAndDelete({ _id: _id });
    if (!_id) {
      return res.status(404).send();
    }

    res.send(deleteStudent);
  } catch (e) {
    res.status(500).send(e);
  }
});

// update the students by id
router.patch("/students/:id", async (req, res) => {
  try {
    const _id = req.params.id;
    const studentData = await Student.findByIdAndUpdate(
      { _id: _id },
      req.body,
      { new: true }
    );
    res.send(studentData);
  } catch (e) {
    res.status(404).send(updateStudents);
  }
});

router.get("/signup", (req, res, next) => {});

router.post("/signup", async (req, res, next) => {
  try {
    const password = req.body.password;
    const confirmpassword = req.body.confirmpassword;

    if (password === confirmpassword) {
      const signupData = new Signup({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
        passport: req.body.passport,
        location: req.body.location,
      });
      const createUser = await signupData.save();
      res.status(201).send(JSON.stringify(createUser));
    } else {
      res.send("THE PASSWORDS ARE NOT MATCHING");
    }
  } catch (err) {
    res.status(400).send(err);
  }
});

// login check
router.post("/login", async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const userEmail = await Signup.findOne({ email: email });

    const isMatch = await bcrypt.compare(password, userEmail.password);

    if (isMatch) {
      res.send(userEmail.username);
      console.log(userEmail);
    } else {
      res.send("Passwords are not matching");
    }
  } catch (error) {
    res.status(400).send("Invalid Email");
  }
});

module.exports = router;
