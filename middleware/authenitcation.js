const { User } = require("../models/user")

exports.validateUser = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findOne({ token })
    if (user) {
      const { email, mobile, token, _id } = user
      req.currentUser = { id: _id, email, mobile, token }
      next()
    } else {
      return res.status(401).send({
        success: false,
        message: "Unauthorized!",
      })
    }
  } catch (error) {
    return res.status(401).send({
      success: false,
      message: "Unauthorized!",
    })
  }
}

class AuthenticationError extends Error {
  constructor(message = "authentication failed") {
    super(message)
  }
}
