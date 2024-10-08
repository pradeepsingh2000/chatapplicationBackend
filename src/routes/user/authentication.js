const express = require("express");
const router = express.Router();
const Validator = require('../../middleware/validator')
const Schema = require('../../validation/user');
const { userSingUp, userLogin, userProfile } = require("../../controller/user/userAuth.controller");

router.post(
  '/register',
  Validator(Schema.validateSighupInput),
  userSingUp
);




router.all("*", (req, res) => {
  res.status(404).json({ error: 'invalid route' });
});
module.exports = router;