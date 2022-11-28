const mongoose = require("mongoose");

const Register = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    role: {
      type: String,
      default: "user"
    },
    registeredTime : { 
      type : Date, 
      default: Date.now 
    },
    loggedOut : { 
      type : String, 
      default: "Exist"
    }
  },
  { collection: "register-user" }
);

const model = mongoose.model('RegsiterData', Register);

module.exports = model;
