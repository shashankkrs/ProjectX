const express = require("express");
const User = require("../model/user");
const route = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const fileUpload = require("express-fileupload");
const { v4: uuid } = require("uuid");
const mime = require("mime");
const path = require("path");

route.use(fileUpload());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// To Find Users
route.get("/", async (req, res) => {
  try {
    // console.log(users);
    const userList = await User.find();
    res.send(userList);
  } catch (error) {
    console.log(error);
  }
});

// To Add Users
route.post("/add", async (req, res) => {
  try {
    console.log(req.body);
    const {
      username,
      password,
      contact_no,
      email_id,
      rank,
      user_registration_no,
    } = req.body;
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      res.send("USERNAME ALREADY TAKEN");
    } else {
      let sampleFile = req.files.photo;
      var ext;
      switch (sampleFile.mimetype) {
        case "image/gif":
          ext = ".gif";
          break;
        case "image/jpeg":
          ext = ".jpeg";
          break;
        case "image/png":
          ext = ".png";
          break;
        default:
          ext = "";
          break;
      }
      var profile_pic_id = uuid();
      let uploadPath =
        __dirname + "/../public/images/profilepic/" + profile_pic_id + ext;
      mime.getExtension(sampleFile);
      sampleFile.mv(uploadPath);
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await new User({
        username: username,
        password: hash,
        contact_no: contact_no,
        email_id: email_id,
        rank: rank,
        user_registration_no: user_registration_no,
        profile_pic: profile_pic_id + ext,
      });
      newUser.save();
      res.send("NEW USER CREATED");
    }
  } catch (error) {
    console.log(error);
  }
});

route.post("/change", async (req, res) => {
  try {
    const {
      username,
      password,
      contact_no,
      email_id,
      rank,
      user_registration_no,
    } = req.body;
  } catch (error) {
    console.log(error);
  }
});

route.get("/get_user_details", async (req, res) => {
  try {
    var decoded = await jwt.verify(
      req.cookies.token,
      process.env.JWT_SIGNATURE
    );
    const user = decoded.userID;
    const data = await User.findById(user);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// To Find Users by ID
route.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const foundUser = await User.findById(userID);
    res.send(foundUser);
  } catch (error) {
    console.log(error);
  }
});

route.put("/update/:id", async (req, res) => {
  try {
    console.log("ABD");
    const userId = req.params.id;
    const upd_in_name = req.body.username;
    const upd_in_role = req.body.role;
    const upd_in_rank = req.body.rank;
    const upd_in_phone_no = req.body.contact_no;
    const upd_in_email_id = req.body.email_id;

    console.log(userId);
    console.log(req);
    const foundUser = await User.findByIdAndUpdate(userId, {
      username: upd_in_name,
      role: upd_in_role,
      rank: upd_in_rank,
      contact_no: upd_in_phone_no,
      email_id: upd_in_email_id,
    });
    res.send(foundUser);
    console.log(foundUser);
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
