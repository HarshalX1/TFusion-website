const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },

  lname: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  usertype: {
    type: String,
    required: true,
  },
});

const User = new mongoose.model("User", usersSchema);

module.exports = User;
