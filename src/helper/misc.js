const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateJwtToken = (user_id) => {
  var token = jwt.sign({ id: user_id }, "secret");
  return token;
}




module.exports = { generateJwtToken }