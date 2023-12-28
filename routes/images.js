const app = require("express").Router();
const fs = require("fs");
const { get } = require("http");
const path = require("path");

const getPath = (folder, imageName) => {
  return path.join(__dirname, "..", "public/images", folder, imageName);
};

const getPathWithNumber = (folder, imageName, number) => {
  return path.join(__dirname, "..", "public/images", folder, imageName, number);
};

app.get("/profilepic/:imageName", (req, res) => {
  if (!fs.existsSync(getPath("profilepic", req.params.imageName)))
    res.status(404).send();
  else res.sendFile(getPath("profilepic", req.params.imageName));
});

app.get("/temp_post_images/:imageName", (req, res) => {
  let imageName = req.params.imageName;
  let postID = imageName.split("_")[0];
  let imageNumber = imageName.split("_")[1];
  if (!fs.existsSync(getPath("temp_post_images", postID, imageNumber)))
    res.sendFile(getPath("temp_post_images", "default_post_image.png"));
  else res.sendFile(getPathWithNumber("temp_post_images", postID, imageNumber));
});

app.get("/post_images/:imageName", (req, res) => {
  let imageName = req.params.imageName;
  let postID = imageName.split("_")[0];
  let imageNumber = imageName.split("_")[1];
  if (fs.existsSync(getPath("post_images", postID, imageNumber))) {
    res.sendFile(getPathWithNumber("post_images", postID, imageNumber));
  } else res.status(404).send();
});

app.get("/vehicle_images/:imageName", (req, res) => {
  if (!fs.existsSync(getPath("vehicle_images", req.params.imageName))) {
    res.status(404).send();
  } else res.sendFile(getPath("vehicle_images", req.params.imageName));
});

module.exports = app;
