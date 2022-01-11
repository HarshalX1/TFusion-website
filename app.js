const { urlencoded } = require("express");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/connect");
const User = require("./models/user");
const bcrypt = require("bcrypt");
const port = process.env.PORT || 3000;

// const path = require("path");
// const publicDirectory = path.join(__dirname, "public");
// app.use(express.static(publicDirectory));

app.use(express.json());
app.use(urlencoded({ extended: false }));

app.use(express.static("public"));

app.set("view engine", "ejs");

app.listen(port, () => {
  console.log("Hello World!");
});

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const registerUser = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hashedPassword,
      usertype: req.body.usertype,
    });

    const registered = await registerUser.save();
    res.status(201).render("login");
    console.log("Registration Successful");
  } catch (error) {
    res.status(400).send(error);
    console.log(error);
    console.log("Registration Error!");
  }
});

app.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email: email });

    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        res.render("index");
      } else {
        res.status(401).send("Invalid Email/Password");
      }
    } else {
      res.send("User not found");
    }
  } catch (error) {
    console.log(error);
  }
});
