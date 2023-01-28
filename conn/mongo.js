const mongoose = require('mongoose');
mongoose.set('strictQuery',false);

mongoose.connect('mongodb://127.0.0.1:27017/fms').then(()=>{
    console.log("Connected to Database");
}).catch((err)=>{
    console.log(err);
});