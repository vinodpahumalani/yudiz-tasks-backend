const Joi = require("joi")

exports.UserBodySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.base": "Invalid email.",
    "string.email": "Invalid email.",
    "any.required": "email is required.",
  }),
  mobile: Joi.number().min(1111111111).max(9999999999).required().messages({
    "number.base": "Invalid mobile number.",
    "number.min": "Invalid mobile number.",
    "number.max": "Invalid mobile number.",
    "any.required": "mobile number is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Invalid password.",
    "string.min": "Please enter password with minimum 6 characters.",
    "any.required": "Password is required.",
  }),
})
