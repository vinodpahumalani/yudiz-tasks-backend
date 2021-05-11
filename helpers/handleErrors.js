const { ValidationError } = require("joi")
const { MongoError } = require("mongodb")

exports.handleErrors = (error, res) => {
  // Joi validation errors
  if (error instanceof ValidationError) {
    return res.status(400).send({
      success: false,
      message: error.message,
    })
  }

  if (error instanceof MongoError) {
    if (error.code === 11000) {
      return res.status(400).send({
        success: false,
        message: `${Object.keys(error.keyValue)[0]} already exists.`,
      })
    }
  }

  // Unknown errors
  return res.status(500).send({
    success: false,
    message: error.message,
  })
}
