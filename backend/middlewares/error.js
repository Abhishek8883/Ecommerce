const errorHandler = require("../utils/errorHandler");

module.exports = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";


    //wrong mongodb ID error
    if(err.name === "CastError"){
        const message = `Resource not found .Invalid : ${err.path}`;
        err = new errorHandler(message,400);    
    }

    //Mongoose duplicate key error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new errorHandler(message,400);    

    }

    //Invalid JWT token
    if(err.name === "JsonWebTokenError"){
        const message = `Invalid token , Try again`;
        err = new errorHandler(message,400);    
    }

    //Expired JWT token
    if(err.name === "TokenExpiredError"){
        const message = `Token expired , T ry again`;
        err = new errorHandler(message,400);    
    }

    res.status(err.statusCode).json({
        success:false,
        // message:res.locals.__(err.message),
        err:err.stack
    })
}