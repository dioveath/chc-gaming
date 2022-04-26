
const Joi = require("joi");

const roleUpdateSchema = Joi.object().keys({
  role_name: Joi.string().min(3).max(20).required(),
  permissions: Joi.array().items(Joi.string())
});

const roleSchema = roleUpdateSchema.options({ presence: 'required'});

module.exports =  {
  roleSchema,
  roleUpdateSchema
};
