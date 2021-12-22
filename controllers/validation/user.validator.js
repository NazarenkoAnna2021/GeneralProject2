const Joi = require('joi');

exports.userValidator = Joi.object().keys({
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  email: Joi.string().email({ tlds: { allow: false } }),
  phone: Joi.string().length(10).pattern(/^[0-9]+$/).when({ is: null, then: Joi.required() }),
  adress: Joi.string().when({ is: null, then: Joi.required() })
});
