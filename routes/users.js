var express = require("express")
const { ValidationError } = require("joi")
const { UserBodySchema } = require("../helpers/userValidation")
const { User } = require("../models/user")
const { handleErrors } = require("../helpers/handleErrors")
const { validateUser } = require("../middleware/authenitcation")
const { LoginBodySchema } = require("../helpers/loginBodyValidator")

var router = express.Router()

/* GET users listing. */
router.get("/me", validateUser, function (req, res, next) {
  res.send({
    success: true,
    data: req.currentUser,
  })
})

/* POST login user. */
router.post("/login", async function (req, res, next) {
  try {
    // Validate body
    const { username, password } = await LoginBodySchema.validateAsync(req.body)

    // Find user with email or mobile
    const query = {
      $or: [{ email: username }, { mobile: username }],
    }
    const user = await User.findOne(query)
    // Check password
    const isPasswordValid = user.validPassword(password)

    if (isPasswordValid) {
      user.getNewToken()
      await user.save()
      // Data to send in response
      const { email, mobile, _id, token } = user

      return res.send({
        success: true,
        data: { id: _id, email, mobile, token },
      })
    } else {
      return res.status(401).send({
        success: false,
        message: "Invalid credentials.",
      })
    }
  } catch (error) {
    return handleErrors(error, res)
  }
})

/* POST create user. */
router.post("/", async function (req, res, next) {
  try {
    // Validates body of request
    const { email, mobile, password } = await UserBodySchema.validateAsync(
      req.body
    )

    const user = new User({ email, mobile })
    user.setPassword(password)
    user.getNewToken()
    await user.save()

    // Data to send in response
    return res.send({
      success: true,
      data: {
        id: user._id,
        email: user.email,
        mobile: user.mobile,
        token: user.token,
      },
    })
  } catch (error) {
    return handleErrors(error, res)
  }
})

module.exports = router
