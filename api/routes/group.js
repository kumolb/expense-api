const Group = require("../../models/group");

const router = require("express").Router();

router.get("/", async(req,res)=>{
    try{
        let group = await Group.find({});
        res.status(200).json({"group":group})
    }catch(err){
        res.status(500).json({"error": err});
    }
});
router.get("/:id", async(req,res)=>{
    try{
        let group = await Group.find({_id: req.params.id});
        
        //  group = await Group.aggregate([{
        //     $match:{_id: req.params.id}
        // },{
        //     $project:{
        //         "name": "$name",
        //         "id": "$id",
        //         "groupId": "$group.id",
        //         "deposite": "$group.deposite",
        //         "mealCount": "$group.mealCount",
        //         "expense": "$group.expense",
        //         "dueAmount": "$group.dueAmount"
        //     }
        // }])
        res.status(200).json({"group":group})
    }catch(err){
        res.status(500).json({"error": err});
    }
})

router.post("/", async(req,res,next)=>{
    try{
        
        let group = new Group({
            "name": req.body.name,
            "password": req.body.password,
            "user": req.body.user,
            "creator": req.body.creator,
        });
        group.id = group._id;
        let newGroup = await group.save();
        res.status(200).json({
            "message": "Successfully created",
            "body":{"group":newGroup}
        })
    }catch(error){
        res.status(500).json({
            "message": "Failed while creating new group",
            "body":{"error":error}
        })
    }
});

router.put("/:id", async(req,res,next)=>{
    try{
        let updatedGroup = {...req.body},
            group = await group.findOneAndUpdate({_id: req.params.id},{$set:updatedGroup},{new: true});
        
        res.status(200).json({
            "message": "Successfully updated",
            "body":{"group":group}
        })
    }catch(error){
        res.status(500).json({
            "message": "Update failed!",
            "body":{"error":error}
        })
    }
});

router.put("/user/:id", async(req,res)=>{
    try{
        let user = req.body.user,
        group = await Group.findOneAndUpdate({id: req.params.id},{$addToSet:{"user":user}},{new: true});
        res.status(200).json({
            "message": "Successfully updated",
            "body":{"group":group}
        })
    }catch(error){
        res.status(500).json({
            "message": "Adding new user failed!",
            "body":{"error":error}
        })
    }
})

router.delete("/user/:id", async(req,res)=>{
    try{
        let user = req.body.user,
        group = await Group.findOneAndUpdate({id: req.params.id},{$pop:{"user":user}},{new: true});
        res.status(200).json({
            "message": "Successfully updated",
            "body":{"group":group}
        })
    }catch(error){
        res.status(500).json({
            "message": "Adding new user failed!",
            "body":{"error":error}
        })
    }
})

module.exports = router;