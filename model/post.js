const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  name: String,
});

const tempPostSchema = new mongoose.Schema({
  title: String,
  type: String,
  content: String,
  repostFrom: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  images: [imagesSchema],
  date: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comments",
    },
  ],
});

module.exports = mongoose.model("posts", tempPostSchema);
