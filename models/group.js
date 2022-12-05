const mongoose = require("mongoose");
module.exports = mongoose.model("Group", mongoose.Schema({
    name: String,
    password: String,
    id: String,
    user:[String],
    creator: String,
}));
