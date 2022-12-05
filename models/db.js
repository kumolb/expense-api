const mongoose = require("mongoose");

module.exports = mongoose.connect(process.env.DBURL, (err) => {
    err ? console.log(err) : console.log("connected");
})