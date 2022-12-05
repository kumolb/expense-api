const mongoose = require("mongoose");

mongoose.connect(process.env.DBURL, (err) => {
    err ? console.log(err) : console.log("connected");
})