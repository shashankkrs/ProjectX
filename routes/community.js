const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const TempPosts = require("../model/temp_post");
const fileUpload = require("express-fileupload");
const router = require("express").Router();
const mime = require("mime");
const path = require("path");
const fs = require("fs");
const Post = require("../model/post");
const Comments = require("../model/comments");

const fsExtra = require("fs-extra");

router.use(
  fileUpload({
    createParentPath: true,
  })
);

router.get("/posts", async (req, res) => {
  const posts = await Post.find({}).sort({ _id: -1 }).populate("createdBy");
  res.send(posts);
});

//Route For url: "http://localhost:3000/community/posts/like/" + id,
router.post("/posts/like/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    const userID = req.loggedUser._id;
    const updatePost = await Post.findOneAndUpdate(
      { _id: postID },
      { $push: { likes: userID } }
    );
    if (updatePost) {
      res.send({ status: 200, message: "Liked" });
    } else {
      res.send({ status: 400, message: "Couldn't like the post" });
    }
  } catch (error) {
    console.log(id);
  }
});

//Route for  url: "http://localhost:3000/community/posts/post/comment/" + id,
router.post("/posts/post/comment/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    const userID = req.loggedUser._id;
    const comment = req.body.comment;
    const newComment = new Comments({
      comment: comment,
      createdBy: userID,
      date: Date.now(),
    });
    newComment.save();
    const updatePost = await Post.findOneAndUpdate(
      { _id: postID },
      { $push: { comments: newComment._id } }
    );

    const post = await Post.findOne({ _id: postID })
      .populate("comments")
      .populate("createdBy")
      .populate("likes")
      .populate({
        path: "comments",
        populate: {
          path: "createdBy",
          model: "users",
        },
      });

    if (updatePost) {
      res.send({
        status: 200,
        message: "Commented",
        post: post,
      });
    } else {
      res.send({ status: 400, message: "Couldn't comment the post" });
    }
  } catch (error) {
    console.log(id);
  }
});

//For Unlike
router.post("/posts/unlike/:id", async (req, res) => {
  try {
    const postID = req.params.id;
    const userID = req.loggedUser._id;
    const updatePost = await Post.findOneAndUpdate(
      { _id: postID },
      { $pull: { likes: userID } }
    );
    if (updatePost) {
      res.send({ status: 200, message: "Unliked" });
    } else {
      res.send({ status: 400, message: "Couldn't unlike the post" });
    }
  } catch (error) {
    console.log(id);
  }
});

router.post("/posts/new_temp_post", async (req, res) => {
  const tempPost = await TempPosts.findOne({ createdBy: req.loggedUser._id });
  if (tempPost) {
    res.send(tempPost);
  } else {
    const newTempPost = new TempPosts({
      createdBy: req.loggedUser._id,
    });
    newTempPost.save();
    res.send(newTempPost);
  }
});

router.post("/posts/temp_post/save_changes", async (req, res) => {
  const postID = req.body.postid;
  const content = req.body.data;
  const title = req.body.title;
  const tempPost = await TempPosts.findOne({ _id: postID });
  if (tempPost) {
    tempPost.content = content;
    tempPost.title = title;
    tempPost.save();
  }
  res.send({
    status: 200,
    message: "Changes saved successfully",
  });
});

router.get("/posts/post/:id", async (req, res) => {
  const postID = req.params.id;
  const post = await Post.findOne({ _id: postID })
    .populate("createdBy")
    .populate("comments")
    .populate({
      path: "comments",
      populate: {
        path: "createdBy",
        model: "users",
      },
    });
  if (!post) {
    res.send({
      status: 400,
      message: "Post not found",
    });
  }
  res.send({
    status: 200,
    post: post,
  });
});

router.post("/posts/post", async (req, res) => {
  const postID = req.body.postid;
  const images = req.body.images;
  console.log(images);
  const tempPost = await TempPosts.findOne({ _id: postID });
  if (tempPost) {
    const newPost = new Post({
      content: tempPost.content.replace(/temp_post_images/g, "post_images"),
      createdBy: tempPost.createdBy,
      images: tempPost.images.filter((image) => {
        return images.includes(image.name);
      }),
    });
    console.log(newPost.content);
    console.log(newPost._id.toString());
    newPost.content = newPost.content.replace(
      new RegExp(`${tempPost._id.toString()}`, "g"),
      newPost._id.toString()
    );
    console.log(
      newPost.content.replace(
        `${tempPost._id.toString()}/g`,
        newPost._id.toString()
      )
    );
    newPost.save();
    tempPost.remove();
    console.log(images);
    fs.mkdirSync(
      path.join(
        __dirname,
        "..",
        "public/images/post_images/",
        newPost._id.toString()
      ),
      { recursive: true }
    );
    images.forEach((image) => {
      fs.rename(
        path.join(
          __dirname,
          "..",
          "public/images/temp_post_images/",
          postID,
          image
        ),
        path.join(
          __dirname,
          "..",
          "public/images/post_images/",
          newPost._id.toString(),
          image
        ),
        (err) => {
          if (err) {
            console.log(err);
            return;
          }
        }
      );
    });
    await fsExtra.remove(
      path.join(__dirname, "..", "public/images/temp_post_images/", postID)
    );
  }
  res.send({
    status: 200,
    message: "Post created successfully",
  });
});

router.post("/posts/temp_post/upload_image", async (req, res) => {
  const postID = req.body.postid;
  const image = req.files.image;
  const newFileName = `${new ObjectId()}.${mime.getExtension(image.mimetype)}`;
  image.mv(
    path.join(
      __dirname,
      "..",
      "public/images/temp_post_images/",
      postID,
      newFileName
    ),
    async (err) => {
      if (err) {
        console.log(err);
        return;
      }
    }
  );
  const tempPost = await TempPosts.findOne({ _id: postID });
  if (tempPost) {
    tempPost.images.push({ name: newFileName });
    tempPost.save();
  }

  res.send({
    image: newFileName,
  });
});

module.exports = router;
