const httpStatus = require("http-status")

class ErrorUser  {
   static NotFound =  {
        status: httpStatus.NOT_FOUND,
        message: 'User not found!'
    }
    static InvalidCredetials = {
        status: httpStatus.FORBIDDEN,
        message: 'Invalid Credetials'
    }
    static AlreadyExists = {
        status: httpStatus.CONFLICT,
        message: 'User already exists'
    }
}

module.exports = ErrorUser