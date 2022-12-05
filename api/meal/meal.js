const route = require("express").Router();
const Http = require("../../helpers/HttpResponse");
route.get("/monthly",async(req, res,next)=>{
try{
    return Http.success(res, "success",{});
}catch(err){
    return Http.errorResponse(res, err);
}
});

module.exports = route;