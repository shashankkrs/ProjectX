const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  name: String,
});

const tempPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdBy: String,
  images: [imagesSchema],
});

module.exports = mongoose.model("temp_posts", tempPostSchema);
