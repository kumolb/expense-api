const mongoose = require("mongoose");
module.exports = mongoose.model("GroupExpense", mongoose.Schema({
    id: String,
    createdAt: String,
    spentMoney: Number,
    date: String,
    group: String,
    details: String,
    createdBy: String,
    type: String
}));