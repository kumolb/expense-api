
const mongoose = require("mongoose");
module.exports = mongoose.model("Role", mongoose.Schema({
    "roleId": String,
    "name": String,
    "paermission": [String],
    "id": String
}));
