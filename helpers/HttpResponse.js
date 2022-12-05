class HttpResponse {
    success(res, msg, body, optional) {
        
        let responseObj = {
            statusCode: 200,
            success: true
        };         
        optional ? optional.total ? responseObj.total = optional.total : null : null;
        optional ? optional.limit ? responseObj.limit = optional.limit : null : null;
        optional ? optional.page ? responseObj.page = optional.page : null : null;     
        responseObj.message = msg ? msg : "";
        responseObj.body = body ? body : {};
        return res.status(200).json(responseObj); 
    }
    created(res, msg, body) {
        return res.status(200).json({
            statusCode: 201,
            success: true,
            message: msg || "Successfully Created",
            body: body 
        });
    }
    notFound(res, msg, body, optional) { 
        let responseObj = {
            statusCode: 204,
            success: false
        };
        optional ? optional.total ? responseObj.total = optional.total : null : null;
        optional ? optional.limit ? responseObj.limit = optional.limit : null : null;
        optional ? optional.page ? responseObj.page = optional.page : null : null;
        responseObj.message = msg ? msg : "";
        responseObj.body = body ? body : {};
        return res.status(200).json(responseObj);
    }     
    notModified(res, msg, body) {
        return res.status(200).json({
            statusCode: 304,
            success: false,
            message: msg ? msg : "",
            body: body ? body : {}
        });
    }
    errorResponse(res, message, body) {
        return res.status(500).json({
            "statusCode": 500,
            "success": false,
            "message": message,
            "body": body 
        });
    }
    badRequest(res, msg, body) {
        return res.status(400).json({ 
            statusCode: 422,
            success: false,
            message: msg || "Unprocessable Entity",
            body: body
        });
    } 
}  
module.exports = new HttpResponse();