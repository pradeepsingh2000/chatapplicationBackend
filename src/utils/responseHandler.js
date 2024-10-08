const logger = require("./logger");

module.exports.successResponse = (res, status, message, data) => {
    res.status(status).send({
        success: true,
        message,
        data
    });
};

module.exports.errorResponse = (res, status, message, data, error = null) => {
    logger.error(typeof error === "Array" ? JSON.stringify(error) : message);
    res.status(status).send({
        success: false,
        message,
        data,
        error,
    });
};