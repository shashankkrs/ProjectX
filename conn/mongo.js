require('dotenv').config()
const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

mongoose.connect(`mongodb+srv://`+process.env.MONGO_USERNAME+`:`+process.env.MONGO_PASSWORD+`@fms.wtvk9r2.mongodb.net/?retryWrites=true&w=majority`).then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});