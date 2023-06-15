const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  name: String,
});

const tempPostSchema = new mongoose.Schema({
  title: String,
  type: String,
  content: String,
  createdBy: String,
  repostFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  images: [imagesSchema],
});

module.exports = mongoose.model("temp_posts", tempPostSchema);
