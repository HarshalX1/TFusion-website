const express = require("express");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/Registration")
  .then(() => {
    console.log("Database Connected!");
  })
  .catch((e) => {
    console.log("Database Connection Error!");
  });
