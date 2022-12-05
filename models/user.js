const mongoose = require("mongoose");
module.exports = mongoose.model("User", mongoose.Schema({
    name: String,
    password: String,
    id: String,
    group:{
        id: String,
        deposite: Number,
        mealCount: Number,
        expense: Number,
        dueAmount: Number,
    }
}));
