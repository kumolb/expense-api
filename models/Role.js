
const mongoose = require("mongoose");
const roleSchema = new mongoose.Schema({
    "roleId": String,
    "name": String,
    "paermission": [String],
    "id": String,
    "creator": String
});

module.exports = mongoose.model("Role", roleSchema);