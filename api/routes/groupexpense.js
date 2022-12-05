const route = require("express").Router();
const GroupExpense = require("../../models/groupexpense");
const moment = require("moment");
route.get("/", async(req,res,next)=>{
    try{
        let expense = await GroupExpense.find({});
        let total = 0;
        expense.map(o=>{
            total += o.spentMoney;
        });
        return res.status(200).json({
            body: expense,
            total: total,
            success: true,
            statusCode: 200,
            message: "content found"
        });
    }catch(error){
        res.status(500).json({
            "body": error.stack
        });
    }
});

route.get("/:id", async(req,res,next)=>{
    try{
        let expense = await GroupExpense.findOne({id: req.params.id});
        return res.status(200).json({
            "body": expense
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
});

route.get("/group/:id",async(req,res)=>{
    try{
        let expense = await GroupExpense.find({group: req.params.id});
        return res.status(200).json({
            "expenses": expense
        });
    }catch(error){
        res.status(500).json({
            "body": {"error": error}
        });
    }
})

route.post('/', async(req,res,next)=>{
    try{
        let newExpense = new GroupExpense({
            "group": req.body.group,
            "spentMoney": req.body.spentMoney,
            "createdBy": req.body.user,
            "date": moment().format("YYYY-MM-DD"),
            createdAt: moment().format("YYYY-MM-DD h:mm:ss a"),
            "details": req.body.details,
            type: req.body.type || "meal"
        });
        newExpense.id = newExpense._id;
        let expense = await newExpense.save();
        res.status(200).json({
            "expense": expense
        })
    }catch(error){
        res.status(500).json({"error": error});
    }
});

route.put("/", async(req,res)=>{
    try{
        let updateObj = {...req.body};
        updateObj["createdAt"] = new Date();
        let expense = GroupExpense.findOneAndUpdate({id:req.params.id},{$set:updateObj},{new:true});
        res.status(200).json({
            "body":{
                "expense": expense
            }
        })
    }catch(err){
        res.status(500).json({"error": error});
    }

})
module.exports = route;