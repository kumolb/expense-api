
const mongoose = require("mongoose");
module.exports = mongoose.model("Meal", mongoose.Schema({
	"userId" : String,
	"breakfast" : Number,
	"lunch" : Number,
	"dinner" : Number,
	"total" : Number,
	"groupId" : String,
	"userName" : String,
	"date" : String,
    "id": String
}));
