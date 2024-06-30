const mongoose = require("mongoose");

// Defining the schema for the Users model
const Users = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true,
  },
  profile_image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  login_count: {
    type: Number,
    required: true,
    default: 0,
  },
});

// Creating the Users model from the schema
const Users_Schema = mongoose.model("users", Users);

// Exporting the Users model
module.exports = { Users_Schema };
