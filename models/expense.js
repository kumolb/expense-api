
const mongoose = require("mongoose");
module.exports = mongoose.model("SpentMoney", mongoose.Schema({
    createdAt: Date,
    spentMoney: Number,
    details: String,
    date: String,
    time: String,
    user: Number,
    day: String,
    month: String,
    year: String,
    details: String,
    type: {
        type: String,
        default: "regular"
    },
    id: String
}));
