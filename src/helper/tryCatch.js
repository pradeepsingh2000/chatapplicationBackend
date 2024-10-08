
const responseHandler = require('../utils/responseHandler')


const tryCatchFn = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) => {
      responseHandler.errorResponse(
        res,
        400,
        error.message,
        { error }
      )
      next(error);

    });
  };
};

module.exports = { tryCatchFn };