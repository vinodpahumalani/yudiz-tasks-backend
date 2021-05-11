const { connect } = require("mongoose")
exports.connectDB = async function () {
  const connUrl = process.env.MONGO_URL + "/" + process.env.MONGO_DB_NAME
  return await connect(connUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
}
