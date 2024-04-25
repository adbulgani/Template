const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  contact: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: ["SDE", "AGM", "DE", "JTO", "JE"],
  },
  BA: {
    type: String,
    required: true,
    enum: [
      "ATP",
      "CDP",
      "CTR",
      "EG",
      "GTR",
      "KNL",
      "KRI",
      "NLR",
      "PKM",
      "SKM",
      "VM",
      "VZM",
      "WG",
    ],
  },
  HRMS: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
