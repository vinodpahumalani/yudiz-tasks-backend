const { Schema, model } = require("mongoose")
const crypto = require("crypto")
const jwt = require("jsonwebtoken")

// User schema contains Mobile(unique), Email(unique) and password
const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  mobile: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
  },
  salt: {
    type: String,
    required: true,
    default: crypto.randomBytes(16).toString("hex"),
  },
  token: {
    type: String,
  },
})

// Method to hash password
UserSchema.methods.setPassword = function (password) {
  this.password = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`)
}

// Method to change token
UserSchema.methods.getNewToken = function () {
  this.token = jwt.sign(
    { id: this._id, timestamp: Date.now() },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE_TIME,
    }
  )
}

// Method to check the entered password is correct or not
UserSchema.methods.validPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`)
  return this.password === hash
}

const User = model("User", UserSchema)

exports.User = User
