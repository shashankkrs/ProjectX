require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const connectionString =
  `mongodb+srv://` +
  process.env.MONGO_USERNAME +
  `:` +
  process.env.MONGO_PASSWORD +
  `@` +
  process.env.MONGO_HOST +
  `/` +
  process.env.MONGO_DB +
  `?retryWrites=true&w=majority`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });
