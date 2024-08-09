const { StatusCodes } = require('http-status-codes')
const customAPIError = require('./custom-api-error');

class NotFound extends customAPIError{
    constructor(message){
        super(message);

        this.StatusCode = StatusCodes.NOT_FOUND;
    }
}