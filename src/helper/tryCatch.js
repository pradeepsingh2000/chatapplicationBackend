
const responseHandler = require('../utils/responseHandler')
const logger = require('../utils/logger');


const tryCatchFn = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      responseHandler.errorResponse(
        res,
        400,
        error.message,
        { error }
      )
      logger.error(typeof error === "Array" ? JSON.stringify(error) : error.stack);
      next(error);

    });
  };
};

module.exports = { tryCatchFn };