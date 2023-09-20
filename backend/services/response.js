const ErrorHandler = require("../utils/errorHandler")

module.exports = {
    /**
     * @description This function use for format success response of rest api
     * @param data
     * @param code
     * @param message
     * @param res
     * @param extras
     * @returns {{data: , meta: {message:, code: *}}}
     */

    successResponseData(res, data, message, extras, code = 200) {
        const response = {
            success:true,
            data,
            message: res.locals.__(message),
        }
        if (extras) {
            Object.keys(extras).forEach((key) => {
                if ({}.hasOwnProperty.call(extras, key)) {
                    response[key] = extras[key]
                }
            })
        }
        return res.status(code).send(response)
    },

    successResponse(res, message, code = 200) {
        const response = {
            success:true,
            message: res.locals.__(message),
        }
        return res.status(code).send(response)
    },

    // errorResponse(res, message, code = 400) {
    //     const response = {
    //         success:false,
    //         message: res.locals.__(message),
    //     }
    //     return res.status(code).send(response)
    // },

    // errorResponseData(res,data, message, code = 400) {
    //     const response = {
    //         success:false,
    //         data,
    //         message: res.locals.__(message)
    //     }
    //     return res.status(code).send(response)
    // },

    // validationErrorResponseData(res, message, code = 400) {
    //     const response = {
    //         message: res.locals.__(message)
    //     }
    //     return res.status(code).send(response)
    // },  

    // apiError(err) {
    //     let error = {};
    //     if (err.name == 'ValidationError' && err.isJoi == true) {
    //         error.error_message = err.message.replace(/"/g, "");
    //         error.error_key = err.details[0]['context']['label'];
    //     } else if (typeof err == 'string') {
    //         error.error_message = err;
    //     } else {
    //         error = err;    
    //         if (error.status == 401) error.message = 'unauthorized';
    //     }
    //     error.status = error.status || 400;
    //     return error;
    // }   

}
