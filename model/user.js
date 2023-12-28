const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  registration_no: String,
  name: String,
  username: String,
  password: String,
  phone: Number,
  email: String,
  rank: String,
  role: {
    type: String,
    enum: ["admin", "viewer", "officer", "driver"],
    default: "viewer",
  },
  designation: String,
  profile_pic: String,
  driver: {
    type: Boolean,
    default: false,
  },
  license_no: String,
});

module.exports = mongoose.model("users", userSchema);
