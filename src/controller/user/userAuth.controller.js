const { tryCatchFn } = require("../../helper/tryCatch");
const { userSingUpService, userLoginService, userProfileService } = require("../../services/users/userAuth.service");
const { successResponse, errorResponse } = require("../../utils/responseHandler");
const message = require('../../constants/messageConstant')


const userSingUp = tryCatchFn(async (req, res, next) => {
  
  const data = await userSingUpService(req.body)
  return successResponse(
    res,
    201,
    message.REGISTER_SUCCESSFUL,
    data
  )
})

const userLogin = tryCatchFn(async (req, res, next) => {
  const data = await userLoginService(req.body, req.user)
  if (!data) {
    return errorResponse(
      res,
      400,
      message.INVALID_CREDENTIAL,
      data
    )
  }
  else {
    return successResponse(
      res,
      200,
      message.SUCCESS,
      data
    )
  }


})

const userProfile = tryCatchFn(async (req, res, next) => {
  const data = await userProfileService(req.user)
  return successResponse(
    res,
    200,
    message.SUCCESS,
    data
  )
})

module.exports = { userSingUp, userLogin, userProfile };
