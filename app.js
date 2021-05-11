var express = require("express")
var path = require("path")
var cookieParser = require("cookie-parser")
var logger = require("morgan")
var cors = require("cors")
require("dotenv").config()

var usersRouter = require("./routes/users")

var app = express()

app.use(cors())
app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use("/task-2", express.static(path.join(__dirname, "public")))

app.use("/users", usersRouter)

module.exports = app
