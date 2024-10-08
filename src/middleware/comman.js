const Users = require("../models/users");
const { errorResponse } = require("../utils/responseHandler");
const Message = require("../constants/messageConstant");
const { tryCatchFn } = require("../helper/tryCatch");

module.exports.CheckUser = tryCatchFn(async (req, res, next) => {
  const checkIsEmailExit = await Users.findOne({ name: req.body.name, isActive: true })
  if (!checkIsEmailExit) {
    next()
  }
  else {
    return errorResponse(
      res,
      400,
      Message.USER_ALREADY_EXIT_PLEASE_LOGIN,
      []
    )
  }

})


