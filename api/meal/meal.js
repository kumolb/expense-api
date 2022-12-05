const route = require("express").Router();
const Meal = require("../../models/meal");
const Http = require("../../helpers/HttpResponse");
const db = require("../../models/db");
const moment = require("moment");
route.get("/monthly", async (req, res, next) => {
    try {
        let monthlyMeal = await Meal.aggregate([{
            $match: {

            }
        }, {
            $sort: {
                date: 1
            }
        }, {
            $group: {
                _id: {
                    _id: "$userId",
                    name: "$userName"
                },
                meals: {
                    $push: {
                        k: "$date",
                        v: {
                            lunch: "$lunch",
                            dinner: "$dinner",
                            breakfast: "$breakfast",
                            id: "$id"
                        }
                    }
                },
                total: {
                    $sum: "$total"
                }
            }
        }, {
            $project: {
                _id: 1,
                total: 1,
                meals: {
                    $arrayToObject: "$meals"
                }
            }
        }
        ]);
        return Http.success(res, "success", monthlyMeal);
    } catch (err) {
        return Http.error(res, err);
    }
});

route.post("/add/", async (req, res, next) => {
    try {
        let date = moment().format("YYYY-MM-DD");
        let { userId, breakfast, lunch, dinner, groupId, userName, id } = req.body;
        let meal = await Meal.findOne({ userId: userId, date: date, groupId: groupId }).lean();
        let newMeal;
        if (meal) {
            let setObj = {};
            breakfast ? setObj.breakfast = breakfast : null;
            lunch ? setObj.lunch = lunch : null;
            dinner ? setObj.dinner = dinner : null;
            [newMeal] = await Meal.aggregate([{
                $match: {
                    id: id, userId: userId
                }
            }, {
                $set: setObj
            }, {
                $set: {
                    total: {
                        $add: ["$breakfast", "$lunch", "$dinner"]
                    }
                }
            }]);
        } else {
            newMeal = new Meal({
                userId: userId,
                groupId: groupId,
                breakfast: breakfast || 0,
                lunch: lunch || 0,
                dinner: dinner || 0,
                userName: userName,
                date: date
            });
            newMeal.id = newMeal._id;
            newMeal.total = newMeal.breakfast + newMeal.lunch + newMeal.dinner;
            newMeal = await newMeal.save();
        }
        return Http.success(res, "Meal added", newMeal);
    } catch (err) {
        console.log(err.stack)
        Http.error(res, "", err);
    }
})

module.exports = route;