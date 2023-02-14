const Joi = require('joi');

function validator(schema){
  return (payload) => {
    const { value, error } = schema.validate(payload, {abortEarly: false, allowUnknown: true, stripUnknown: true });

    if(error){
      var details = error.details.map(el => el.message);

      const newError = new Error(details.join('\n'));
      newError.name = 'ValidationError';
      newError.value = value;
      
      throw newError;
    }

    return value;
  };
}


module.exports = validator;
