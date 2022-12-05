const route = require("express").Router();
const SpentMoney = require("../../models/expense");
const moment = require('moment');
const router = require("./group");

route.post("/", async (req, res) => {
    try {
        let spentMoney = new SpentMoney({
            createdAt: moment(),
            spentMoney: req.body.spentMoney ? req.body.spentMoney : 0,
            date: moment().format("YYYY-MM-DD"),
            day: moment().day("D"),
            year: moment().year(),
            month: moment().format("M"),
            type: req.body.type,
            details: req.body.details,
            user: 1
        });
        spentMoney.id = spentMoney._id;
        spentMoney = await spentMoney.save();
        res.status(200).json({
            statusCode: 200,
            success: true,
            "body": spentMoney
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ "error": err })
    }
})
route.get("/", async (req, res) => {
    try {
        let { page, limit} = req.query;
        page = +page || 1;
        limit = +limit || 20;
        let total = await SpentMoney.countDocuments();
        let spentMoney = await SpentMoney.find().sort({_id: -1}).skip(limit*(page-1)).limit(limit*page).lean();
        return spentMoney && spentMoney.length>0 ? res.status(200).json({
            success: true,
            statusCode: 200,
            page: page,
            limit: limit,
            total: total,
            body: spentMoney
        }) : res.json({
            success: false,
            statusCode: 204,
            page: page,
            limit: limit,
            total: total,
            body: []
        })
    } catch (err) {
        res.status(500).json({ "error": err })
    }
});

route.get("/spent-money", async(req,res)=>{
    try{
        let groupQuery = {};
        groupQuery = req.query.type == "monthly" ? {_id:"$month", cost:{$sum:"$spentMoney"}} : {_id:"$date", cost:{$sum:"$spentMoney"}};
        let all = await SpentMoney.aggregate([{$match:{user:1}}, {$group:groupQuery}]);
        const total = all ? all.length : 0;
        let limit = req.query.limit ? +req.query.limit : total;
        let page = req.query.page && (+req.query.page>0)? +req.query.page : 1;
        let spent = await SpentMoney.aggregate([{$match:{user:1}},{$group:groupQuery}, {$skip: limit * (page-1)},{$limit:limit}]).sort({_id: -1});
        res.status(200).json({ "body": spent, page: page, limit: limit, total: total})
    }catch(err){
        res.status(500).json({ "error": err })
    }
})

route.get('/monthly-spent', async(req,res)=>{
    try{
        let query = {};
        let {type, month} = req.query;
        type ? query["type"] = type : null;
        month ? query["month"] = month : null;
        let data = await SpentMoney.aggregate([{
            $match: query
        },{
            $group: {
                _id: {
                    date: "$date",
                    month: "$month"
                },
                m: {
                    $sum: "$spentMoney"
                }
            }
        },{
            $project: {
                money: "$m",
                date: "$_id.date",
                month: "$_id.month"
            }
        },{
            $sort: {
                date: -1
            }
            },{
            $group: {
                _id: {
                    month: "$month"
                },
                monthlyTotal: {
                    $sum: "$money"
                },
                dates: {
                    $push: {
                        date: "$date",
                        money: "$money"
                    }
                },
                days: {
                    $sum: 1
                }
            }
        },{
            $project: {
                avgCost: {$divide:["$monthlyTotal", "$days"]},
                _id: "$_id.month",
                total: "$monthlyTotal",
                dates: true,
            }
        },{
            $sort: {
                _id: -1
            }
            }]);
        return res.json({
            success: true,
            statusCode: 200,
            body: data
        });
    }catch(error){
        return res.json({
            error: error.stack
        })
    }
})

module.exports = route;
