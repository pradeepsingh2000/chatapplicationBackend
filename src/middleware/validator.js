const { errorResponse } = require("../utils/responseHandler");

const validator = (schema, property) => async (req, res, next) => {
  const { error } = schema.validate(req[property || 'body']);
  const valid = error == null;
  if (valid) {
    next();
  } else {
    const { details } = error;
    console.log(details[0]);
    return errorResponse(res, 400, details[0]?.message, details, 'BAD_REQUEST');
  }
};
module.exports = validator;