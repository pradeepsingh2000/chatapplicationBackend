const Joi = require('joi');
module.exports = {
  validateSighupInput: Joi.object().keys({
    name: Joi.string().required(),
  }),
  validateMessage : Joi.object().keys({
    roomId:Joi.string().required(),
    content:Joi.string().required()
  })
};