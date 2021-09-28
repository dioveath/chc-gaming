const Joi = require('joi-oid');

const userUpdateSchema = Joi.object().keys({
  first_name: Joi.string().alphanum().min(3).max(30),
  last_name: Joi.string().alphanum().min(3).max(30),
  gaming_name: Joi.string().max(20).pattern(/^[A-z]+$/),
  password: Joi.string().pattern(/^[A-z0-9~!@#$%^&*()_+-=]{3,30}$/),  
  email: Joi.string().email(), 
  address: Joi.string(),
  phone_number: Joi.string().length(10).pattern(/^[0-9]+$/),
  dob: Joi.date().min('1-1-1970').max('1-1-2020'), // MM-DD-YYYY
  roles: Joi.array().items(Joi.objectId())
}).min(1);

const userSchema = userUpdateSchema.options({ presence: 'required'});

module.exports = {
  userSchema,
  userUpdateSchema
};
