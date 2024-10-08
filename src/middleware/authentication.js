const jwt = require("jsonwebtoken");
const { errorResponse } = require("../utils/responseHandler");
const user = require("../validation/user");
const Users = require("../models/users");

const VerifyUser = (req, res, next) => {
  if (
    req.headers.authorization !== undefined ||
    req.headers.Authorization !== undefined ||
    req.header.Authorization !== null
  ) {
    let token = req.headers.authorization || req.header.Authorization;
    if (!token) {
      errorResponse(res, 400, "Token not provided");
    }
    
      token = token.replace("Bearer ", "");
  

    jwt.verify(token, "secret", async (err, decoded) => {
      if (err) {
        console.log({ err });
        errorResponse(res, 400, "Invalid token", []);
      } else {
        console.log({ decoded });
        const data = await Users.find({ _id: decoded.id });
        if (data.length) {
          req.user = data[0];
          next();
        }
      }
    });
  }
};

module.exports = { VerifyUser };
