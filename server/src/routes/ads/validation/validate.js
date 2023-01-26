const joi = require('joi');

 const validateInput = (requestBody) => {
   let schema = joi.object({
      title: joi.string().max(50).min(5).required(),
      description: joi.string().max(1000).min(20).required(),
      price: joi.number().required()
    });
  
  const validation = schema.validate(requestBody);

  if (validation.error) return validation.error.details[0].message;
  return null;
};

module.exports.validateInput = validateInput;