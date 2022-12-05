const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://kumol:kumol254@cluster0.tsazd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", (err) => {
    err ? console.log(err) : console.log("connected");
})