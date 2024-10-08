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



module.exports = { userSingUp };
