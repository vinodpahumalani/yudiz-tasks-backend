const Joi = require("joi")

exports.LoginBodySchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Invalid email/mobile.",
    "any.requried": "email/mobile is required.",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Invalid password.",
    "string.min": "Please enter password with minimum 6 characters.",
    "any.required": "Password is required.",
  }),
})
