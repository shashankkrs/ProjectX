//Required Packages
require("./conn/mongo");
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");
const cors = require("cors");

//Creating Express App
const app = express();
const port = process.env.PORT || 3000;
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.use(async (socket, next) => {
  try {
    let token;
    if (socket.handshake.query.token) {
      token = socket.handshake.query.token;
    } else {
      token = socket.handshake.headers.cookie.split("=")[1];
    }
    var decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
    let foundUser = await User.findOne({ _id: decoded.userID });
    if (foundUser) {
      socket.user = foundUser;
      next();
    } else {
      socket.close();
    }
  } catch (error) {}
});

//Using Important Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.static("public"));

//Importing User Model
const User = require("./model/user");

//Importing Routes
const vehicleRoute = require("./routes/vehicles");
const JobCardRoute = require("./routes/job_card");
const driverRoute = require("./routes/drivers");
const dutyLogRoute = require("./routes/duty_log");
const defectMemoRoute = require("./routes/defectmemos");
const userRoute = require("./routes/users");
const oilstockRegisterRoute = require("./routes/oilstockregister");
const inventoryRoute = require("./routes/inventory.js");
const oilbalanceRoute = require("./routes/oilbalance");
const inspectionRoute = require("./routes/inspection");
const locationRoute = require("./routes/location");
const receiveVoucherRoute = require("./model/receivevoucher");

//Defining Functions
const isLoggedIn = async (req, res, next) => {
  try {
    var token = req.cookies.token;
    if (req.cookies.token) {
      var decoded = await jwt.verify(token, process.env.JWT_SIGNATURE);
      const loggedUser = await User.findOne({ _id: decoded.userID });
      if (loggedUser) {
        req.loggedUser = loggedUser;
        next();
      } else {
        res.send("PLEASE LOG IN");
      }
    } else {
      res.send("PLEASE LOG IN");
    }
  } catch (error) {
    console.log(error);
  }
};

//Register User
app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const foundUser = await User.findOne({ username: username });
    if (foundUser) {
      res.send("USERNAME ALREADY TAKEN");
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const newUser = await new User({
        username: username,
        password: hash,
      });
      newUser.save();
      res.send("NEW USER CREATED");
    }
  } catch (error) {
    console.log(error);
  }
});

//Login User
app.post("/login", async (req, res) => {
  try {
    const foundUser = await User.findOne({
      username: req.body.username,
    });
    if (foundUser) {
      const isvalidUser = bcrypt.compareSync(
        req.body.password,
        foundUser.password
      );
      if (isvalidUser) {
        var token = await jwt.sign(
          { userID: foundUser.id },
          process.env.JWT_SIGNATURE
        );
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: false,
          })
          .send({
            status: 200,
            message: "LOGGED IN",
            token: token,
          });
      } else {
        res.send("WRONG PASSWORD");
      }
    } else {
      res.send("INVALID CREDENTIALS");
    }
  } catch (error) {
    console.log(error);
  }
});

app.post("/checktoken", async (req, res) => {
  try {
    const token = req.body.token;
    if (token) {
      var decoded = await jwt.verify(token, process.env.JWT_SIGNATURE);
      const loggedUser = await User.findOne(
        {
          _id: decoded.userID,
        },
        { password: 0 }
      );
      if (loggedUser) {
        res.send({ status: 200, user: loggedUser });
      } else {
        res.send({ status: 400 });
      }
    }
  } catch (error) {
    console.log(error);
  }
});

//Using Routes
app.use("/users", isLoggedIn, userRoute);
app.use("/vehicles", isLoggedIn, vehicleRoute);
app.use("/job_card", isLoggedIn, JobCardRoute);
app.use("/duty_log", isLoggedIn, dutyLogRoute);
app.use("/drivers", isLoggedIn, driverRoute);
app.use("/defectmemos", isLoggedIn, defectMemoRoute);
app.use("/oilstockregister", isLoggedIn, oilstockRegisterRoute);
app.use("/inventory", isLoggedIn, inventoryRoute);
app.use("/oilbalance", isLoggedIn, oilbalanceRoute);
app.use("/receivevoucher", isLoggedIn, receiveVoucherRoute);
app.use("/location", locationRoute);

//Socket.io
io.on("connection", (socket) => {
  socket.on("join_map", () => {
    socket.join("map");
  });
  socket.on("disconnect", () => {
    // console.log("Disconnected ID : " + socket.user.username);
  });
  socket.on("location", (msg) => {
    // console.log(msg);
    let data = {
      name: socket.user.username,
      location: {
        latitude: msg.coords.latitude,
        longitude: msg.coords.longitude,
      },
    };
    socket.to(socket.id).emit("location", data);
    socket.in("map").emit("location", data);
  });
});

//Listening Express App
server.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
