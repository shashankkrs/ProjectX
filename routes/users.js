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
    const userList = await User.find({}, { password: 0 });
    res.send(userList);
  } catch (error) {
    console.log(error);
  }
});

// To Add Users
route.post("/add", async (req, res) => {
  try {
    let body = {
      ...req.body,
      username: req.body.email,
    };
    let username = req.body.email;
    let password = req.body.password;

    delete body.password;

    if (req.body.name == null || req.body.name == "") {
      res.send({
        status: 406,
        check: "name",
        message: "Name is Required",
      });
      return;
    }

    if (username == null || username == "") {
      res.send({
        status: 406,
        check: "email",
        message: "Email is Required",
      });
      return;
    }

    const foundUser = await User.findOne({ username: req.body.email });
    if (foundUser) {
      res.send({
        status: 409,
        message: "This Email is Already Registered",
      });
    } else {
      if (password == null || password == "") {
        res.send({
          status: 406,
          check: "password",
          message: "Password is Required",
        });
        return;
      }
      const newUser = await new User(body);
      let profile_pic_id = "";
      let ext = "";
      if (req.files) {
        let sampleFile = req.files.photo;
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
        profile_pic_id = newUser._id;
        let uploadPath =
          __dirname + "/../public/images/profilepic/" + profile_pic_id + ext;
        sampleFile.mv(uploadPath);
      }
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      newUser.password = hash;
      newUser.profile_pic = profile_pic_id + ext;
      console.log(newUser);
      newUser.save();

      res.send("NEW USER CREATED");
    }

    //else {
    //
    // var profile_pic_id = uuid();
    // let uploadPath =
    //   __dirname + "/../public/images/profilepic/" + profile_pic_id + ext;
    // mime.getExtension(sampleFile);
    // sampleFile.mv(uploadPath);

    // const newUser = await new User({
    //   username: username,
    //   password: hash,
    //   contact_no: contact_no,
    //   email_id: email_id,
    //   rank: rank,
    //   user_registration_no: user_registration_no,
    //   profile_pic: profile_pic_id + ext,
    // });

    // newUser.save();
    //   res.send("NEW USER CREATED");
    // }
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
    const data = await User.findById(user, { password: 0 });
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

// To Find Users by ID
route.get("/:id", async (req, res) => {
  try {
    const userID = req.params.id;
    const foundUser = await User.findById(userID, { password: 0 });
    res.send(foundUser);
  } catch (error) {
    console.log(error);
  }
});

route.put("/update/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    if (req.files && req.files.photo) {
      sampleFile = req.files.photo;
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
      var profile_pic_id = req.loggedUser._id;
      let uploadPath =
        __dirname + "/../public/images/profilepic/" + profile_pic_id + ext;
      mime.getExtension(sampleFile);
      sampleFile.mv(uploadPath);
      let newBody = {
        ...req.body,
        profile_pic: profile_pic_id + ext,
        username: req.body.email,
      };
      const foundUser = await User.findByIdAndUpdate(userId, newBody);
      res.send(foundUser);
    } else {
      let newBody = {
        ...req.body,
        username: req.body.email,
      };
      const foundUser = await User.findByIdAndUpdate(userId, newBody);
      res.send(foundUser);
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = route;
