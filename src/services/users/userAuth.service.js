const { generateJwtToken, comparePassword } = require("../../helper/misc");
const Users = require("../../models/users");
const bcrypt = require("bcryptjs");

const userSingUpService = async (payload) => {
  try {
    const isUser = await Users.find({name:payload.name})
    let token = ""
    let user = null
    if(!isUser.length) {
      const userSave = await Users.create(payload)
       token = generateJwtToken(userSave._id)
       user = userSave
    }else {
      console.log(isUser,'isUser')
       token = generateJwtToken(isUser[0]._id)
       user = isUser[0]
    }
   
    return { token,user }
  }
  catch (err) {
    throw err
  }
}

const userLoginService = async (payload, user) => {
  try {
    const isPassMatch = await comparePassword(payload.password, user.password)
    if (isPassMatch) {
      const token = generateJwtToken(user._id)
      return { token, role: user.role }
    }
    else {
      return false
    }
  }
  catch (err) {
    throw err
  }

}

const userProfileService = async (payload) => {
  try {
    const data = await Users.findById(payload).select("-password")
    return data
  } catch (err) {
    throw err

  }
}

module.exports = { userSingUpService, userLoginService, userProfileService }